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
    provider,
  } = useOnboardAndNotify()

  return onboard && notify ? (
    <Main>
      <Navbar
        wallet={wallet}
        onboard={onboard}
        address={address}
        ethBalance={balance}
        network={network}
      />
      <Dashboard
        wallet={wallet}
        provider={provider}
        address={address}
        onboard={onboard}
        network={network}
      />
    </Main>
  ) : (
    <div>Loading...</div>
  )
}

const Main = styled.main`
  background: linear-gradient(116.82deg, #c7eeec 0%, #f4f6f6 100%);
  min-height: 100vh;
`

export default App
