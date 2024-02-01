import { StrictMode, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './theme/fonts.css'

import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { AppLayout } from './components/partials/app-layout'
import { Web3ContextProvider } from './components/libs/web3-data-provider/Web3Provider'
import { WalletModalProvider } from './components/libs/wallet-modal-provider/WalletModalProvider'
import { ModalContentProvider } from './components/libs/modal-content-provider/ModalContentProvider'
import { PaletteModeContextProvider } from './components/libs/palette-mode-provider/palette-mode-provider'
import Dashboard from './pages'
import LandingPage from './pages/landing'
import NotFound404Page from './pages/404'
import {
  DepositWithdrawUSDCModal,
  DepositWithdrawCollateralModal,
  BorrowRepayModal,
  WithdrawUSDCConfirmationModal,
  DepositUSDCConfirmationModal,
  WithdrawCollateralConfirmationModal,
  DepositCollateralConfirmationModal,
  DepositWithdrawPositionConfirmationModal,
  DelegateModal,
  UndelegateModal,
  DelegateIPTModal,
  TransactionStatusModal,
} from './components/util/modal'
import { ClaimModal } from './components/util/modal/ClaimModal'
import { RolodexContentProvider } from './components/libs/rolodex-data-provider/RolodexDataProvider'
import { SwapTokenProvider } from './components/libs/swap-token-provider/SwapTokenProvider'
import { VaultDataProvider } from './components/libs/vault-data-provider/VaultDataProvider'
import { StableCoinsProvider } from './components/libs/stable-coins-provider/StableCoinsProvider'
import { AppGovernanceProvider } from './components/libs/app-governance-provider/AppGovernanceProvider'
import { WhitepaperPage } from './pages/whitepaper'
import { TermsPage } from './pages/terms'
import { TestingPage } from './pages/playground'
import { MerkleRedeemContextProvider } from './components/libs/merkle-redeem-provider/MerkleRedeemProvider'
import { Governance } from './pages/governance'
import { EnableCappedTokenModal } from './components/util/modal/EnableCappedTokenModal'
import { RedirectTo } from './components/util/redirect'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, optimism } from 'wagmi/chains'

const chains = [mainnet, optimism]
const projectId = '1076f5912040f4580a3c3dd2b2df8a51'

const { publicClient, webSocketPublicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
  webSocketPublicClient,
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const WalletContext = (props: { children: any }) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        {props.children}
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

const DashboardContext = (props: { children: any }) => {
  return (
    <Web3ContextProvider>
      <RolodexContentProvider>
        <StableCoinsProvider>
          <VaultDataProvider>
            <MerkleRedeemContextProvider>
              <ModalContentProvider>
                <AppGovernanceProvider>
                  <>
                    <WalletModalProvider>
                      <>
                        <SwapTokenProvider>{props.children}</SwapTokenProvider>
                        <DelegateModal />
                        <UndelegateModal />
                        <DelegateIPTModal />
                        <DepositWithdrawCollateralModal />
                        <DepositCollateralConfirmationModal />
                        <WithdrawCollateralConfirmationModal />
                        <DepositWithdrawPositionConfirmationModal />
                        <DepositWithdrawUSDCModal />
                        <BorrowRepayModal />
                        <DepositUSDCConfirmationModal />
                        <WithdrawUSDCConfirmationModal />
                        <EnableCappedTokenModal />
                        <ClaimModal />
                        <TransactionStatusModal />
                      </>
                    </WalletModalProvider>
                  </>
                </AppGovernanceProvider>
              </ModalContentProvider>
            </MerkleRedeemContextProvider>
          </VaultDataProvider>
        </StableCoinsProvider>
      </RolodexContentProvider>
    </Web3ContextProvider>
  )
}

const AppRouter = () => {
  return (
    <WalletContext>
      <Routes>
        {/* <Route
          path={`/sale`}
          element={
            <Web3ContextProvider>
              <RolodexContentProvider>
                <MerkleRedeemContextProvider>
                  <ModalContentProvider>
                    <WalletModalProvider>
                      <>
                        <PurchasePage />
                        <TransactionStatusModal />
                      </>
                    </WalletModalProvider>
                  </ModalContentProvider>
                </MerkleRedeemContextProvider>
              </RolodexContentProvider>
            </Web3ContextProvider>
          }
        /> */}
        <Route path={`/landing`} element={<LandingPage />} />
        <Route path={`/whitepaper`} element={<WhitepaperPage />} />
        <Route path={`/terms`} element={<TermsPage />} />
        <Route
          path={`/docs`}
          element={<RedirectTo url="book/docs/intro/index.html" />}
        />
        <Route
          path={`/book`}
          element={<RedirectTo url="book/docs/intro/index.html" />}
        />
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

        <Route
          path={`/proposal`}
          element={
            <DashboardContext>
              <AppLayout>
                <Governance />
              </AppLayout>
            </DashboardContext>
          }
        />

        <Route
          path={`/proposal/:id`}
          element={
            <DashboardContext>
              <AppLayout>
                <Governance />
              </AppLayout>
            </DashboardContext>
          }
        />
      </Routes>
    </WalletContext>
  )
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
  )
}

export default App
