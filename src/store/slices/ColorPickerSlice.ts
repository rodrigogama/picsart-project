import { StateCreator } from "zustand";

type State = {
  hoveredColor: string;
  selectedColor: string;
};

type Actions = {
  setHoveredColor: (color: string) => void;
  setSelectedColor: (color: string) => void;
};

export type ColorPickerSlice = State & Actions;

export const colorPickerInitialState: State = {
  hoveredColor: "",
  selectedColor: "",
};

export const createColorPickerSlice: StateCreator<
  ColorPickerSlice,
  [],
  [],
  ColorPickerSlice
> = (set) => ({
  ...colorPickerInitialState,
  setHoveredColor: (hoveredColor) => set({ hoveredColor }),
  setSelectedColor: (selectedColor) => set({ selectedColor }),
});
