import React, { useState, useEffect, useContext } from 'react';
import { fetchTaxByInterval } from '../../utils/apis/tax'
import { fetchAveragedIncomeByInterval, fetchIncomeBySource } from '../../utils/apis/income'
import IntervalContext from '../../context/interval'
import IncomeTaxTable from '../IncomeTaxTable'
import IncomeBySourceTable from '../IncomeBySourceTable'

const CurrentIntervalStatus = () => {
  const interval = useContext(IntervalContext)
  const [tax, setTax] = useState(null)
  const [averagedIncome, setAveragedIncome] = useState(null)
  const [incomeBySource, setIncomeBySource] = useState(null)

  useEffect(() => {
    fetchTaxByInterval(interval.id).then(taxData => setTax(taxData))
    fetchAveragedIncomeByInterval(interval.id).then(averagedIncomeData => setAveragedIncome(averagedIncomeData))
    fetchIncomeBySource(interval.id).then(incomeBySourceData => setIncomeBySource(incomeBySourceData))
  },[])

  console.log('the tax data is-', tax)
  console.log('the averagedIncomeData is-', averagedIncome)
  console.log('the incomeBySource is-', incomeBySource)

  return(
    <div>
      { false && tax && averagedIncome && <IncomeTaxTable tax={tax} averagedIncome={averagedIncome} /> }
      { incomeBySource && <IncomeBySourceTable incomeBySource={incomeBySource} />}
    </div>
  )
}

export default CurrentIntervalStatus
