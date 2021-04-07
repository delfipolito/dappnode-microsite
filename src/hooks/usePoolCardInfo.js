import { useEffect, useState } from 'react'
import { ethers, Contract } from 'ethers'
import { abi as STAKING_REWARDS_ABI } from '../artifacts/UnipoolVested.json'
import { abi as UNI_ABI } from '../artifacts/UNI.json'
import { humanRedeableAmout } from '../lib/web3-utils'
import { useOnboardAndNotify } from './useOnboardAndNotify'
import { bn } from '../lib/numbers'

export function usePoolCardInfo(name, poolAddress) {
  const { provider, address } = useOnboardAndNotify()
  let owner = address
  const [cardStatus, setCardStatus] = useState({
    tick: false,
    amount: '0',
    depositButton: 'Deposit',
    withdrawButton: 'Withdraw',
    claimButton: 'Claim',
    buttonsEnable: true,
  })
  const [stakePoolInfo, setStakePoolInfo] = useState({})
  const [contracts, setContracts] = useState({})
  const [userStakeInfo, setUserStakeInfo] = useState({})

  const [poolInfo, setPoolInfo] = useState({
    'CAR/xDAI': { stakePoolInfo: null, userStakeInfo: null },
    'CAR/HNY': { stakePoolInfo: null, userStakeInfo: null },
    CAR: { stakePoolInfo: null, userStakeInfo: null },
  })
  console.log('hoook', name)

  async function updateStatus() {
    console.log('update', name)
    if (
      !contracts.stackingRewardsContract ||
      !contracts.stackingRewardsContract ||
      !contracts.tokenPoolContract
    )
      return

    let uniLPShares = await contracts.stackingRewardsContract.balanceOf(owner)
    let earned = await contracts.stackingRewardsContract.earned(owner)
    let availableUniLPShares = await contracts.tokenPoolContract.balanceOf(
      owner
    )
    let _rewardRate = await contracts.stackingRewardsContract.rewardRate()
    let _totalSupply = await contracts.stackingRewardsContract.totalSupply()

    let _APR = new ethers.utils.BigNumber('0')
    let _LP_CAR = new ethers.utils.BigNumber('0')

    if (_totalSupply > 0 && name !== 'CAR') {
      let _totalSupplyPool = await contracts.tokenPoolContract.totalSupply()
      let [
        _reserve0,
        _reserve1,
      ] = await contracts.tokenPoolContract.getReserves()

      let _token0 = await contracts.tokenPoolContract.token0()
      let tkn0 = new Contract(_token0, UNI_ABI, provider)
      let _tokenName0 = await tkn0.symbol()

      let _reserve = _tokenName0 === 'CAR' ? _reserve0 : _reserve1
      _LP_CAR = _totalSupplyPool
        .mul(new ethers.utils.BigNumber('1000000000000000000'))
        .div(new ethers.utils.BigNumber(2))
        .div(_reserve)

      _APR = _rewardRate
        .mul(new ethers.utils.BigNumber('31536000'))
        .mul(new ethers.utils.BigNumber('100'))
        .div(_totalSupply)
        .mul(_LP_CAR)
        .div(new ethers.utils.BigNumber('1000000000000000000'))
    } else if (name === 'CAR') {
      _APR = _rewardRate
        .mul(new ethers.utils.BigNumber('100'))
        .mul(new ethers.utils.BigNumber('31536000'))
        .div(_totalSupply)
    }

    setStakePoolInfo({
      ...stakePoolInfo,
      periodFinish: new Date(
        (await contracts.stackingRewardsContract.periodFinish()) * 1000
      ).toISOString(),
      totalSupply: humanRedeableAmout(_totalSupply),
      rewardRate: humanRedeableAmout(_rewardRate),
      rewardPerToken: humanRedeableAmout(
        await contracts.stackingRewardsContract.rewardPerToken()
      ),
      APR: _APR.toString(),
    })

    setUserStakeInfo({
      staked: humanRedeableAmout(uniLPShares),
      available: humanRedeableAmout(availableUniLPShares),
      earned: humanRedeableAmout(earned),
    })

    setCardStatus({
      ...cardStatus,
      tick: true,
    })

    setTimeout(hideBlockTick, 300)
  }

  useEffect(
    () => {
      console.log('effect', name)
      if (provider && owner && poolAddress) {
        if (poolInfo[name].stakePoolInfo === null) {
          intialize()
        } else {
          updateStatus()
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      //}, [block]);
    },
    [name, poolAddress, owner, provider]
  )

  async function intialize() {
    console.log('initialize', name)
    let info = poolInfo
    if (poolAddress && provider && owner) {
      console.log('delf', poolAddress, provider, owner)
      let src = new Contract(poolAddress, STAKING_REWARDS_ABI, provider)
      let spt = await src.uni()
      let tpc = new Contract(spt, UNI_ABI, provider)

      let uniLPShares = await src.balanceOf(owner)
      let earned = await src.earned(owner)
      let availableUniLPShares = await tpc.balanceOf(owner)
      let _rewardRate = await src.rewardRate()
      let _totalSupply = await src.totalSupply()
      console.log('info', name, availableUniLPShares, _rewardRate, _totalSupply)
      let _APR = new ethers.utils.BigNumber('0')
      let _LP_CAR = new ethers.utils.BigNumber('0')

      if (_totalSupply > 0 && name !== 'CAR') {
        let _totalSupplyPool = await tpc.totalSupply()
        let [_reserve0, _reserve1] = await tpc.getReserves()

        let _token0 = await tpc.token0()
        let tkn0 = new Contract(_token0, UNI_ABI, provider)
        let _tokenName0 = await tkn0.symbol()

        let _reserve = _tokenName0 === 'CAR' ? _reserve0 : _reserve1
        _LP_CAR = _totalSupplyPool
          .mul(new ethers.utils.BigNumber('1000000000000000000'))
          .div(new ethers.utils.BigNumber(2))
          .div(_reserve)

        _APR = _rewardRate
          .mul(new ethers.utils.BigNumber('31536000'))
          .mul(new ethers.utils.BigNumber('100'))
          .div(_totalSupply)
          .mul(_LP_CAR)
          .div(new ethers.utils.BigNumber('1000000000000000000'))
      } else if (name === 'CAR') {
        _APR = _rewardRate
          .mul(new ethers.utils.BigNumber('100'))
          .mul(new ethers.utils.BigNumber('31536000'))
          .div(_totalSupply)
      }
      console.log("apr",_APR)
      setUserStakeInfo({
        staked: humanRedeableAmout(uniLPShares),
        available: humanRedeableAmout(availableUniLPShares),
        earned: humanRedeableAmout(earned),
      })

      setStakePoolInfo({
        ...stakePoolInfo,
        periodFinish: new Date((await src.periodFinish()) * 1000).toISOString(),
        totalSupply: humanRedeableAmout(await src.totalSupply()),
        rewardRate: humanRedeableAmout(await src.rewardRate()),
        rewardPerToken: humanRedeableAmout(await src.rewardPerToken()),
        APR: _APR.toString(),
      })

      info[name].stakePoolInfo = {
        periodFinish: new Date((await src.periodFinish()) * 1000).toISOString(),
        totalSupply: humanRedeableAmout(await src.totalSupply()),
        rewardRate: humanRedeableAmout(await src.rewardRate()),
        rewardPerToken: humanRedeableAmout(await src.rewardPerToken()),
        APR: _APR.toString(),
      }

      setPoolInfo(info)

      setContracts({
        stackingRewardsContract: src,
        tokenPoolContract: tpc,
        stakingPoolToken: spt,
      })

      setCardStatus({
        ...cardStatus,
        tick: true,
      })

      setTimeout(hideBlockTick, 300)
    }
  }

  function hideBlockTick() {
    setCardStatus({
      ...cardStatus,
      tick: false,
    })
  }

  return {
    cardStatus,
    stakePoolInfo,
    contracts,
    userStakeInfo,
  }
}
