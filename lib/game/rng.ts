export type Rng = {
  /** Float in [0, 1). */
  readonly next: () => number;
  /** Integer in [0, n). */
  readonly int: (n: number) => number;
  /** Internal state, so a later call can continue the same sequence. */
  readonly state: () => number;
};

/** mulberry32: small, fast and deterministic, which keeps the game testable. */
export function createRng(seed: number): Rng {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return { next, int: (n) => Math.floor(next() * n), state: () => a };
}
