import React, { useState, useEffect } from 'react';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Inline } from '@zendeskgarden/react-loaders';
import { fetchTaxByInterval } from '../../utils/apis/tax'
import { fetchAveragedIncomeByInterval } from '../../utils/apis/income'
import TaxSection from '../TaxSection'
import AveragedIncomeSection from '../AveragedIncomeSection'


const TaxTab = ({ intervalId, refreshFlag }) => {
  const [tax, setTax] = useState(null)
  const [averagedIncome, setAveragedIncome] = useState(null)

  useEffect(() => {
      fetchTaxByInterval(intervalId).then(taxData => setTax(taxData))
      fetchAveragedIncomeByInterval(intervalId).then(averagedIncomeData => setAveragedIncome(averagedIncomeData))
  }, [refreshFlag, intervalId])

  return (
      <div style={{width:'90%'}}>
          { (tax && averagedIncome) 
            ?
            <>
              <TaxSection tax={tax} intervalId={intervalId}/>
              <AveragedIncomeSection averagedIncome={averagedIncome} />
            </>
            : 
            <Inline size={32} color={PALETTE.blue[600]} />
          }
      </div>
  )
}

export default TaxTab
