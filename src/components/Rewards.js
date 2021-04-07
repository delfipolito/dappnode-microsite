import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { networkAllowed, isMainnet, isDN } from '../lib/web3-utils'
import Seed from '../assets/seed.js'
import Time from '../assets/time.js'

function Rewards({ wallet, network, onboard }) {
  if (!wallet.provider) {
    return (
      <WarnSection>
        <div>
          <WarnMessage> Please connect to a wallet</WarnMessage>
          <GreenButton
            onClick={() => {
              onboard.walletSelect()
            }}
            css={`
              margin-top: 25px;
            `}
          >
            Connect Wallet
          </GreenButton>
        </div>
      </WarnSection>
    )
  }
  if (!networkAllowed(network)) {
    return (
      <WarnSection>
        <WarnMessage>Please connect to the right network</WarnMessage>
      </WarnSection>
    )
  }

  return (
    <>
      <RewardsSection disabled={!isMainnet(network)}>
        <SpaceBetween>
          <label className={isMainnet(network) ? 'blue' : 'disabled'}>
            ETH
          </label>
          {!isMainnet(network) && (
            <p>
              <b>Connect to this network</b> to claim your tokens.{' '}
            </p>
          )}
        </SpaceBetween>
        <br />
        <Row>
          <SpaceBetween>
            <Inline>
              <Seed
                fillColor={isMainnet(network) ? '#EEF6FC' : '#F4F6F6'}
                strokeColor={isMainnet(network) ? '#0D91F0' : '#819896'}
              />
              <div>
                <Currency>
                  <h1>900</h1>
                  <h2>DN</h2>
                </Currency>
                <div>
                  <h3>Claimable</h3>
                </div>
              </div>
            </Inline>
            <BlueButton disabled={!isMainnet(network)}>Claim</BlueButton>
          </SpaceBetween>
        </Row>
        <Row>
          <SpaceBetween>
            <Inline>
              <Time
                fillColor={isMainnet(network) ? '#EEF6FC' : '#F4F6F6'}
                strokeColor={isMainnet(network) ? '#0D91F0' : '#819896'}
              />
              <div>
                <Currency>
                  <h1>10</h1>
                  <h2>DN</h2>
                </Currency>
                <div>
                  <h3>Locked</h3>
                </div>
              </div>
            </Inline>
            <BlueButton disabled={!isMainnet(network)}>Claim</BlueButton>
          </SpaceBetween>
        </Row>
      </RewardsSection>
      <RewardsSection>
        <SpaceBetween>
          <label className={isDN(network) ? 'green' : 'disabled'}>DN</label>
          {!isDN(network) && (
            <p>
              <b>Connect to this network</b> to claim your tokens.{' '}
            </p>
          )}
        </SpaceBetween>
        <br />
        <Row disabled={!isDN(network)}>
          <SpaceBetween>
            <Inline>
              <Seed
                fillColor={isDN(network) ? '#EEFCFB' : '#F4F6F6'}
                strokeColor={isDN(network) ? '#248F8B' : '#819896'}
              />
              <div>
                <Currency>
                  <h1>900</h1>
                  <h2>DN</h2>
                </Currency>
                <div>
                  <h3>Claimable</h3>
                </div>
              </div>
            </Inline>

            <GreenButton disabled={!isDN(network)}>Claim</GreenButton>
          </SpaceBetween>
        </Row>
        <Row>
          <SpaceBetween>
            <Inline>
              <Time
                fillColor={isDN(network) ? '#EEFCFB' : '#F4F6F6'}
                strokeColor={isDN(network) ? '#248F8B' : '#819896'}
              />

              <div>
                <Currency>
                  <h1>10</h1>
                  <h2>DN</h2>
                </Currency>
                <div>
                  <h3>Locked</h3>
                </div>
              </div>
            </Inline>

            <GreenButton disabled={!isDN(network)}>Claim</GreenButton>
          </SpaceBetween>
        </Row>
      </RewardsSection>
    </>
  )
}

