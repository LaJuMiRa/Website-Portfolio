import { MONSTERS } from '@/lib/game';
import type { GameState, Pos } from '@/lib/game';

export type Palette = {
  readonly wall: string;
  readonly player: string;
  readonly rival: string;
  readonly loot: string;
  readonly danger: string;
};
export type View = { readonly cellWidth: number; readonly cellHeight: number; readonly fontFamily: string };
export type Progress = {
  /** 0..1, how far entities have slid from their previous cell. */
  readonly move: number;
  /** 0..1, how much of a new dungeon has been uncovered. */
  readonly reveal: number;
};

const GLYPH_SCALE = 0.7;
const REVEAL_SOFTNESS = 3;
const FLASH_ALPHA = 0.45;

export function readPalette(el: Element): Palette {
  const css = getComputedStyle(el);
  const read = (name: string) => css.getPropertyValue(name).trim();
  return {
    wall: read('--board-wall'),
    player: read('--accent'),
    rival: read('--rival'),
    loot: read('--loot'),
    danger: read('--danger'),
  };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const between = (from: Pos | undefined, to: Pos, t: number): Pos =>
  from ? { x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t) } : to;

/** The dungeon is uncovered from both outer edges towards the arena. */
function visibility(s: GameState, x: number, y: number, reveal: number): number {
  if (reveal >= 1) return 1;
  const cy = (s.height - 1) / 2;
  const distance = Math.min(x, s.width - 1 - x) + Math.abs(y - cy) * 0.5;
  const front = reveal * (s.mid + cy * 0.5 + REVEAL_SOFTNESS);
  return Math.min(1, Math.max(0, (front - distance) / REVEAL_SOFTNESS));
}

export function drawBoard(
  ctx: CanvasRenderingContext2D,
  s: GameState,
  previous: GameState | null,
  progress: Progress,
  view: View,
  palette: Palette,
): void {
  const { cellWidth: cw, cellHeight: ch } = view;
  const t = easeOut(progress.move);
  ctx.clearRect(0, 0, s.width * cw, s.height * ch);

  ctx.fillStyle = palette.wall;
  for (let y = 0; y < s.height; y++) {
    for (let x = 0; x < s.width; x++) {
      if (s.rows[y][x] !== '#') continue;
      const alpha = visibility(s, x, y, progress.reveal);
      if (alpha <= 0) continue;
      ctx.globalAlpha = alpha;
      const left = Math.round(x * cw);
      const top = Math.round(y * ch);
      ctx.fillRect(left, top, Math.round((x + 1) * cw) - left, Math.round((y + 1) * ch) - top);
    }
  }

  ctx.font = `700 ${Math.floor(ch * GLYPH_SCALE)}px ${view.fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const glyph = (char: string, pos: Pos, color: string) => {
    const alpha = visibility(s, Math.round(pos.x), Math.round(pos.y), progress.reveal);
    if (alpha <= 0) return;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillText(char, (pos.x + 0.5) * cw, (pos.y + 0.54) * ch);
  };

  glyph('|', s.doors.player, palette.player);
  glyph('|', s.doors.rival, palette.rival);
  s.traps.filter((trap) => trap.revealed).forEach((trap) => glyph(trap.kind === 'spike' ? '^' : '&', trap.pos, palette.danger));
  s.items.forEach((item) => glyph(item.kind === 'weapon' ? ')' : '[', item.pos, palette.loot));

  const before = new Map(previous?.monsters.map((m) => [m.id, m.pos]));
  s.monsters.forEach((m) => glyph(MONSTERS[m.kind].glyph, between(before.get(m.id), m.pos, t), palette.danger));
  if (s.rival.hp > 0) glyph('*', between(previous?.rival.pos, s.rival.pos, t), palette.rival);
  if (s.player.hp > 0) glyph('@', between(previous?.player.pos, s.player.pos, t), palette.player);

  if (progress.move < 1) {
    for (const event of s.events) {
      if (event.type === 'pickup') continue;
      ctx.globalAlpha = (1 - progress.move) * FLASH_ALPHA;
      ctx.fillStyle = event.type === 'trap' || event.type === 'bite' ? palette.danger : palette[event.who];
      ctx.fillRect(event.pos.x * cw, event.pos.y * ch, cw, ch);
    }
  }
  ctx.globalAlpha = 1;
}
