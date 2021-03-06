import { StrictMode, Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./theme/fonts.css";
import WhitelistPage from "../src/pages/whitelist";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";
import { AppLayout } from "./components/partials/app-layout";
import { Web3ContextProvider } from "./components/libs/web3-data-provider/Web3Provider";
import { WalletModalProvider } from "./components/libs/wallet-modal-provider/WalletModalProvider";
import { ModalContentProvider } from "./components/libs/modal-content-provider/ModalContentProvider";
import { PaletteModeContextProvider } from "./components/libs/palette-mode-provider/palette-mode-provider";
import Dashboard from "./pages";
import PurchasePage from "./pages/sale";
import RedirectBook from "./pages/book";
import LandingPage from "./pages/landing";
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
  DelegateIPTModal,
  TransactionStatusModal,
} from "./components/util/modal";
import { ClaimModal } from "./components/util/modal/ClaimModal";
import { RolodexContentProvider } from "./components/libs/rolodex-data-provider/RolodexDataProvider";
import { SwapTokenProvider } from "./components/libs/swap-token-provider/SwapTokenProvider";
import { VaultDataProvider } from "./components/libs/vault-data-provider/VaultDataProvider";
import { StableCoinsProvider } from "./components/libs/stable-coins-provider/StableCoinsProvider";
import { AppGovernanceProvider } from "./components/libs/app-governance-provider/AppGovernanceProvider";
import { WhitepaperPage } from "./pages/whitepaper";
import { TermsPage } from "./pages/terms";
import { TestingPage } from "./pages/playground";

// https://github.com/NoahZinsmeister/web3-react/tree/v6/docs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getWeb3Library(provider: any): providers.Web3Provider {
  const library = new providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const WalletContext = (props: { children: any }) => {
  return (
    <Web3ReactProvider getLibrary={getWeb3Library}>
      {props.children}
    </Web3ReactProvider>
  );
};

const DashboardContext = (props: { children: any }) => {
  return (
    <Web3ContextProvider>
      <RolodexContentProvider>
        <StableCoinsProvider>
          <VaultDataProvider>
            <ModalContentProvider>
              <AppGovernanceProvider>
                <>
                  <WalletModalProvider>
                    <>
                      <SwapTokenProvider>{props.children}</SwapTokenProvider>
                      <DelegateModal />
                      <DelegateIPTModal />
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
                  </WalletModalProvider>
                </>
              </AppGovernanceProvider>
            </ModalContentProvider>
          </VaultDataProvider>
        </StableCoinsProvider>
      </RolodexContentProvider>
    </Web3ContextProvider>
  );
};

const AppRouter = () => {
  return (
    <WalletContext>
      <Routes>
        <Route
          path={`/sale`}
          element={
            <Web3ContextProvider>
              <RolodexContentProvider>
                <ModalContentProvider>
                  <WalletModalProvider>
                    <>
                      <PurchasePage />
                      <TransactionStatusModal />
                    </>
                  </WalletModalProvider>
                </ModalContentProvider>
              </RolodexContentProvider>
            </Web3ContextProvider>
          }
        />
        <Route path={`/whitelist`} element={<WhitelistPage />} />
        <Route path={`/landing`} element={<LandingPage />} />
        <Route path={`/whitepaper`} element={<WhitepaperPage />} />
        <Route path={`/terms`} element={<TermsPage />} />
        <Route path={`/docs`} element={<RedirectBook />} />
        <Route path={`/book`} element={<RedirectBook />} />
        <Route path={`/testing`} element={<TestingPage />} />
        <Route path={`*`} element={<NotFound404Page />} />
        <Route
          path={`/`}
          element={
            <DashboardContext>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </DashboardContext>
          }
        />
      </Routes>
    </WalletContext>
  );
};

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
