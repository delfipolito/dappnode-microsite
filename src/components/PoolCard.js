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

  console.log("pool", name, cardStatus,
  stakePoolInfo,
  contracts,
  userStakeInfo);
  // const [cardStatus, setCardStatus] = useState({
  //   tick: false,
  //   amount: '0',
  //   depositButton: 'Deposit',
  //   withdrawButton: 'Withdraw',
  //   claimButton: 'Claim',
  //   buttonsEnable: true,
  // })
  // const [stakePoolInfo, setStakePoolInfo] = useState({})
  // const [contracts, setContracts] = useState({})
  // const [userStakeInfo, setUserStakeInfo] = useState({})
  //
  // async function updateStatus() {
  //   if (
  //     !contracts.stackingRewardsContract ||
  //     !contracts.stackingRewardsContract ||
  //     !contracts.tokenPoolContract
  //   )
  //     return
  //
  //   let uniLPShares = await contracts.stackingRewardsContract.balanceOf(owner)
  //   let earned = await contracts.stackingRewardsContract.earned(owner)
  //   let availableUniLPShares = await contracts.tokenPoolContract.balanceOf(
  //     owner
  //   )
  //   let _rewardRate = await contracts.stackingRewardsContract.rewardRate()
  //   let _totalSupply = await contracts.stackingRewardsContract.totalSupply()
  //
  //   let _APR = new ethers.utils.BigNumber('0')
  //   let _LP_CAR = new ethers.utils.BigNumber('0')
  //
  //   if (_totalSupply > 0 && name !== 'CAR') {
  //     let _totalSupplyPool = await contracts.tokenPoolContract.totalSupply()
  //     let [
  //       _reserve0,
  //       _reserve1,
  //     ] = await contracts.tokenPoolContract.getReserves()
  //
  //     let _token0 = await contracts.tokenPoolContract.token0()
  //     let tkn0 = new Contract(_token0, UNI_ABI, provider)
  //     let _tokenName0 = await tkn0.symbol()
  //
  //     let _reserve = _tokenName0 === 'CAR' ? _reserve0 : _reserve1
  //     _LP_CAR = _totalSupplyPool
  //       .mul(new ethers.utils.BigNumber('1000000000000000000'))
  //       .div(new ethers.utils.BigNumber(2))
  //       .div(_reserve)
  //
  //     _APR = _rewardRate
  //       .mul(new ethers.utils.BigNumber('31536000'))
  //       .mul(new ethers.utils.BigNumber('100'))
  //       .div(_totalSupply)
  //       .mul(_LP_CAR)
  //       .div(new ethers.utils.BigNumber('1000000000000000000'))
  //   } else if (name === 'CAR') {
  //     _APR = _rewardRate
  //       .mul(new ethers.utils.BigNumber('100'))
  //       .mul(new ethers.utils.BigNumber('31536000'))
  //       .div(_totalSupply)
  //   }
  //
  //   setStakePoolInfo({
  //     ...stakePoolInfo,
  //     periodFinish: new Date(
  //       (await contracts.stackingRewardsContract.periodFinish()) * 1000
  //     ).toISOString(),
  //     totalSupply: humanRedeableAmout(_totalSupply),
  //     rewardRate: humanRedeableAmout(_rewardRate),
  //     rewardPerToken: humanRedeableAmout(
  //       await contracts.stackingRewardsContract.rewardPerToken()
  //     ),
  //     APR: _APR.toString(),
  //   })
  //
  //   setUserStakeInfo({
  //     staked: humanRedeableAmout(uniLPShares),
  //     available: humanRedeableAmout(availableUniLPShares),
  //     earned: humanRedeableAmout(earned),
  //   })
  //
  //   setCardStatus({
  //     ...cardStatus,
  //     tick: true,
  //   })
  //
  //   setTimeout(hideBlockTick, 300)
  // }
  //
  // useEffect(() => {
  //   if (
  //     provider &&
  //     (!contracts.stackingRewardsContract ||
  //       !contracts.stackingRewardsContract ||
  //       !contracts.tokenPoolContract)
  //   ) {
  //     intialize()
  //   } else {
  //     updateStatus()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   //}, [block]);
  // })
  //
  // async function intialize() {
  //   let src = new Contract(address, STAKING_REWARDS_ABI, provider)
  //   let spt = await src.uni()
  //   let tpc = new Contract(spt, UNI_ABI, provider)
  //
  //   let uniLPShares = await src.balanceOf(owner)
  //   let earned = await src.earned(owner)
  //   let availableUniLPShares = await tpc.balanceOf(owner)
  //   let _rewardRate = await src.rewardRate()
  //   let _totalSupply = await src.totalSupply()
  //
  //   let _APR = new ethers.utils.BigNumber('0')
  //   let _LP_CAR = new ethers.utils.BigNumber('0')
  //
  //   if (_totalSupply > 0 && name !== 'CAR') {
  //     let _totalSupplyPool = await tpc.totalSupply()
  //     let [_reserve0, _reserve1] = await tpc.getReserves()
  //
  //     let _token0 = await tpc.token0()
  //     let tkn0 = new Contract(_token0, UNI_ABI, provider)
  //     let _tokenName0 = await tkn0.symbol()
  //
  //     let _reserve = _tokenName0 === 'CAR' ? _reserve0 : _reserve1
  //     _LP_CAR = _totalSupplyPool
  //       .mul(new ethers.utils.BigNumber('1000000000000000000'))
  //       .div(new ethers.utils.BigNumber(2))
  //       .div(_reserve)
  //
  //     _APR = _rewardRate
  //       .mul(new ethers.utils.BigNumber('31536000'))
  //       .mul(new ethers.utils.BigNumber('100'))
  //       .div(_totalSupply)
  //       .mul(_LP_CAR)
  //       .div(new ethers.utils.BigNumber('1000000000000000000'))
  //   } else if (name === 'CAR') {
  //     _APR = _rewardRate
  //       .mul(new ethers.utils.BigNumber('100'))
  //       .mul(new ethers.utils.BigNumber('31536000'))
  //       .div(_totalSupply)
  //   }
  //
  //   setUserStakeInfo({
  //     staked: humanRedeableAmout(uniLPShares),
  //     available: humanRedeableAmout(availableUniLPShares),
  //     earned: humanRedeableAmout(earned),
  //   })
  //
  //   setStakePoolInfo({
  //     ...stakePoolInfo,
  //     periodFinish: new Date((await src.periodFinish()) * 1000).toISOString(),
  //     totalSupply: humanRedeableAmout(await src.totalSupply()),
  //     rewardRate: humanRedeableAmout(await src.rewardRate()),
  //     rewardPerToken: humanRedeableAmout(await src.rewardPerToken()),
  //     APR: _APR.toString(),
  //   })
  //
  //   setContracts({
  //     stackingRewardsContract: src,
  //     tokenPoolContract: tpc,
  //     stakingPoolToken: spt,
  //   })
  //
  //   setCardStatus({
  //     ...cardStatus,
  //     tick: true,
  //   })
  //
  //   setTimeout(hideBlockTick, 300)
  // }
  //
  // function hideBlockTick() {
  //   setCardStatus({
  //     ...cardStatus,
  //     tick: false,
  //   })
  // }

  return (
    <PoolCardSection>
      {poolState == 'default' && (
        <Principal
          name={name}
          logo={logo}
          stakePoolInfo={stakePoolInfo}
          manage={() => setPoolState('manage')}
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
`

const Principal = ({ name, stakePoolInfo, manage, logo }) => (
  <>
    <label>Balancer</label>
    <h1>
      <img src={logo} /> {name}
    </h1>
    <h4>50% DN 50% ETH</h4>
    <h2>
      <b>APR:</b>{' '}
      {stakePoolInfo.APR && (
        <div className="pool-info-text">{stakePoolInfo.APR}%</div>
      )}
    </h2>
    <button onClick={manage}>Manage</button>
    <div>
      <Button>Provide liquidity</Button>
      <Button>Stake LP token</Button>
    </div>
  </>
)

const Manage = ({ deposit }) => (
  <>
    <h1>Manage your LP tokens</h1>
    <p>You currently have 56 staked Liquidity Provider tokens</p>
    <Button onClick={deposit}>Deposit LP tokens</Button>
    <Button>Withdraw LP tokens</Button>
  </>
)

const Deposit = () => (
  <>
    <h1>Deposit LP tokens</h1>
    <p>
      You currently have 56 staked Liquidity Provider tokens. Deposit more to
      accrue more
    </p>
    <input type="number" placeholder="Amount" />
    <Button>Deposit LP tokens</Button>
  </>
)

export default PoolCard
