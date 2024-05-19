import { StateCreator } from "zustand";

type State = {
  cursorXPosition: number | null;
  cursorYPosition: number | null;
};

type Actions = {
  setCursorPosition: (x: number | null, y: number | null) => void;
};

export type CanvasCursorSlice = State & Actions;

export const canvasCursorInitialState: State = {
  cursorXPosition: null,
  cursorYPosition: null,
};

export const createCanvasCursorSlice: StateCreator<
  CanvasCursorSlice,
  [],
  [],
  CanvasCursorSlice
> = (set) => ({
  ...canvasCursorInitialState,
  setCursorPosition: (x, y) => set({ cursorXPosition: x, cursorYPosition: y }),
});
