import { create } from "zustand";
import {
  CanvasCursorSlice,
  CanvasImageSlice,
  ColorPickerSlice,
  createCanvasCursorSlice,
  createCanvasImageSlice,
  createColorPickerSlice,
  canvasImageInitialState,
  colorPickerInitialState,
  canvasCursorInitialState,
} from "./slices";

type StoreSlices = CanvasCursorSlice & CanvasImageSlice & ColorPickerSlice;

interface ColorDropperStore extends StoreSlices {
  reset: () => void;
}

export const useColorDropperStore = create<ColorDropperStore>()(
  (set, get, store) => ({
    ...createCanvasCursorSlice(set, get, store),
    ...createCanvasImageSlice(set, get, store),
    ...createColorPickerSlice(set, get, store),
    reset: () => {
      set({
        ...canvasImageInitialState,
        ...colorPickerInitialState,
        ...canvasCursorInitialState,
      });
    },
  })
);
