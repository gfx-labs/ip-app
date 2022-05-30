import { StrictMode, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./theme/fonts.css";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";
import { AppLayout } from "./components/partials/app-layout";
import { Web3ContextProvider } from "./components/libs/web3-data-provider/Web3Provider";
import { WalletModalProvider } from "./components/libs/wallet-modal-provider/WalletModalProvider";
import { ModalContentProvider } from "./components/libs/modal-content-provider/ModalContentProvider";
import { PaletteModeContextProvider } from "./components/libs/palette-mode-provider/palette-mode-provider";
import Dashboard from "./pages";
import RedirectBook from "./pages/book";
import LandingPage  from "./pages/landing";
import NotFound404Page from "./pages/404";
import {
  DepositWithdrawUSDCModal,
  DepositWithdrawCollateralModal,
  BorrowRepayModal,
  WithdrawUSDCConfirmationModal,
  DepositUSDCConfirmationModal,
  WithdrawCollateralConfirmationModal,
  DepositCollateralConfirmationModal,
  DelegateModal,
  TransactionStatusModal,
} from "./components/util/modal";
import { ClaimModal } from "./components/util/modal/ClaimModal";
import { RolodexContentProvider } from "./components/libs/rolodex-data-provider/RolodexDataProvider";
import { SwapTokenProvider } from "./components/libs/swap-token-provider/SwapTokenProvider";
import { VaultDataProvider } from "./components/libs/vault-data-provider/VaultDataProvider";
import { StableCoinsProvider } from "./components/libs/stable-coins-provider/StableCoinsProvider";
import { AppGovernanceProvider } from "./components/libs/app-governance-provider/AppGovernanceProvider";

// https://github.com/NoahZinsmeister/web3-react/tree/v6/docs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getWeb3Library(provider: any): providers.Web3Provider {
  const library = new providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const WalletContext = (props:{children:any}) => {
  return(<Web3ReactProvider getLibrary={getWeb3Library}>
    <Web3ContextProvider>
      <RolodexContentProvider>
        <StableCoinsProvider>
          <VaultDataProvider>
            <ModalContentProvider>
              <AppGovernanceProvider>

                <>
                  <WalletModalProvider>
                    <SwapTokenProvider>
                      {props.children}
                    </SwapTokenProvider>
                  </WalletModalProvider>
                  <DelegateModal />
                  <DepositWithdrawCollateralModal />
                  <DepositCollateralConfirmationModal />
                  <WithdrawCollateralConfirmationModal />
                  <DepositWithdrawUSDCModal />
                  <BorrowRepayModal />
                  <DepositUSDCConfirmationModal />
                  <WithdrawUSDCConfirmationModal />
                  <ClaimModal />
                  <TransactionStatusModal />
                </>
              </AppGovernanceProvider>
            </ModalContentProvider>
          </VaultDataProvider>
        </StableCoinsProvider>
      </RolodexContentProvider>

    </Web3ContextProvider>
  </Web3ReactProvider>)
}

const AppRouter = ()=>{
  return (<Routes>
    <Route
      path={`/landing`}
      element={
        <LandingPage />
      }
    />
    <Route
      path={`/`}
      element={
        <WalletContext>
          <AppLayout>
            <Dashboard/>
          </AppLayout>
        </WalletContext>

      }
    />
    <Route
      path={`/^\/(docs|book)`}
      element={<RedirectBook />}
    />
    <Route
      path={`*`}
      element={
        <AppLayout>
          <NotFound404Page />
        </AppLayout>
      }
    />
  </Routes>)
}


const App = () => {
  return (
    <StrictMode>
      <Suspense fallback={<p>Loading...</p>}>
        <StyledEngineProvider injectFirst>
          <PaletteModeContextProvider>
            <>
              <CssBaseline />
              <AppRouter />
            </>
          </PaletteModeContextProvider>
        </StyledEngineProvider>
      </Suspense>
    </StrictMode>
  );
};

export default App;
