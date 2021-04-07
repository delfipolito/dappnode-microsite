import React from 'react'
import styled from 'styled-components'
import logo from '../assets/mini-logo.svg'
import { shortenAddress, getNetworkType } from '../lib/web3-utils'
import { networkAllowed } from '../lib/web3-utils'

const Navbar = ({ address, ethBalance, network, wallet, onboard }) => (
  <NavbarSection>
    {networkAllowed(network) && <ConnectedLine />}
    <Container>
      <h1>
        <img src={logo} alt="logo" />
        DAppNode Dashboard
      </h1>
      <div>
        {!wallet.provider && (
          <ConnectWallet
            onClick={() => {
              onboard.walletSelect()
            }}
          >
            Connect Wallet
          </ConnectWallet>
        )}
        {network && <Button>Network: {getNetworkType(network)} </Button>}
        {address && (
          <WhiteButton onClick={onboard.walletSelect}>
            {address && <p>{shortenAddress(address)}</p>}
          </WhiteButton>
        )}
        {ethBalance && (
          <WhiteButton>
            {Number(ethBalance) > 0
              ? ethBalance / 1000000000000000000
              : ethBalance}{' '}
            <span> ETH</span>
          </WhiteButton>
        )}
      </div>
    </Container>
  </NavbarSection>
)

const ConnectedLine = styled.div`
  background: #54d4cb;
  box-shadow: 0px 0px 12px #54d4cb;
  width: 100%;
  height: 4px;
`

const NavbarSection = styled.section`
  background-color: transparent;
  height: 72px;
  text-align: center;
  overflow: hidden;
  position: relative;
  z-index: 1;
}


`

const Container = styled.div`
  width: 95%;
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  h1 {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.2px;
    color: #35403f;
    img {
      padding-right: 22px;
    }
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    p {
      margin: 0 15px;
    }
  }
  @media only screen and (max-width: 444px) {
    img {
      width: 190px;
    }
  }
`

const Button = styled.a`
  background: #c4f3ef;
  border-radius: 8px;
  text-transform: uppercase;
  border: 0px solid transparent;
  padding: 8px 10px;
  font-family: 'Inter-Bold', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  text-align: right;
  color: #144b52;
  margin-left: 15px;
`

const WhiteButton = styled.div`
  background: white;
  border-radius: 8px;
  text-transform: uppercase;
  border: 0px solid transparent;
  padding: 8px 10px;
  font-family: 'Inter-Bold', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  text-align: right;
  color: #455453;
  margin-left: 15px;
  span {
    color: #455453c7;
    padding-left: 3px;
  }
`

const ConnectWallet = styled.button`
  background: #ffffff;
  border: solid 0px transparent;
  border-radius: 27px;
  font-family: 'Inter-Bold';
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #23c8bc;
  padding: 8px 16px;
  box-shadow: 0px 1px 1px rgba(8, 43, 41, 0.08), 0px 0px 8px rgba(8, 43, 41, 0.06);
  &:hover {
    background: #c4f3ef;
    color: #144b52;
    transition: all 0.25s ease-in-out;
  }
`

export default Navbar
