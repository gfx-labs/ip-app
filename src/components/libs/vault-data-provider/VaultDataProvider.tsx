import React, {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {
  CollateralTokens,
  getTokensListOnCurrentChain,
  Token,
} from "../../../chain/tokens";
import { useRolodexContext } from "../rolodex-data-provider/RolodexDataProvider";
import { useWeb3Context } from "../web3-data-provider/Web3Provider";
import { getVaultTokenBalanceAndPrice, getVaultTokenMetadata } from "./getVaultTokenBalanceAndPrice";
import { getVaultBorrowingPower } from "./getBorrowingPower";
import {useBalanceOf} from "../../../hooks/useTokenInfo";
import {getBalance} from "../../../hooks/useBalanceOf";
import {BN} from "../../../easy/bn";
import {JsonRpcSigner} from "@ethersproject/providers";
import {Rolodex} from "../../../chain/rolodex/rolodex";
import {BigNumber, BigNumberish} from "ethers";

export type VaultDataContextType = {
  hasVault: boolean;
  setVaultID: Dispatch<SetStateAction<string | null>>;
  redraw: boolean;
  setRedraw: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  vaultID: string | null;
  vaultAddress?: string;
  setVaultAddress: Dispatch<SetStateAction<string | undefined>>;
  borrowingPower: number;
  accountLiability: number;
  tokens: CollateralTokens | undefined;
  setTokens: Dispatch<SetStateAction<CollateralTokens | undefined>>;
};

export const VaultDataContext = React.createContext({} as VaultDataContextType);

export const VaultDataProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { dataBlock, provider, currentAccount, chainId } = useWeb3Context();
  const rolodex = useRolodexContext();
  const [redraw, setRedraw] = useState(false)
  const [hasVault, setHasVault] = useState(false);
  const [refresh, setRefresh] = useState(false)
  const [vaultID, setVaultID] = useState<string | null>(null);
  const [vaultAddress, setVaultAddress] = useState<VaultDataContextType["vaultAddress"]>(undefined);
  const [accountLiability, setAccountLiability] = useState(0)
  const [borrowingPower, setBorrowingPower] = useState(0)
  const [tokens, setTokens] = useState<VaultDataContextType["tokens"]>(undefined);

  const update = async ()=>{
    const px:Array<Promise<any>> = []
    if (rolodex && rolodex.VC){
      rolodex.VC!.vaultLiability(vaultID!).then((val)=>{
        const vl = val.div(BN('1e16')).toNumber()/100
        setAccountLiability(vl)
      }).catch((e)=>{
        console.log("could not get account liability", e)
      })
      getVaultBorrowingPower(vaultID!, rolodex!).then(res => {
        if(res != undefined) {
          setBorrowingPower(res)
        }
      }).catch((e)=>{
        console.log("could not get borrowing power ", e)
      })
      for (const [key, token] of Object.entries(tokens!)) {
        let p1 = getVaultTokenMetadata(
          vaultAddress!,
          token.address,
          rolodex!
        ).then((res) => {
          token.token_penalty = res.penalty
          token.token_LTV = res.ltv
        }).catch((e)=>{
          console.log("failed token metadata check", e)
        })
        if(!(token.token_LTV && token.token_penalty)){
          px.push(p1)
        }
        let p2 = getVaultTokenBalanceAndPrice(
          vaultAddress!,
          token.address,
          rolodex!
        ).then((res) => {
          token.value = Number(res.livePrice);
          token.vault_amount = Number(res.balance);
          token.vault_balance = Number(
            (token.vault_amount * token.value).toFixed(2)
          );
        }).catch((e)=>{
          console.log("failed vault balance & price", e)
        });
        px.push(p2)
        let p3 = getBalance(token.address,  currentAccount, rolodex!.provider).then((val)=>{
          token.wallet_amount = val
        }).catch((e)=>{
          console.log("failed to get token balances")
        })
        px.push(p3)
      }
    }
    return Promise.all(px)
  }
  useEffect(() => {
    if(redraw){
      console.log("redraw called", tokens)
      setRedraw(false)
    }
  }, [redraw]);


  useEffect(()=>{
    if (vaultAddress && vaultID && rolodex && tokens){
      console.log("update called @ block", dataBlock)
      update().then(()=>{
        setRedraw(true)
      }).catch((e)=>{
        setRedraw(true)
        console.log("update error",e)
      })
    }
    setRefresh(false)
  }, [tokens, vaultAddress, rolodex, refresh, dataBlock]);

  useEffect(()=>{
    setTokens(getTokensListOnCurrentChain(chainId))
  },[chainId])

  useEffect(() => {
    if (currentAccount && rolodex) {
      rolodex?.VC?.vaultIDs(currentAccount).then((vaultIDs)=>{
        if (vaultIDs && vaultIDs?.length > 0) {
          const id = BigNumber.from(vaultIDs[0]._hex).toString();
          setVaultID(id);
        } else {
          setVaultID(null);
        }
      })
    }
  }, [currentAccount, rolodex]);


  useEffect(() => {
    setHasVault(!!vaultID);
    if(hasVault && rolodex) {
      rolodex?.VC?.vaultAddress(vaultID!).then((addr)=>{
        setVaultAddress(addr);
      }).catch((e)=>{
        console.log("failed to get vault address", e)
      })
    }
  }, [vaultID, rolodex]);

  return (
    <VaultDataContext.Provider
      value={{ hasVault, setVaultID, vaultID, vaultAddress, setVaultAddress, borrowingPower,redraw, setRedraw, refresh, setRefresh, tokens, setTokens, accountLiability}}
    >
      {children}
    </VaultDataContext.Provider>
  );
};

export const useVaultDataContext = () => {
  const context = useContext(VaultDataContext);

  if (context === undefined) {
    throw new Error(
      "useVaultDataContext must be used within a WalletModalProvider"
    );
  }

  return context;
};
