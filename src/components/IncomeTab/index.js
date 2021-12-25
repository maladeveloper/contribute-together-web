import React, { useState, useEffect } from 'react';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Inline } from '@zendeskgarden/react-loaders';
import { fetchIncomeBySource } from '../../utils/apis/income'
import IncomeBySourceTable from '../IncomeBySourceTable'
import AddIncomePage from '../../pages/AddIncomePage'
import { Button } from '@zendeskgarden/react-buttons';
import DefaultBlock from '../DefaultBlock'


const IncomeTab = ( {intervalId, callSetNewSubmit}) => {
  const [incomeBySource, setIncomeBySource] = useState(null)
  const [addIncome, setAddIncome] = useState(false)

  const submittedCall = () => {
    setAddIncome(false) 
    callSetNewSubmit()
  }


  useEffect(() => {
    setIncomeBySource(null)
    fetchIncomeBySource(intervalId).then(incomeBySourceData => setIncomeBySource(incomeBySourceData))
  },[addIncome, intervalId])

  return (
    <>
      { addIncome 
        ?
        <AddIncomePage submittedCall={submittedCall}/>
        :
        <DefaultBlock>
            { incomeBySource 
              ?
              <>
                <DefaultBlock>
                  <Button isPrimary isStretched onClick={() => setAddIncome(true)}>
                    {"Add Income"}
                  </Button>
                </DefaultBlock>
                <IncomeBySourceTable incomeBySource={incomeBySource} />
              </>
              : 
              <Inline size={32} color={PALETTE.blue[600]} />
            }
        </DefaultBlock>
      }
    </>
  )
}

export default IncomeTab
