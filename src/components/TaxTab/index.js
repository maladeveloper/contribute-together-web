import React, { useState, useEffect } from 'react';
import { Row, Col } from '@zendeskgarden/react-grid';
import styled from 'styled-components';
import { fetchTaxByInterval } from '../../utils/apis/tax'
import { fetchAveragedIncomeByInterval } from '../../utils/apis/income'
import IncomeTaxTable from '../IncomeTaxTable'

const SpacedRow = styled(Row)`
  margin: 50px 0px;
`

const TaxTab = ({ intervalId, newSubmitFlag }) => {
  const [tax, setTax] = useState(null)
  const [averagedIncome, setAveragedIncome] = useState(null)

  useEffect(() => {
      fetchTaxByInterval(intervalId).then(taxData => setTax(taxData))
      fetchAveragedIncomeByInterval(intervalId).then(averagedIncomeData => setAveragedIncome(averagedIncomeData))
  }, [newSubmitFlag, intervalId])

  return (
    <>
      <SpacedRow justifyContent={'center'}>
        <Col sm={10}>
          { (tax && averagedIncome) 
            ?
            <IncomeTaxTable averagedIncome={averagedIncome} tax={tax}/>
            : 
            <div>Loading</div>
          }
        </Col>
      </SpacedRow>
    </>
  )
}

export default TaxTab
