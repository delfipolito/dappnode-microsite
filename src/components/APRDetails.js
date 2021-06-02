import React from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import 'reactjs-popup/dist/index.css'
import closeModal from '../assets/closeModal.svg'
import external from '../assets/external-link-green.svg'
import { WhiteGreenButtonLink } from './Styles.js'

export default () => (
  <StyledPopup trigger={<SimpleButton>See details</SimpleButton>} modal>
    {close => (
      <div className="modal">
        <SpaceBetween>
          <h2>APR Details</h2>
          <img src={closeModal} onClick={close} />
        </SpaceBetween>
        <div className="apr-table">
          <div>
            <h1>Timeframe</h1>
            <p>1 Day</p>
            <p>7 Days</p>
            <p>30 Days</p>
            <p>365 Days (APY)</p>
          </div>
          <div>
            <h1>ROI</h1>
            <p>1.05%</p>
            <p>10.23%</p>
            <p>53.14%</p>
            <p>17723.11%</p>
          </div>
          <div>
            <h1>DN per $1000</h1>
            <p>1.24</p>
            <p>9.62</p>
            <p>47.88</p>
            <p>15952.77</p>
          </div>
        </div>
        <div className="actions">
          <WhiteGreenButtonLink>Get more DN <img src={external}/></WhiteGreenButtonLink>
        </div>
      </div>
    )}
  </StyledPopup>
)

const StyledPopup = styled(Popup)`
  &-content {
    border-radius: 24px;
    padding: 32px;
    width: auto;

    h1 {
      font-family: 'Inter-Bold';
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      color: #222a29;
      margin-bottom: 24px;
    }
    p {
      font-family: 'Inter';
      font-size: 14px;
      line-height: 17px;
      color: #222a29;
      margin-bottom: 16px;
    }
    .apr-table {
      display: flex;
      margin: 0 -32px;
      div {
        margin: 0 32px;
      }
    }
  }
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
  position: absolute;
  width: calc(100% - 15px);
  top: -57px;
  left: 15px;
  img {
    cursor: pointer;
  }
  h2 {
    font-family: 'Inter-Bold';
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
  }
`
