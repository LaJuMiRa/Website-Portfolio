import { describe, expect, it } from 'vitest';
import { createGame, demoStep, step } from '@/lib/game';
import { DIR_LIST, firstStep, isWall, shift } from '@/lib/game/grid';
import type { Dir, GameState, Pos } from '@/lib/game';

const W = 41;
const H = 15;

function reachable(s: GameState, from: Pos): Set<string> {
  const seen = new Set<string>([`${from.x},${from.y}`]);
  const queue = [from];
  for (let i = 0; i < queue.length; i++) {
    for (const dir of DIR_LIST) {
      const next = shift(queue[i], dir);
      const key = `${next.x},${next.y}`;
      if (isWall(s, next) || seen.has(key)) continue;
      seen.add(key);
      queue.push(next);
    }
  }
  return seen;
}

const openDir = (s: GameState): Dir => {
  const dir = DIR_LIST.find((d) => !isWall(s, shift(s.player.pos, d)));
  if (!dir) throw new Error('player is walled in');
  return dir;
};
const empty = (s: GameState): GameState => ({ ...s, monsters: [], items: [], traps: [] });

describe('createGame', () => {
  it('rejects sizes that do not fit the maze grid', () => {
    expect(() => createGame(40, 15, 1)).toThrow(RangeError);
    expect(() => createGame(41, 13, 1)).toThrow(RangeError);
    expect(() => createGame(9, 15, 1)).toThrow(RangeError);
  });

  it('is deterministic for a seed and differs between seeds', () => {
    expect(createGame(W, H, 7)).toEqual(createGame(W, H, 7));
    expect(createGame(W, H, 7).rows).not.toEqual(createGame(W, H, 8).rows);
  });

  it.each([[21, 15], [25, 19], [41, 15], [61, 15]])('builds a sealed, fully connected %ix%i map', (w, h) => {
    for (let seed = 1; seed <= 25; seed++) {
      const s = createGame(w, h, seed);
      expect(s.rows).toHaveLength(h);
      expect(s.rows.every((r) => r.length === w)).toBe(true);
      expect(s.rows[0]).toBe('#'.repeat(w));
      expect(s.rows[h - 1]).toBe('#'.repeat(w));
      expect(s.rows.every((r) => r[0] === '#' && r[w - 1] === '#')).toBe(true);

      const floorCount = s.rows.join('').split('').filter((c) => c === '.').length;
      expect(reachable(s, s.player.pos).size).toBe(floorCount);

      for (let y = 0; y < h; y++) {
        if (y > s.arena.y0 && y < s.arena.y1) continue;
        expect(s.rows[y][s.mid]).toBe('#');
      }
      const occupied = [...s.items, ...s.traps, ...s.monsters].map((e) => e.pos);
      expect(occupied.every((p) => !isWall(s, p))).toBe(true);
      expect(new Set(occupied.map((p) => `${p.x},${p.y}`)).size).toBe(occupied.length);
      expect(s.monsters.length).toBeGreaterThanOrEqual(6);
    }
  });
});

describe('firstStep', () => {
  it('finds a way to the rival and returns null when the goal is sealed off', () => {
    const s = createGame(W, H, 3);
    expect(firstStep(s, s.player.pos, (p) => p.x === s.rival.pos.x && p.y === s.rival.pos.y, () => false)).not.toBeNull();
    expect(firstStep(s, s.player.pos, () => false, () => false)).toBeNull();
  });
});

describe('step', () => {
  it('moves the player, counts the turn and leaves the input untouched', () => {
    const s = empty(createGame(W, H, 5));
    const dir = openDir(s);
    const next = step(s, dir);
    expect(next.player.pos).toEqual(shift(s.player.pos, dir));
    expect(next.turn).toBe(1);
    expect(s.turn).toBe(0);
    expect(s.player.pos).toEqual(s.starts.player);
  });

  it('does not walk through walls', () => {
    const s = empty(createGame(W, H, 5));
    expect(step(s, 'left').player.pos).toEqual(s.player.pos);
  });

  it('picks up loot and springs traps', () => {
    const base = empty(createGame(W, H, 5));
    const dir = openDir(base);
    const pos = shift(base.player.pos, dir);
    const withLoot = step({ ...base, items: [{ id: 1, kind: 'weapon', pos, bonus: 2 }] }, dir);
    expect(withLoot.player.atk).toBe(base.player.atk + 2);
    expect(withLoot.items).toHaveLength(0);
    expect(withLoot.lastEvent?.type).toBe('pickup');

    const withTrap = step({ ...base, traps: [{ id: 1, kind: 'spike', pos, revealed: false }] }, dir);
    expect(withTrap.player.hp).toBe(base.player.hp - 3);
    expect(withTrap.traps[0].revealed).toBe(true);
  });

  it('attacks a monster instead of moving, and levels up on the kill', () => {
    const base = empty(createGame(W, H, 5));
    const dir = openDir(base);
    const pos = shift(base.player.pos, dir);
    const hit = step({ ...base, monsters: [{ id: 1, kind: 'jelly', pos, hp: 8 }] }, dir);
    expect(hit.player.pos).toEqual(base.player.pos);
    expect(hit.monsters[0].hp).toBe(5);
    expect(hit.player.hp).toBe(base.player.hp - 2);

    const kill = step({ ...base, monsters: [{ id: 1, kind: 'jelly', pos, hp: 1 }] }, dir);
    expect(kill.monsters).toHaveLength(0);
    expect(kill.player.level).toBe(2);
    expect(kill.player.kills).toBe(1);
  });

  it('ends the run when a fighter falls and then stops changing', () => {
    const base = empty(createGame(W, H, 5));
    const dir = openDir(base);
    const won = step({ ...base, rival: { ...base.rival, pos: shift(base.player.pos, dir), hp: 1 } }, dir);
    expect(won.status).toBe('won');
    expect(step(won, dir)).toBe(won);

    const lost = step({ ...base, player: { ...base.player, hp: 1 }, rival: { ...base.rival, pos: shift(base.player.pos, dir), atk: 9 } }, null);
    expect(lost.status).toBe('lost');
  });
});

describe('demo', () => {
  it('always reaches a result', () => {
    for (const [w, h] of [[21, 19], [41, 15], [57, 15]]) {
      for (let seed = 1; seed <= 40; seed++) {
        let s = createGame(w, h, seed);
        while (s.status === 'running' && s.turn < 1500) s = demoStep(s);
        expect(s.status, `seed ${seed} at ${w}x${h}`).not.toBe('running');
      }
    }
  });
});
