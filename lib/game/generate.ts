import { createRng, type Rng } from './rng';
import { MAX_ITEM_BONUS, MIN_HEIGHT, MIN_WIDTH, MONSTERS, newFighter } from './rules';
import type { GameState, Item, Monster, MonsterKind, Pos, Rect, Trap } from './types';

type Half = { readonly from: number; readonly to: number; readonly start: Pos };
type Cells = boolean[][];

const STEPS: readonly (readonly [number, number])[] = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const BRAID_CHANCE = 0.14;
const ROOMS_PER_HALF = 2;
const MONSTER_START_DISTANCE = 6;
const TRAP_START_DISTANCE = 3;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const inRect = (r: Rect, x: number, y: number) => x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1;

/** Depth-first maze over the odd cells of one half, leaving the arena untouched. */
function carveMaze(open: Cells, half: Half, arena: Rect, rng: Rng): void {
  const height = open.length;
  const isCell = (x: number, y: number) =>
    x >= half.from && x <= half.to && y >= 1 && y <= height - 2 &&
    x % 2 === 1 && y % 2 === 1 && !inRect(arena, x, y);

  const stack: Pos[] = [half.start];
  open[half.start.y][half.start.x] = true;
  while (stack.length > 0) {
    const { x, y } = stack[stack.length - 1];
    const options = STEPS.filter(([dx, dy]) => isCell(x + dx * 2, y + dy * 2) && !open[y + dy * 2][x + dx * 2]);
    if (options.length === 0) {
      stack.pop();
      continue;
    }
    const [dx, dy] = options[rng.int(options.length)];
    open[y + dy][x + dx] = true;
    open[y + dy * 2][x + dx * 2] = true;
    stack.push({ x: x + dx * 2, y: y + dy * 2 });
  }
}

/** Knock out some walls between corridors so the maze has loops. */
function braid(open: Cells, half: Half, arena: Rect, rng: Rng): void {
  for (let y = 1; y <= open.length - 2; y++) {
    for (let x = half.from; x <= half.to; x++) {
      if (open[y][x] || inRect(arena, x, y)) continue;
      const joinsSideways = y % 2 === 1 && x % 2 === 0 && open[y][x - 1] && open[y][x + 1];
      const joinsVertically = x % 2 === 1 && y % 2 === 0 && open[y - 1][x] && open[y + 1][x];
      if ((joinsSideways || joinsVertically) && rng.next() < BRAID_CHANCE) open[y][x] = true;
    }
  }
}

/** Open a few 5x3 rooms. Attempts that would touch the arena are skipped. */
function carveRooms(open: Cells, half: Half, arena: Rect, rng: Rng): void {
  const columns = (half.to - half.from) / 2 + 1;
  const rowsOfCells = (open.length - 1) / 2;
  if (columns < 3) return;
  for (let i = 0; i < ROOMS_PER_HALF; i++) {
    const cx = half.from + 2 + 2 * rng.int(columns - 2);
    const cy = 1 + 2 * rng.int(rowsOfCells);
    const cells: Pos[] = [];
    for (let y = cy - 1; y <= cy + 1; y++) {
      for (let x = cx - 2; x <= cx + 2; x++) cells.push({ x, y });
    }
    const fits = cells.every((c) =>
      c.x >= half.from && c.x <= half.to && c.y >= 1 && c.y <= open.length - 2 && !inRect(arena, c.x, c.y));
    if (fits) cells.forEach((c) => { open[c.y][c.x] = true; });
  }
}

function carveArena(open: Cells, arena: Rect, doors: readonly Pos[]): void {
  for (let y = arena.y0; y <= arena.y1; y++) {
    for (let x = arena.x0; x <= arena.x1; x++) {
      open[y][x] = x > arena.x0 && x < arena.x1 && y > arena.y0 && y < arena.y1;
    }
  }
  doors.forEach((d) => { open[d.y][d.x] = true; });
}

