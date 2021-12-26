import React, { useState, useEffect } from 'react';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Inline } from '@zendeskgarden/react-loaders';
import { fetchTaxByInterval } from '../../utils/apis/tax'
import { fetchAveragedIncomeByInterval } from '../../utils/apis/income'
import IncomeTaxTable from '../IncomeTaxTable'
import DefaultBlock from '../DefaultBlock'


const TaxTab = ({ intervalId, refreshFlag }) => {
  const [tax, setTax] = useState(null)
  const [averagedIncome, setAveragedIncome] = useState(null)

  useEffect(() => {
      fetchTaxByInterval(intervalId).then(taxData => setTax(taxData))
      fetchAveragedIncomeByInterval(intervalId).then(averagedIncomeData => setAveragedIncome(averagedIncomeData))
  }, [refreshFlag, intervalId])

  return (
      <DefaultBlock justifyContent={"center"} sm={10}>
          { (tax && averagedIncome) 
            ?
            <IncomeTaxTable averagedIncome={averagedIncome} tax={tax}/>
            : 
            <Inline size={32} color={PALETTE.blue[600]} />
          }
      </DefaultBlock>
  )
}

export default TaxTab
