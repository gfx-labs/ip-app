import { createContext, useState, useContext, useEffect } from "react";
import { NewRolodex, Rolodex } from "../../../chain/rolodex/rolodex";
import { useWeb3Context } from "../web3-data-provider/Web3Provider";

export const RolodexContentContext = createContext({} as Rolodex | null);

export const RolodexContentProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const ctx = useWeb3Context();
  const [rolodex, setRolo] = useState<Rolodex | null>(null);
  
  useEffect(() => {
      NewRolodex(ctx).then((rol) => setRolo(rol));
  }, [ctx.connected, ctx.currentAccount]);

  return (
    <RolodexContentContext.Provider value={rolodex}>
      {children}
    </RolodexContentContext.Provider>
  );
};

export const useRolodexContext = () => {
  const context = useContext(RolodexContentContext);

  if (context === undefined) {
    throw new Error("useRolodexContext must be used within a RolodexProvider");
  }

  return context;
};