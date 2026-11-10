export type Pos = { readonly x: number; readonly y: number };
export type Dir = 'up' | 'right' | 'down' | 'left';
export type Who = 'player' | 'rival';

export type Fighter = {
  readonly pos: Pos;
  readonly hp: number;
  readonly maxHp: number;
  readonly atk: number;
  readonly def: number;
  readonly level: number;
  readonly kills: number;
  readonly loot: number;
};

export type MonsterKind = 'gnome' | 'gremlin' | 'jelly' | 'dragon';
export type Monster = {
  readonly id: number;
  readonly kind: MonsterKind;
  readonly pos: Pos;
  readonly hp: number;
};

export type ItemKind = 'weapon' | 'armor';
export type Item = {
  readonly id: number;
  readonly kind: ItemKind;
  readonly pos: Pos;
  readonly bonus: number;
};

export type TrapKind = 'spike' | 'poison';
export type Trap = {
  readonly id: number;
  readonly kind: TrapKind;
  readonly pos: Pos;
  readonly revealed: boolean;
};

export type GameEvent =
  | { readonly type: 'pickup'; readonly who: Who; readonly item: ItemKind; readonly bonus: number; readonly pos: Pos }
  | { readonly type: 'trap'; readonly who: Who; readonly trap: TrapKind; readonly pos: Pos }
  | { readonly type: 'strike'; readonly who: Who; readonly target: MonsterKind | Who; readonly damage: number; readonly pos: Pos }
  | { readonly type: 'kill'; readonly who: Who; readonly target: MonsterKind; readonly pos: Pos }
  | { readonly type: 'bite'; readonly who: Who; readonly by: MonsterKind; readonly damage: number; readonly pos: Pos };

export type Status = 'running' | 'won' | 'lost';
export type Rect = { readonly x0: number; readonly y0: number; readonly x1: number; readonly y1: number };

export type GameState = {
  /** Seed the dungeon was generated from; identifies one run. */
  readonly id: number;
  readonly width: number;
  readonly height: number;
  /** Column of the wall that splits the map into the two halves. */
  readonly mid: number;
  /** One string per row: '#' is wall, '.' is floor. */
  readonly rows: readonly string[];
  /** Arena bounds including its outer wall. */
  readonly arena: Rect;
  readonly doors: { readonly player: Pos; readonly rival: Pos };
  readonly starts: { readonly player: Pos; readonly rival: Pos };
  readonly player: Fighter;
  readonly rival: Fighter;
  readonly monsters: readonly Monster[];
  readonly items: readonly Item[];
  readonly traps: readonly Trap[];
  readonly turn: number;
  readonly status: Status;
  /** Everything that happened during the most recent turn. */
  readonly events: readonly GameEvent[];
  readonly lastEvent: GameEvent | null;
  /** Current state of the random number generator. */
  readonly seed: number;
};

export type MonsterSpec = {
  readonly glyph: string;
  readonly hp: number;
  readonly atk: number;
  readonly def: number;
  readonly range: number;
  /** Moves once every `pace` turns. */
  readonly pace: number;
};
