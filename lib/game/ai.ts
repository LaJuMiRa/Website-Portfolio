import { cellIndex, firstStep, inArena, same, shift, DIR_LIST } from './grid';
import { HUNT_LIMIT, MONSTERS, damage } from './rules';
import type { Dir, Fighter, GameState, Monster, Pos, Who } from './types';

const SAFETY_MARGIN = 3;

/** Would fighting this monster to the end leave the fighter close to death? */
export function isDangerous(me: Fighter, monster: Monster): boolean {
  const spec = MONSTERS[monster.kind];
  const hitsNeeded = Math.ceil(monster.hp / damage(me.atk, spec.def));
  return hitsNeeded * damage(spec.atk, me.def) >= me.hp - SAFETY_MARGIN;
}

/**
 * The same three-phase plan the rival follows in the terminal game:
 * collect the loot on its own half, hunt the monsters it can beat,
 * then walk through the arena and go after the opponent.
 */
export function chooseMove(s: GameState, who: Who): Dir | null {
  const me = s[who];
  const foe = s[who === 'player' ? 'rival' : 'player'];
  const homeIsLeft = who === 'player';
  const isHome = (p: Pos) => p.x < s.mid === homeIsLeft && !inArena(s, p);

  const threats = s.monsters.filter((m) => isDangerous(me, m));
  const threatCells = new Set(threats.map((m) => cellIndex(s, m.pos)));
  const nearThreat = new Set(
    threats.flatMap((m) => [m.pos, ...DIR_LIST.map((d) => shift(m.pos, d))]).map((p) => cellIndex(s, p)),
  );
  // Prefer a route that keeps a cell of distance to threats; settle for any route around them.
  const stepTowards = (isGoal: (p: Pos) => boolean): Dir | null =>
    firstStep(s, me.pos, isGoal, (p) => nearThreat.has(cellIndex(s, p))) ??
    firstStep(s, me.pos, isGoal, (p) => threatCells.has(cellIndex(s, p)));

  if (s.turn < HUNT_LIMIT) {
    const loot = s.items.filter((i) => isHome(i.pos));
    if (loot.length > 0) {
      const step = stepTowards((p) => loot.some((i) => same(i.pos, p)));
      if (step) return step;
    }
    const prey = s.monsters.filter((m) => isHome(m.pos) && !threatCells.has(cellIndex(s, m.pos)));
    if (prey.length > 0) {
      const step = stepTowards((p) => prey.some((m) => same(m.pos, p)));
      if (step) return step;
    }
  }
  return stepTowards((p) => same(p, foe.pos));
}
