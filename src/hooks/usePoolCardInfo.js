import { useEffect, useState } from 'react'
import { ethers, Contract } from 'ethers'
import { abi as STAKING_REWARDS_ABI } from '../artifacts/UnipoolVested.json'
import { abi as UNI_ABI } from '../artifacts/UNI.json'
import { humanRedeableAmout } from '../lib/web3-utils'
import { useOnboardAndNotify } from './useOnboardAndNotify'
import { bn, ZERO, ONE } from '../lib/numbers'
import { YEAR } from '../lib/time'

export function usePoolCardInfo() {
  const { provider, address } = useOnboardAndNotify()
  let owner = address

  const poolAddress = {
    'CAR/xDAI': "0x561807cd1f2d32f7ef7dadb1515a55d35eba207c",
    'CAR/HNY': "0xb755a9614bfd5eb812b9cc3d00166565f2e72b41",
    CAR: "0xf43913aF72af30d6b34782D08C4De3F6a14Ce42e",
  }

  const [contracts, setContracts] = useState({
    'CAR/xDAI': {},
    'CAR/HNY': {},
    CAR: {},
  })

  const [poolInfo, setPoolInfo] = useState({
    'CAR/xDAI': { stakePoolInfo: null, userStakeInfo: null },
    'CAR/HNY': { stakePoolInfo: null, userStakeInfo: null },
    CAR: { stakePoolInfo: null, userStakeInfo: null },
  })

  useEffect(
    () => {
      if (provider && owner) {
        intialize('CAR/xDAI')
        intialize('CAR/HNY')
        intialize('CAR')
      }
    },
    [owner, provider]
  )

  async function getPoolDetail(src, tpc, owner) {
    let uniLPShares = await src.balanceOf(owner)
    let earned = await src.earned(owner)
    let availableUniLPShares = await tpc.balanceOf(owner)
    let _rewardRate = await src.rewardRate()
    let _totalSupply = await src.totalSupply()

    return {
      uniLPShares: uniLPShares,
      earned: earned,
      availableUniLPShares: availableUniLPShares,
      _rewardRate: _rewardRate,
      _totalSupply: _totalSupply,
    }
  }

  async function getLpCAR(tpc, provider) {
    let _totalSupplyPool = await tpc.totalSupply()
    let [_reserve0, _reserve1] = await tpc.getReserves()

    let _token0 = await tpc.token0()
    let tkn0 = new Contract(_token0, UNI_ABI, provider)
    let _tokenName0 = await tkn0.symbol()

    let _reserve = _tokenName0 === 'CAR' ? _reserve0 : _reserve1
    return _totalSupplyPool
      .mul(ONE)
      .div(bn(2))
      .div(_reserve)
  }

  function getApr(name, _totalSupply, _rewardRate, _LP_CAR) {
    if (name === 'CAR') {
      return _rewardRate
        .mul(bn('100'))
        .mul(YEAR)
        .div(_totalSupply)
    }

    return _rewardRate
      .mul(YEAR)
      .mul(bn('100'))
      .div(_totalSupply)
      .mul(_LP_CAR)
      .div(ONE)
  }

  async function intialize(name) {
    if (poolAddress[name] && provider && owner) {
      await getContracts(poolAddress[name], provider, name)

      const src = contracts[name].stackingRewardsContract
      const tpc = contracts[name].tokenPoolContract
      const spt = contracts[name].stakingPoolToken

      let poolDetail = await getPoolDetail(src, tpc, owner)

      let _APR = ZERO
      let _LP_CAR = ZERO

      if (poolDetail._totalSupply > 0 && name !== 'CAR') {
        _LP_CAR = await getLpCAR(tpc, provider)
      }

      _APR = getApr(
        name,
        poolDetail._totalSupply,
        poolDetail._rewardRate,
        _LP_CAR
      )

      let info = poolInfo
      info[name].userStakeInfo = {
        staked: humanRedeableAmout(poolDetail.uniLPShares),
        available: humanRedeableAmout(poolDetail.availableUniLPShares),
        earned: humanRedeableAmout(poolDetail.earned),
      }

      info[name].stakePoolInfo = {
        periodFinish: new Date((await src.periodFinish()) * 1000).toISOString(),
        totalSupply: humanRedeableAmout(poolDetail._totalSupply),
        rewardRate: humanRedeableAmout(poolDetail._rewardRate),
        rewardPerToken: humanRedeableAmout(await src.rewardPerToken()),
        APR: _APR.toString(),
      }

      setPoolInfo(info)
    }
  }

  async function getContracts(poolAddress, provider, name) {
    let src = new Contract(poolAddress, STAKING_REWARDS_ABI, provider)
    let spt = await src.uni()
    let tpc = new Contract(spt, UNI_ABI, provider)

    let updateContracts = contracts
    updateContracts[name] = {
      stackingRewardsContract: src,
      tokenPoolContract: tpc,
      stakingPoolToken: spt,
    }

    setContracts(updateContracts)
  }

  return {
    poolInfo,
    contracts,
  }
}
