import React from 'react'
import styled from 'styled-components'
import PoolCard from './PoolCard'
import dn from '../assets/dn-logo.svg'
import dnEth from '../assets/dn-eth-logos.svg'

const Dashboard = ({ provider, address }) => (
  <DashboardSection>
    <PoolsContainer>
      {provider &&
        address && (
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
  margin: auto;
  padding: 100px;
`

const PoolsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Dashboard
