'use client';

import { useEffect, useState, type RefObject } from 'react';
import { MIN_WIDTH } from '@/lib/game';

export type BoardSize = {
  readonly width: number;
  readonly height: number;
  readonly cols: number;
  readonly rows: number;
};

const CELL_ASPECT = 1.3;
const WIDE_BREAKPOINT = 640;
const WIDE_ROWS = 15;
const NARROW_ROWS = 19;
const MAX_COLS = 61;

/** Like the terminal game, the dungeon is sized to the window it starts in. */
export function fitGrid(width: number, height: number): Pick<BoardSize, 'cols' | 'rows'> {
  const rows = width >= WIDE_BREAKPOINT ? WIDE_ROWS : NARROW_ROWS;
  const idealCols = width / (height / rows / CELL_ASPECT);
  const cols = Math.round((idealCols - 1) / 4) * 4 + 1;
  return { cols: Math.min(MAX_COLS, Math.max(MIN_WIDTH, cols)), rows };
}

export function useBoardSize(ref: RefObject<HTMLElement | null>): BoardSize | null {
  const [size, setSize] = useState<BoardSize | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return;
      setSize((current) =>
        current && current.width === width && current.height === height
          ? current
          : { width, height, ...fitGrid(width, height) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}
