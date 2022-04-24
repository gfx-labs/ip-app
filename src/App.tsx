import { StrictMode, Suspense } from "react";
import { Routes, useRoutes } from "react-router-dom";
import { Route } from "react-router-dom";
import { getDesignTokens } from "./theme";
import "./theme/fonts.css";
import {
    createTheme,
    CssBaseline,
    StyledEngineProvider,
    ThemeProvider,
    useMediaQuery,
} from "@mui/material";
import { Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";
import { AppLayout } from "./components/partials/app-layout";
import { Web3ContextProvider } from "./components/libs/web3-data-provider/Web3Provider";
import { WalletModalProvider } from "./components/libs/wallet-modal-provider/WalletModalProvider";
import CompanyPage from "./pages";
import RedirectBook from "./pages/book";

// https://github.com/NoahZinsmeister/web3-react/tree/v6/docs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getWeb3Library(provider: any): providers.Web3Provider {
    const library = new providers.Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
}

const App = () => {
    const theme = createTheme(getDesignTokens());
    return (
        <StrictMode>
            <Suspense fallback={<p>Loading...</p>}>
                <Web3ReactProvider getLibrary={getWeb3Library}>
                    <Web3ContextProvider>
                        <StyledEngineProvider injectFirst>
                            <ThemeProvider {...{ theme }}>
                                <>
                                    <CssBaseline />
                                    <WalletModalProvider>
                                        <AppLayout>
                                            <Routes>
                                                <Route path={`/`} element={<CompanyPage />} />
                                                <Route path={`/docs`} element={<RedirectBook />} />
                                                <Route path={`/book`} element={<RedirectBook />} />
                                            </Routes>
                                        </AppLayout>
                                    </WalletModalProvider>
                                </>
                            </ThemeProvider>
                        </StyledEngineProvider>
                    </Web3ContextProvider>
                </Web3ReactProvider>
            </Suspense>
        </StrictMode>
    );
};

export default App;
