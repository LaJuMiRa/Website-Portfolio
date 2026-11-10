import type { Dir, GameState, Pos } from './types';

export const DIRS: Record<Dir, Pos> = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
};
export const DIR_LIST: readonly Dir[] = ['up', 'right', 'down', 'left'];

type Board = Pick<GameState, 'rows' | 'width' | 'height' | 'arena' | 'mid'>;

export const shift = (p: Pos, d: Dir): Pos => ({ x: p.x + DIRS[d].x, y: p.y + DIRS[d].y });
export const same = (a: Pos, b: Pos): boolean => a.x === b.x && a.y === b.y;
export const manhattan = (a: Pos, b: Pos): number => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
export const cellIndex = (s: Board, p: Pos): number => p.y * s.width + p.x;

export const isWall = (s: Board, p: Pos): boolean => s.rows[p.y]?.[p.x] !== '.';

/** True for the arena floor and its doors; monsters never go here. */
export const inArena = (s: Board, p: Pos): boolean =>
  p.x >= s.arena.x0 && p.x <= s.arena.x1 && p.y >= s.arena.y0 && p.y <= s.arena.y1;

export const sameSide = (s: Board, a: Pos, b: Pos): boolean => a.x < s.mid === b.x < s.mid;

/**
 * Breadth-first search. Returns the first step of a shortest path from `from`
 * to the nearest cell matching `isGoal`, or null if none can be reached.
 * A goal cell may be blocked (for example a monster you want to attack).
 */
export function firstStep(
  s: Board,
  from: Pos,
  isGoal: (p: Pos) => boolean,
  isBlocked: (p: Pos) => boolean,
): Dir | null {
  const firstDir = new Int8Array(s.width * s.height).fill(-1);
  const queue: Pos[] = [];
  firstDir[cellIndex(s, from)] = DIR_LIST.length;

  for (let i = 0; i < DIR_LIST.length; i++) {
    const next = shift(from, DIR_LIST[i]);
    if (isWall(s, next)) continue;
    if (isGoal(next)) return DIR_LIST[i];
    if (isBlocked(next)) continue;
    firstDir[cellIndex(s, next)] = i;
    queue.push(next);
  }

  for (let head = 0; head < queue.length; head++) {
    const current = queue[head];
    const origin = firstDir[cellIndex(s, current)];
    for (const dir of DIR_LIST) {
      const next = shift(current, dir);
      if (isWall(s, next)) continue;
      const index = cellIndex(s, next);
      if (firstDir[index] !== -1) continue;
      if (isGoal(next)) return DIR_LIST[origin];
      if (isBlocked(next)) continue;
      firstDir[index] = origin;
      queue.push(next);
    }
  }
  return null;
}
