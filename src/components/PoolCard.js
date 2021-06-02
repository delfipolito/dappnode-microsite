import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ethers, Contract, BigNumber } from 'ethers'
import { abi as STAKING_REWARDS_ABI } from '../artifacts/UnipoolVested.json'
import { abi as UNI_ABI } from '../artifacts/UNI.json'
import { humanRedeableAmout } from '../lib/web3-utils'
import { usePoolCardInfo } from '../hooks/usePoolCardInfo'
import APRDetails from './APRDetails'
import { Input } from './Styles.js'
import {
  Token,
  Earned,
  CenterContainer,
  SpaceBetween,
  SimpleButton,
  Button,
  PoolCardSection,
} from './PoolCardStyle.js'

function PoolCard({ provider, name, poolAddress, owner, logo }) {
  const [poolState, setPoolState] = useState('default')

  const { poolInfo, contracts } = usePoolCardInfo()

  return (
    <PoolCardSection>
      {poolState == 'default' && (
        <Principal
          name={name}
          logo={logo}
          stakePoolInfo={poolInfo[name].stakePoolInfo}
          manage={() => setPoolState('manage')}
          deposit={() => setPoolState('deposit')}
        />
      )}
      {poolState == 'manage' && (
        <Manage
          deposit={() => setPoolState('deposit')}
          close={() => setPoolState('default')}
        />
      )}
      {poolState == 'deposit' && (
        <Deposit close={() => setPoolState('default')} />
      )}
    </PoolCardSection>
  )
}

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
    <SpaceBetween>
      <h2>
        <b>APR:</b>{' '}
        {stakePoolInfo &&
          stakePoolInfo.APR && (
            <div className="pool-info-text">{stakePoolInfo.APR}%</div>
          )}
      </h2>
      <APRDetails />
    </SpaceBetween>
    <SpaceBetween>
      <h2>
        <b>LP token:</b>{' '}
        {stakePoolInfo &&
          stakePoolInfo.APR && (
            <div className="pool-info-text">{stakePoolInfo.APR}%</div>
          )}
      </h2>
      <SimpleButton onClick={manage}>Manage</SimpleButton>
    </SpaceBetween>
    <h2>
      <b>Earned:</b>{' '}
      <div className="pool-info-text">
        <Earned>0</Earned>
        <Token>DN</Token>
      </div>
    </h2>
    <div>
      <Button>Provide liquidity</Button>
      <Button onClick={deposit}>Stake LP token</Button>
    </div>
  </>
)

const Manage = ({ deposit, close }) => (
  <CenterContainer>
    <div>
      <SimpleButton onClick={close}>x</SimpleButton>
      <h2>
        <b>Manage yourr LP tokens</b>
      </h2>
      <p>You currently have 56 staked Liquidity Provider tokens</p>
      <Button onClick={deposit}>Deposit LP tokens</Button>
      <Button>Withdraw LP tokens</Button>
    </div>
  </CenterContainer>
)

const Deposit = ({ close }) => (
  <>
    <SimpleButton onClick={close}>x</SimpleButton>
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
