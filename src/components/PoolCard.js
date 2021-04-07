import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ethers, Contract, BigNumber } from 'ethers'
import { abi as STAKING_REWARDS_ABI } from '../artifacts/UnipoolVested.json'
import { abi as UNI_ABI } from '../artifacts/UNI.json'
import { humanRedeableAmout } from '../lib/web3-utils'
import { usePoolCardInfo } from '../hooks/usePoolCardInfo'

function PoolCard({ provider, name, poolAddress, owner, logo }) {
  const [poolState, setPoolState] = useState('default')
  const {
    cardStatus,
    stakePoolInfo,
    contracts,
    userStakeInfo,
  } = usePoolCardInfo(name, poolAddress, owner, provider)

  return (
    <PoolCardSection>
      {poolState == 'default' && (
        <Principal
          name={name}
          logo={logo}
          stakePoolInfo={stakePoolInfo}
          manage={() => setPoolState('manage')}
          deposit={() => setPoolState('deposit')}
        />
      )}
      {poolState == 'manage' && (
        <Manage deposit={() => setPoolState('deposit')} />
      )}
      {poolState == 'deposit' && <Deposit />}
      <button onClick={() => setPoolState('default')}>x</button>
    </PoolCardSection>
  )
}

const PoolCardSection = styled.section`
  background-color: white;
  height: 100%;
  width: 100%;
  max-height: 358px;
  max-width: 261px;
  padding: 16px;
  box-shadow: 0px 2px 2px rgba(8, 43, 41, 0.04),
    0px 2px 8px rgba(8, 43, 41, 0.06);
  border-radius: 16px;
  flex-grow: 1;
  min-height: 514px;
  margin: 0 10px;
  h1 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 34px;
    color: #22262a;
    display: flex;
    align-items: center;
    img {
      margin-left: -16px;
    }
  }
  label {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 8px;
    line-height: 10px;
    letter-spacing: 0.07em;
    color: #454b54;
    text-transform: uppercase;
  }
  h2 {
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #353a41;
    b {
      font-weight: 600;
    }
  }
  p {
    font-family: 'Inter';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #353a41;
  }
`

const Button = styled.a`
  color: #2fbcb2;
  background: transparent;
  border: solid 1px #2fbcb2;
  font-family: 'Interstate', sans-serif;
  border-radius: 38px;
  padding: 25px 100px;
  display: inline-block;
  width: -webkit-fill-available;
  font-size: 16px;
  letter-spacing: 0.27px;
  line-height: 19px;
  text-align: center;
  padding: 11px;
  margin: 6px 0px;
  cursor: pointer;
`

const SimpleButton = styled.button`
  font-family: 'Inter-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #2fbcb2;
  background: transparent;
  border: solid 0px transparent;
`

const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 100%;
`

const Input = styled.input`
  height: 48px;
  padding-left: 10px;
  background: #f4f5f6;
  border-radius: 8px;
  height: 48px;
  color: #818b98;
  font-family: 'Inter';
  border: solid 0px transparent;
  font-size: 14px;
  line-height: 16px;
  margin: 16px 0;
  width: calc(100% - 12px);
`

const Principal = ({ name, stakePoolInfo, manage, deposit, logo }) => (
  <>
    <label>Balancer</label>
    <h1>
      <img src={logo} /> {name}
    </h1>
    <SpaceBetween>
      <h2>50% DN 50% ETH</h2>{' '}
      <SimpleButton onClick={deposit}>Add more</SimpleButton>
    </SpaceBetween>
    <h2>
      <b>APR:</b>{' '}
      {stakePoolInfo.APR && (
        <div className="pool-info-text">{stakePoolInfo.APR}%</div>
      )}
    </h2>
    <SpaceBetween>
      <h2>
        <b>LP token:</b>{' '}
        {stakePoolInfo.APR && (
          <div className="pool-info-text">{stakePoolInfo.APR}%</div>
        )}
      </h2>
      <SimpleButton onClick={manage}>Manage</SimpleButton>
    </SpaceBetween>
    <div>
      <Button>Provide liquidity</Button>
      <Button onClick={deposit}>Stake LP token</Button>
    </div>
  </>
)

const Manage = ({ deposit }) => (
  <CenterContainer>
    <div>
      <h2>
        <b>Manage yourr LP tokens</b>
      </h2>
      <p>You currently have 56 staked Liquidity Provider tokens</p>
      <Button onClick={deposit}>Deposit LP tokens</Button>
      <Button>Withdraw LP tokens</Button>
    </div>
  </CenterContainer>
)

const Deposit = () => (
  <>
    <h1>Deposit LP tokens</h1>
    <p>
      You currently have 56 staked Liquidity Provider tokens. Deposit more to
      accrue more
    </p>
    <Input type="number" placeholder="Amount" />
    <Button>Deposit LP tokens</Button>
  </>
)

export default PoolCard
