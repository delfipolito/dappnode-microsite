import React from 'react'
import styled from 'styled-components'
import PoolCard from './PoolCard'
import Rewards from './Rewards'
import dn from '../assets/dn-logo.svg'
import pools from '../assets/Pools.svg'
import tokens from '../assets/Tokens.svg'
import dnEth from '../assets/dn-eth-logos.svg'
import { networkAllowed } from '../lib/web3-utils'

const Dashboard = ({ provider, address, network, wallet, onboard }) => (
  <DashboardSection>
    <h1>
      <img src={tokens} />
      My tokens
    </h1>
    <PoolsContainer>
      <Rewards wallet={wallet} network={network} onboard={onboard} />
    </PoolsContainer>
    <br/>
    <h1>
      <img src={pools} />
      Staking Pools
    </h1>
    <PoolsContainer>
      {provider &&
        address &&
        networkAllowed(network) && (
          <>
            <PoolCard
              provider={provider}
              logo={dnEth}
              name="CAR/xDAI"
              poolAddress="0x561807cd1f2d32f7ef7dadb1515a55d35eba207c"
              owner={address}
            />
            <PoolCard
              provider={provider}
              name="CAR/HNY"
              logo={dnEth}
              poolAddress="0xb755a9614bfd5eb812b9cc3d00166565f2e72b41"
              owner={address}
            />
            <PoolCard
              provider={provider}
              name="CAR"
              logo={dn}
              poolAddress="0xf43913aF72af30d6b34782D08C4De3F6a14Ce42e"
              owner={address}
            />
          </>
        )}
    </PoolsContainer>
  </DashboardSection>
)

const DashboardSection = styled.section`
  height: 100%;
  width: 80%;
  max-width: 940px;
  margin: auto;
  padding: 100px;
  h1 {
    font-family: 'Inter-Bold';
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #455453;
    margin: 20px 10px;
    img {
      padding-right: 5px;
    }
  }
`

const PoolsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Dashboard
