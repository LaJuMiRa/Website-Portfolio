import { chooseMove } from './ai';
import { firstStep, inArena, isWall, manhattan, same, sameSide, shift, DIR_LIST } from './grid';
import { createRng, type Rng } from './rng';
import { MONSTERS, POISON_DEF_LOSS, SPIKE_DAMAGE, damage, levelUp } from './rules';
import type { Dir, Fighter, GameEvent, GameState, Monster, Status, Who } from './types';

const WANDER_CHANCE = 0.5;
const other = (who: Who): Who => (who === 'player' ? 'rival' : 'player');
const withEvent = (s: GameState, event: GameEvent): GameState => ({ ...s, events: [...s.events, event] });

function stepOnto(s: GameState, who: Who, me: Fighter): GameState {
  let next: GameState = { ...s, [who]: me };
  const item = s.items.find((i) => same(i.pos, me.pos));
  if (item) {
    const boosted: Fighter = item.kind === 'weapon'
      ? { ...me, atk: me.atk + item.bonus, loot: me.loot + 1 }
      : { ...me, def: me.def + item.bonus, loot: me.loot + 1 };
    next = withEvent(
      { ...next, [who]: boosted, items: s.items.filter((i) => i.id !== item.id) },
      { type: 'pickup', who, item: item.kind, bonus: item.bonus, pos: me.pos },
    );
  }
  const trap = s.traps.find((t) => !t.revealed && same(t.pos, me.pos));
  if (trap) {
    const current = next[who];
    const hurt: Fighter = trap.kind === 'spike'
      ? { ...current, hp: current.hp - SPIKE_DAMAGE }
      : { ...current, def: Math.max(0, current.def - POISON_DEF_LOSS) };
    next = withEvent(
      { ...next, [who]: hurt, traps: s.traps.map((t) => (t.id === trap.id ? { ...t, revealed: true } : t)) },
      { type: 'trap', who, trap: trap.kind, pos: me.pos },
    );
  }
  return next;
}

function actFighter(s: GameState, who: Who, dir: Dir | null): GameState {
  if (!dir) return s;
  const me = s[who];
  const target = shift(me.pos, dir);
  if (isWall(s, target)) return s;

  const foeKey = other(who);
  const foe = s[foeKey];
  if (same(foe.pos, target)) {
    const dealt = damage(me.atk, foe.def);
    return withEvent(
      { ...s, [foeKey]: { ...foe, hp: foe.hp - dealt } },
      { type: 'strike', who, target: foeKey, damage: dealt, pos: target },
    );
  }

  const monster = s.monsters.find((m) => same(m.pos, target));
  if (monster) {
    const dealt = damage(me.atk, MONSTERS[monster.kind].def);
    if (monster.hp - dealt <= 0) {
      return withEvent(
        { ...s, [who]: levelUp(me), monsters: s.monsters.filter((m) => m.id !== monster.id) },
        { type: 'kill', who, target: monster.kind, pos: target },
      );
    }
    return withEvent(
      { ...s, monsters: s.monsters.map((m) => (m.id === monster.id ? { ...m, hp: m.hp - dealt } : m)) },
      { type: 'strike', who, target: monster.kind, damage: dealt, pos: target },
    );
  }

  return stepOnto(s, who, { ...me, pos: target });
}

function moveMonster(s: GameState, monster: Monster, dir: Dir | null): GameState {
  if (!dir) return s;
  const target = shift(monster.pos, dir);
  const taken = isWall(s, target) || inArena(s, target) || same(s.player.pos, target) ||
    same(s.rival.pos, target) || s.monsters.some((m) => same(m.pos, target));
  if (taken) return s;
  return { ...s, monsters: s.monsters.map((m) => (m.id === monster.id ? { ...m, pos: target } : m)) };
}

function actMonster(s: GameState, monster: Monster, rng: Rng): GameState {
  const spec = MONSTERS[monster.kind];
  const prey = (['player', 'rival'] as const)
    .filter((who) => s[who].hp > 0 && !inArena(s, s[who].pos) && sameSide(s, s[who].pos, monster.pos))
    .filter((who) => manhattan(s[who].pos, monster.pos) <= spec.range)
    .sort((a, b) => manhattan(s[a].pos, monster.pos) - manhattan(s[b].pos, monster.pos))[0];

  if (prey && manhattan(s[prey].pos, monster.pos) === 1) {
    const victim = s[prey];
    const dealt = damage(spec.atk, victim.def);
    return withEvent(
      { ...s, [prey]: { ...victim, hp: victim.hp - dealt } },
      { type: 'bite', who: prey, by: monster.kind, damage: dealt, pos: victim.pos },
    );
  }
  if ((s.turn + monster.id) % spec.pace !== 0) return s;
  if (prey) {
    const blocked = (p: { x: number; y: number }) => inArena(s, p) || s.monsters.some((m) => same(m.pos, p));
    return moveMonster(s, monster, firstStep(s, monster.pos, (p) => same(p, s[prey].pos), blocked));
  }
  if (rng.next() < WANDER_CHANCE) return s;
  return moveMonster(s, monster, DIR_LIST[rng.int(DIR_LIST.length)]);
}

const statusOf = (s: GameState): Status =>
  s.player.hp <= 0 ? 'lost' : s.rival.hp <= 0 ? 'won' : 'running';

function finish(s: GameState, rng: Rng): GameState {
  return {
    ...s,
    turn: s.turn + 1,
    status: statusOf(s),
    lastEvent: s.events[s.events.length - 1] ?? s.lastEvent,
    seed: rng.state(),
  };
}

/** One full turn: the player acts, then every monster, then the rival. */
export function step(state: GameState, playerMove: Dir | null): GameState {
  if (state.status !== 'running') return state;
  const rng = createRng(state.seed);

  let s = actFighter({ ...state, events: [] }, 'player', playerMove);
  if (statusOf(s) !== 'running') return finish(s, rng);

  for (const { id } of s.monsters) {
    const monster = s.monsters.find((m) => m.id === id);
    if (monster) s = actMonster(s, monster, rng);
  }
  if (statusOf(s) !== 'running') return finish(s, rng);

  s = actFighter(s, 'rival', chooseMove(s, 'rival'));
  return finish(s, rng);
}

/** A turn where the player is steered by the same AI as the rival. */
export const demoStep = (state: GameState): GameState => step(state, chooseMove(state, 'player'));
