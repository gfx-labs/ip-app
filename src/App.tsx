import { StrictMode, Suspense, useState } from "react";
import { Routes, useRoutes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./theme/fonts.css";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";
import { AppLayout } from "./components/partials/app-layout";
import { Web3ContextProvider } from "./components/libs/web3-data-provider/Web3Provider";
import { WalletModalProvider } from "./components/libs/wallet-modal-provider/WalletModalProvider";
import { ModalContentProvider } from "./components/libs/modal-content-provider/ModalContentProvider";
import { PaletteModeContextProvider } from "./components/libs/palette-mode-provider/palette-mode-provider";
import LandingPage from "./pages";
import RedirectBook from "./pages/book";
import Dashboard from "./pages/dashboard";
import NotFound404Page from "./pages/404";
import { DepositWithdrawModal } from "./components/util/modal";
import { BorrowRepayModal } from "./components/util/modal/BorrowRepayModal";
import { ClaimModal } from "./components/util/modal/ClaimModal";
import { RolodexContentProvider } from "./components/libs/rolodex-data-provider/rolodexDataProvider";
import { SwapTokenProvider } from "./components/libs/swap-token-provider/SwapTokenProvider";
import { DepositConfirmationModal } from "./components/util/modal/DepositConfirmationModal";
import { WithdrawConfirmationModal } from "./components/util/modal/WithdrawConfirmationModal";

// https://github.com/NoahZinsmeister/web3-react/tree/v6/docs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getWeb3Library(provider: any): providers.Web3Provider {
  const library = new providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = () => {
  return (
    <StrictMode>
      <Suspense fallback={<p>Loading...</p>}>
        <Web3ReactProvider getLibrary={getWeb3Library}>
          <Web3ContextProvider>
            <StyledEngineProvider injectFirst>
              <PaletteModeContextProvider>
                <>
                  <CssBaseline />
                  <RolodexContentProvider>
                    <ModalContentProvider>
                      <>
                        <WalletModalProvider>
                          <SwapTokenProvider>
                          <AppLayout>
                            <Routes>
                              <Route path={`/`} element={<LandingPage />} />
                              <Route
                                path={`/dashboard`}
                                element={<Dashboard />}
                              />
                              <Route
                                path={`/docs`}
                                element={<RedirectBook />}
                              />
                              <Route
                                path={`/book*`}
                                element={<RedirectBook />}
                              />
                              <Route path={`*`} element={<NotFound404Page />} />
                            </Routes>
                          </AppLayout>
                          </SwapTokenProvider>
                        </WalletModalProvider>
                        <DepositWithdrawModal />
                        <BorrowRepayModal />
                        <DepositConfirmationModal />
                        <WithdrawConfirmationModal />
                        <ClaimModal />
                      </>
                    </ModalContentProvider>
                  </RolodexContentProvider>
                </>
              </PaletteModeContextProvider>
            </StyledEngineProvider>
          </Web3ContextProvider>
        </Web3ReactProvider>
      </Suspense>
    </StrictMode>
  );
};

export default App;