const GreenButton = styled.button`
  background: ${props =>
    props.disabled
      ? '#DDE3E3'
      : 'linear-gradient(99.61deg, #86e4dd -0.13%, #2fbcb2 99.3%)'};

  border: solid 0px transparent;
  border-radius: 27px;
  font-family: 'Inter-Bold';
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: white;
  padding: 8px 16px;
  box-shadow: 0px 1px 1px rgba(8, 43, 41, 0.08),
    0px 0px 8px rgba(8, 43, 41, 0.06);
  &:hover {
    background: ${props =>
      props.disabled
        ? '#DDE3E3'
        : 'linear-gradient(99.61deg, #76ccc5 -0.13%, #218c84 99.3%)'};

    transition: all 0.25s ease-in-out;
  }
`

const BlueButton = styled.button`
  background: ${props =>
    props.disabled
      ? '#DDE3E3'
      : 'linear-gradient(99.61deg, #86BDE4 -0.13%, #0D91F0 99.3%);'};

  border: solid 0px transparent;
  border-radius: 27px;
  font-family: 'Inter-Bold';
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: white;
  padding: 8px 16px;
  box-shadow: 0px 1px 1px rgba(8, 43, 41, 0.08),
    0px 0px 8px rgba(8, 43, 41, 0.06);
  &:hover {
    background: ${props =>
      props.disabled
        ? '#DDE3E3'
        : 'linear-gradient(99.61deg, #7cadd0 -0.13%, #075c98 99.3%);'};

    transition: all 0.25s ease-in-out;
  }
`

const Currency = styled.div`
  display: flex;
  align-items: flex-end;
  h1 {
    font-family: 'Inter-Bold';
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    margin: 0 5px 0 0 !important;
    color: #222a29;
  }
  h2 {
    font-family: 'Inter-Bold';
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    align-items: flex-end;
    color: #455453;
    margin: 0;
    display: inline-flex;
  }
`

const Row = styled.div`
  box-shadow: 0px 1px 1px rgba(8, 43, 41, 0.08),
    0px 0px 8px rgba(8, 43, 41, 0.06);
  border-radius: 16px;
  padding: 12px;
  margin: 4px 0;
  h3 {
    font-family: 'Inter';
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: #5c706f;
    margin-bottom: 0;
    margin-top: 2px;
  }
`

const WarnMessage = styled.div`
  font-family: 'Inter';
  font-size: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #5c706f;
  margin: auto;
`
const WarnSection = styled.section`
  background-color: white;
  height: 212px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 16px;
  box-shadow: 0px 2px 2px rgba(8, 43, 41, 0.04),
    0px 2px 8px rgba(8, 43, 41, 0.06);
  border-radius: 16px;
  flex-grow: 1;
  margin: 0 10px;
`

const RewardsSection = styled.section`
  min-height: 212px;
  height: auto;
  width: 100%;
  padding: 16px;
  box-shadow: 0px 2px 2px rgba(8, 43, 41, 0.04),
    0px 2px 8px rgba(8, 43, 41, 0.06);
  border-radius: 16px;
  flex-grow: 1;
  margin: 0 10px;
  background: ${props => (props.disabled ? '#F4F6F6' : 'white')};

  label {
    background: #eefcfb;
    border-radius: 16px;
    padding: 4px 8px;
    font-family: 'Inter-Bold';
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    color: #23c8bc;
    margin: 8px 0;
    &.blue {
      color: #0d91f0;
      background: #eef6fc;
    }
    &.disabled {
      color: #819896;
      background: #f4f6f6;
    }
  }
  p {
    font-family: Inter;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: #5c706f;
    b {
      font-family: 'Inter-Bold';
      color: #0d91f0;
      text-decoration-line: underline;
      padding-right: 5px;
    }
  }
`
const Inline = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  div {
    padding-left: 5px;
  }
`

const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

export default Rewards