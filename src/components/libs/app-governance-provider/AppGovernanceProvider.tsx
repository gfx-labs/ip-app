import { createContext, useState, useContext, useEffect } from "react";
import { Token } from "../../../chain/tokens";
import { useStableCoinsContext } from "../stable-coins-provider/StableCoinsProvider";

type AppGovernanceContextType = {
  isApp: boolean;
  setIsApp: (val: boolean) => void 
};

export const AppGovernanceContext = createContext(
  [] as unknown as AppGovernanceContextType
);

export const AppGovernanceProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [isApp, setIsApp] = useState<boolean>(true);

  return (
    <AppGovernanceContext.Provider value={{isApp, setIsApp}}>
      {children}
    </AppGovernanceContext.Provider>
  );
};

export const useAppGovernanceContext = () => {
  const context = useContext(AppGovernanceContext);

  if (context === undefined) {
    throw new Error(
      "useAppGovernanceContext must be used within a AppGovernanceProvider"
    );
  }

  return context;
};
