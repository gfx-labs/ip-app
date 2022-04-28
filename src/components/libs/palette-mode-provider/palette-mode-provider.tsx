import { PaletteMode, createTheme, Theme, ThemeProvider } from "@mui/material";
import { createContext, useState } from "react";
import { getDesignTokens } from "../../../theme";

export type PaletteModeContextType = {
  toggleMode: () => void;
};

export const PaletteModeContext = createContext<PaletteModeContextType>(
  {} as PaletteModeContextType
);

export const PaletteModeContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const theme = createTheme(getDesignTokens(mode));

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <PaletteModeContext.Provider value={{ toggleMode }}>
      <ThemeProvider {...{ theme }}>{children}</ThemeProvider>
    </PaletteModeContext.Provider>
  );
};
