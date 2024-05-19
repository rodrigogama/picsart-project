import { StateCreator } from "zustand";
import { CanvasManager } from "../../shared/utils/helpers";

type State = {
  canvasManager: CanvasManager | null;
};

type Actions = {
  setCanvasManager: (manager: CanvasManager | null) => void;
};

export type CanvasImageSlice = State & Actions;

export const canvasImageInitialState: State = {
  canvasManager: null,
};

export const createCanvasImageSlice: StateCreator<
  CanvasImageSlice,
  [],
  [],
  CanvasImageSlice
> = (set) => ({
  ...canvasImageInitialState,
  setCanvasManager: (canvasManager) => set({ canvasManager }),
});
