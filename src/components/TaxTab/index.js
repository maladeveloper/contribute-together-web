import React, { useState, useEffect } from 'react';
import { fetchTaxByInterval } from '../../utils/apis/tax'
import { fetchAveragedIncomeByInterval } from '../../utils/apis/income'
import IncomeTaxTable from '../IncomeTaxTable'
import DefaultBlock from '../DefaultBlock'


const TaxTab = ({ intervalId, newSubmitFlag }) => {
  const [tax, setTax] = useState(null)
  const [averagedIncome, setAveragedIncome] = useState(null)

  useEffect(() => {
      fetchTaxByInterval(intervalId).then(taxData => setTax(taxData))
      fetchAveragedIncomeByInterval(intervalId).then(averagedIncomeData => setAveragedIncome(averagedIncomeData))
  }, [newSubmitFlag, intervalId])

  return (
      <DefaultBlock justifyContent={"center"} sm={10}>
          { (tax && averagedIncome) 
            ?
            <IncomeTaxTable averagedIncome={averagedIncome} tax={tax}/>
            : 
            <div>Loading</div>
          }
      </DefaultBlock>
  )
}

export default TaxTab
