import React from 'react'
import styled from 'styled-components'
import logo from '../assets/DAppNodeDAO-logo.svg'
import { shortenAddress, getNetworkType } from '../lib/web3-utils'

const Navbar = ({ address, ethBalance, network }) => (
  <NavbarSection>
    <Container>
      <img src={logo} alt="logo" />
      <div>
        {address && <p>{shortenAddress(address)}</p>}
        {ethBalance != null && (
          <p>
            {Number(ethBalance) > 0
              ? ethBalance / 1000000000000000000
              : ethBalance}{' '}
            ETH
          </p>
        )}
        {network && <Button>{getNetworkType(network)} network</Button>}
      </div>
    </Container>
  </NavbarSection>
)

const NavbarSection = styled.section`
  background-color: white;
  height: 60px;
  text-align: center;
  overflow: hidden;
  border: solid 1px #e7e7e7;
  position: relative;
  z-index: 1;
  box-shadow: 0px 10px 18px 7px rgb(73 66 67 / 41%);
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
  color: #2fbcb2;
  font-family: 'Interstate', 'Inter-Bold', sans-serif;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.22px;
  line-height: 15px;
  text-transform: uppercase;
  border: 2px solid #2fbcb2;
  border-radius: 38px;
  padding: 10px 20px;
  margin-left: 15px;
`

export default Navbar
