import React from 'react'
import styled from 'styled-components'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import './App.css'
import { useOnboardAndNotify } from './hooks/useOnboardAndNotify'


function App() {
  const {
    address,
    network,
    balance,
    wallet,
    onboard,
    notify,
    provider
  } = useOnboardAndNotify()

  return onboard && notify ? (
    <Main>
      <Navbar address={address} ethBalance={balance} network={network} />
      <Dashboard provider={provider} address={address} />
      <section className="main">
        <div className="container">
          <h2>Onboarding Users with Onboard.js</h2>
          <div>
            {!wallet.provider && (
              <button
                className="bn-demo-button"
                onClick={() => {
                  onboard.walletSelect()
                }}
              >
                Select a Wallet
              </button>
            )}

            {wallet.provider && (
              <button className="bn-demo-button" onClick={onboard.walletCheck}>
                Wallet Checks
              </button>
            )}

            {wallet.provider && (
              <button className="bn-demo-button" onClick={onboard.walletSelect}>
                Switch Wallets
              </button>
            )}

            {wallet.provider && (
              <button className="bn-demo-button" onClick={onboard.walletReset}>
                Reset Wallet State
              </button>
            )}
            {wallet.provider &&
              wallet.dashboard && (
                <button className="bn-demo-button" onClick={wallet.dashboard}>
                  Open Wallet Dashboard
                </button>
              )}
            {wallet.provider &&
              wallet.type === 'hardware' &&
              address && (
                <button
                  className="bn-demo-button"
                  onClick={onboard.accountSelect}
                >
                  Switch Account
                </button>
              )}
          </div>
        </div>
      </section>
    </Main>
  ) : (
    <div>Loading...</div>
  )
}

const Main = styled.main`
  background: #f1f2f4;
`

export default App