function shuffled<T>(list: readonly T[], rng: Rng): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = rng.int(i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function pickMonsterKind(rng: Rng, dragonUsed: boolean): MonsterKind {
  const roll = rng.next();
  if (roll < 0.4) return 'gnome';
  if (roll < 0.7) return 'gremlin';
  if (roll < 0.9 || dragonUsed) return 'jelly';
  return 'dragon';
}

type Population = { items: Item[]; traps: Trap[]; monsters: Monster[] };

/** Scatter loot, traps and monsters over the floor of one half. */
function populate(open: Cells, half: Half, arena: Rect, rng: Rng, nextId: () => number): Population {
  const floor: Pos[] = [];
  let rooms = 0;
  for (let y = 1; y <= open.length - 2; y++) {
    for (let x = half.from; x <= half.to; x++) {
      if (!open[y][x] || inRect(arena, x, y)) continue;
      if (x % 2 === 1 && y % 2 === 1) rooms++;
      if (x !== half.start.x || y !== half.start.y) floor.push({ x, y });
    }
  }
  const pool = shuffled(floor, rng);
  const distance = (p: Pos) => Math.abs(p.x - half.start.x) + Math.abs(p.y - half.start.y);
  const take = (minDistance: number): Pos | null => {
    const index = pool.findIndex((p) => distance(p) >= minDistance);
    return index === -1 ? null : pool.splice(index, 1)[0];
  };

  const items: Item[] = [];
  for (let i = 0; i < clamp(Math.round(rooms / 9), 3, 8); i++) {
    const pos = take(1);
    if (pos) items.push({ id: nextId(), kind: i % 2 === 0 ? 'weapon' : 'armor', pos, bonus: 1 + rng.int(MAX_ITEM_BONUS) });
  }
  const traps: Trap[] = [];
  for (let i = 0; i < clamp(Math.round(rooms / 16), 2, 4); i++) {
    const pos = take(TRAP_START_DISTANCE);
    if (pos) traps.push({ id: nextId(), kind: i % 2 === 0 ? 'spike' : 'poison', pos, revealed: false });
  }
  const monsters: Monster[] = [];
  for (let i = 0; i < clamp(Math.round(rooms / 11), 3, 6); i++) {
    const pos = take(MONSTER_START_DISTANCE);
    if (!pos) continue;
    const kind = pickMonsterKind(rng, monsters.some((m) => m.kind === 'dragon'));
    monsters.push({ id: nextId(), kind, pos, hp: MONSTERS[kind].hp });
  }
  return { items, traps, monsters };
}

/**
 * Build a new dungeon. Width must be 4k+1 and height 4k+3 so that the dividing
 * wall, the arena walls and both doors all land on the maze grid.
 */
export function createGame(width: number, height: number, seed: number): GameState {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < MIN_WIDTH || height < MIN_HEIGHT) {
    throw new RangeError(`Dungeon must be at least ${MIN_WIDTH}x${MIN_HEIGHT}, got ${width}x${height}`);
  }
  if (width % 4 !== 1 || height % 4 !== 3) {
    throw new RangeError(`Dungeon width must be 4k+1 and height 4k+3, got ${width}x${height}`);
  }

  const rng = createRng(seed);
  const mid = (width - 1) / 2;
  const cy = (height - 1) / 2;
  const arena: Rect = { x0: mid - 4, y0: cy - 3, x1: mid + 4, y1: cy + 3 };
  const doors = { player: { x: arena.x0, y: cy }, rival: { x: arena.x1, y: cy } };
  const starts = { player: { x: 1, y: cy }, rival: { x: width - 2, y: cy } };
  const halves: readonly Half[] = [
    { from: 1, to: mid - 1, start: starts.player },
    { from: mid + 1, to: width - 2, start: starts.rival },
  ];

  const open: Cells = Array.from({ length: height }, () => new Array<boolean>(width).fill(false));
  for (const half of halves) {
    carveMaze(open, half, arena, rng);
    braid(open, half, arena, rng);
    carveRooms(open, half, arena, rng);
  }
  carveArena(open, arena, [doors.player, doors.rival]);

  let lastId = 0;
  const nextId = () => ++lastId;
  const populations = halves.map((half) => populate(open, half, arena, rng, nextId));

  return {
    id: seed,
    width,
    height,
    mid,
    rows: open.map((row) => row.map((isOpen) => (isOpen ? '.' : '#')).join('')),
    arena,
    doors,
    starts,
    player: newFighter(starts.player),
    rival: newFighter(starts.rival),
    monsters: populations.flatMap((p) => p.monsters),
    items: populations.flatMap((p) => p.items),
    traps: populations.flatMap((p) => p.traps),
    turn: 0,
    status: 'running',
    events: [],
    lastEvent: null,
    seed: rng.state(),
  };
}
