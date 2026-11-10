import type { GameEvent, MonsterKind, Who } from '@/lib/game';
import type { Lang } from '@/components/LanguageProvider';

export type GameText = {
  board: string;
  you: string;
  demoPilot: string;
  rival: string;
  hp: string;
  atk: string;
  def: string;
  level: string;
  takeControl: string;
  backToDemo: string;
  newDungeon: string;
  playAgain: string;
  hintDemo: string;
  hintPlay: string;
  idle: string;
  won: string;
  lost: string;
  summary: (turns: number, kills: number, loot: number) => string;
  moves: Record<'up' | 'right' | 'down' | 'left', string>;
  event: (e: GameEvent) => string;
};

const GLYPH: Record<Who, string> = { player: '@', rival: '*' };

const EN_MONSTER: Record<MonsterKind, string> = { gnome: 'gnome', gremlin: 'gremlin', jelly: 'jelly', dragon: 'dragon' };
const DE_MONSTER: Record<MonsterKind, { nom: string; acc: string }> = {
  gnome: { nom: 'Der Gnom', acc: 'den Gnom' },
  gremlin: { nom: 'Der Gremlin', acc: 'den Gremlin' },
  jelly: { nom: 'Der Schleim', acc: 'den Schleim' },
  dragon: { nom: 'Der Drache', acc: 'den Drachen' },
};
const isWho = (target: MonsterKind | Who): target is Who => target === 'player' || target === 'rival';

const en: GameText = {
  board: 'Dungeon-Crawler running in the browser: a maze split into two halves with an arena in the middle.',
  you: 'You',
  demoPilot: 'Demo AI',
  rival: 'Rival',
  hp: 'HP',
  atk: 'ATK',
  def: 'DEF',
  level: 'LVL',
  takeControl: 'Play it yourself',
  backToDemo: 'Back to the demo',
  newDungeon: 'New dungeon',
  playAgain: 'Play again',
  hintDemo: 'Both sides are played by the AI.',
  hintPlay: 'You are @. Move with WASD or the arrow keys, walk into a monster to attack it. Esc hands control back.',
  idle: 'A new dungeon. Loot first, monsters second, arena last.',
  won: '@ wins the arena',
  lost: '* wins the arena',
  summary: (turns, kills, loot) => `${turns} turns, ${kills} monsters defeated, ${loot} items collected`,
  moves: { up: 'Move up', right: 'Move right', down: 'Move down', left: 'Move left' },
  event: (e) => {
    const who = GLYPH[e.who];
    switch (e.type) {
      case 'pickup':
        return e.item === 'weapon'
          ? `${who} picks up a weapon (+${e.bonus} attack)`
          : `${who} picks up armor (+${e.bonus} defense)`;
      case 'trap':
        return e.trap === 'spike' ? `${who} steps on spikes (−3 HP)` : `${who} walks into a poison cloud (−2 defense)`;
      case 'strike':
        return `${who} hits ${isWho(e.target) ? GLYPH[e.target] : `the ${EN_MONSTER[e.target]}`} for ${e.damage}`;
      case 'kill':
        return `${who} defeats the ${EN_MONSTER[e.target]} and levels up`;
      case 'bite':
        return `The ${EN_MONSTER[e.by]} hits ${who} for ${e.damage}`;
    }
  },
};

const de: GameText = {
  board: 'Dungeon-Crawler im Browser: ein Labyrinth aus zwei Hälften mit einer Arena in der Mitte.',
  you: 'Du',
  demoPilot: 'Demo-KI',
  rival: 'Rivale',
  hp: 'LP',
  atk: 'ANG',
  def: 'VER',
  level: 'LVL',
  takeControl: 'Selbst spielen',
  backToDemo: 'Zurück zur Demo',
  newDungeon: 'Neuer Dungeon',
  playAgain: 'Noch einmal spielen',
  hintDemo: 'Beide Seiten werden von der KI gespielt.',
  hintPlay: 'Du bist @. Bewege dich mit WASD oder den Pfeiltasten, lauf in ein Monster, um es anzugreifen. Esc gibt die Kontrolle zurück.',
  idle: 'Ein neuer Dungeon. Erst Beute, dann Monster, zuletzt die Arena.',
  won: '@ gewinnt die Arena',
  lost: '* gewinnt die Arena',
  summary: (turns, kills, loot) => `${turns} Züge, ${kills} Monster besiegt, ${loot} Gegenstände gesammelt`,
  moves: { up: 'Nach oben', right: 'Nach rechts', down: 'Nach unten', left: 'Nach links' },
  event: (e) => {
    const who = GLYPH[e.who];
    switch (e.type) {
      case 'pickup':
        return e.item === 'weapon'
          ? `${who} hebt eine Waffe auf (+${e.bonus} Angriff)`
          : `${who} hebt eine Rüstung auf (+${e.bonus} Verteidigung)`;
      case 'trap':
        return e.trap === 'spike' ? `${who} tritt in eine Stachelfalle (−3 LP)` : `${who} gerät in eine Giftwolke (−2 Verteidigung)`;
      case 'strike':
        return `${who} trifft ${isWho(e.target) ? GLYPH[e.target] : DE_MONSTER[e.target].acc} (${e.damage} Schaden)`;
      case 'kill':
        return `${who} besiegt ${DE_MONSTER[e.target].acc} und steigt auf`;
      case 'bite':
        return `${DE_MONSTER[e.by].nom} trifft ${who} (${e.damage} Schaden)`;
    }
  },
};

export const GAME_TEXT: Record<Lang, GameText> = { en, de };
