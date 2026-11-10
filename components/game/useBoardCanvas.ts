'use client';

import { useEffect, useRef, type RefObject } from 'react';
import type { GameState } from '@/lib/game';
import { drawBoard, readPalette, type Palette } from './renderer';
import type { BoardSize } from './useBoardSize';

const MOVE_MS = 150;
const REVEAL_MS = 1100;

type Anim = {
  game: GameState | null;
  previous: GameState | null;
  moveStart: number;
  revealStart: number;
  frame: number;
  palette: Palette | null;
};

/** Paints the game onto the canvas and animates moves, hits and the reveal of a new dungeon. */
export function useBoardCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  game: GameState | null,
  size: BoardSize | null,
  reducedMotion: boolean,
): void {
  const anim = useRef<Anim>({ game: null, previous: null, moveStart: 0, revealStart: 0, frame: 0, palette: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !game || !size) return;
    const state = anim.current;
    const now = performance.now();
    const sameRun = state.game?.id === game.id;
    if (state.game !== game) {
      state.previous = sameRun ? state.game : null;
      state.moveStart = now;
      if (!sameRun) state.revealStart = now;
      state.game = game;
    }

    const dpr = window.devicePixelRatio || 1;
    const pixelWidth = Math.round(size.width * dpr);
    const pixelHeight = Math.round(size.height * dpr);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }
    const view = {
      cellWidth: size.width / game.width,
      cellHeight: size.height / game.height,
      fontFamily: getComputedStyle(canvas).fontFamily,
    };

    const paint = (time: number) => {
      state.frame = 0;
      state.palette ??= readPalette(canvas);
      const move = reducedMotion ? 1 : Math.min(1, (time - state.moveStart) / MOVE_MS);
      const reveal = reducedMotion ? 1 : Math.min(1, (time - state.revealStart) / REVEAL_MS);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawBoard(ctx, game, state.previous, { move, reveal }, view, state.palette);
      if (move < 1 || reveal < 1) state.frame = requestAnimationFrame(paint);
    };
    const repaint = () => {
      state.palette = null;
      if (!state.frame) state.frame = requestAnimationFrame(paint);
    };

    cancelAnimationFrame(state.frame);
    state.frame = requestAnimationFrame(paint);

    // Colours come from CSS, so repaint when the theme flips or the web font arrives.
    const themeObserver = new MutationObserver(repaint);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    let active = true;
    document.fonts.ready.then(() => { if (active) repaint(); }).catch(() => { /* fallback font stays in place */ });

    return () => {
      active = false;
      themeObserver.disconnect();
      cancelAnimationFrame(state.frame);
      state.frame = 0;
    };
  }, [canvasRef, game, size, reducedMotion]);
}
