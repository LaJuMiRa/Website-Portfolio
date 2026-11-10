import type { Fighter, MonsterKind, MonsterSpec, Pos } from './types';

export const MONSTERS: Record<MonsterKind, MonsterSpec> = {
  gnome: { glyph: 'G', hp: 5, atk: 2, def: 2, range: 6, pace: 1 },
  gremlin: { glyph: 'g', hp: 6, atk: 2, def: 1, range: 8, pace: 1 },
  jelly: { glyph: 'J', hp: 8, atk: 3, def: 0, range: 10, pace: 1 },
  // Tuned down from the terminal game so a short browser run stays winnable.
  dragon: { glyph: 'D', hp: 14, atk: 5, def: 2, range: 6, pace: 2 },
};

export const START_STATS = { hp: 20, atk: 3, def: 1 } as const;
export const SPIKE_DAMAGE = 3;
export const POISON_DEF_LOSS = 2;
export const MAX_ITEM_BONUS = 3;
/** After this many turns both AIs stop exploring and go for the duel. */
export const HUNT_LIMIT = 240;

export const MIN_WIDTH = 21;
export const MIN_HEIGHT = 15;

export const damage = (atk: number, def: number): number => Math.max(1, atk - def);

export const newFighter = (pos: Pos): Fighter => ({
  pos,
  hp: START_STATS.hp,
  maxHp: START_STATS.hp,
  atk: START_STATS.atk,
  def: START_STATS.def,
  level: 1,
  kills: 0,
  loot: 0,
});

export const levelUp = (f: Fighter): Fighter => {
  const level = f.level + 1;
  const maxHp = f.maxHp + 2;
  return {
    ...f,
    level,
    maxHp,
    hp: Math.min(maxHp, f.hp + 4),
    atk: f.atk + (level % 2 === 0 ? 1 : 0),
    kills: f.kills + 1,
  };
};
