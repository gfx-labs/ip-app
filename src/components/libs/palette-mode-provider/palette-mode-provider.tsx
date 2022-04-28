import { PaletteMode } from "@mui/material";
import { createContext, useState } from "react";

export type PaleteModeContextType = {
  mode: PaletteMode;
  toggleMode: () => void;
};

export const PaleteModeContextProvider = createContext<PaleteModeContextType>(
  {} as PaleteModeContextType
);

export const usePaletteMode = (): PaleteModeContextType => {
  const [mode, setMode] = useState<PaleteModeContextType["mode"]>("dark");

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return { mode, toggleMode };
};
