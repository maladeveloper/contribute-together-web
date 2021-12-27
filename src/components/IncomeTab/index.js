import React, { useState, useEffect } from 'react';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Inline } from '@zendeskgarden/react-loaders';
import { fetchIncomeBySource } from '../../utils/apis/income'
import IncomeBySourceTable from '../IncomeBySourceTable'
import AddIncomePage from '../../pages/AddIncomePage'
import { Button } from '@zendeskgarden/react-buttons';


const IncomeTab = ( {intervalId, refreshIncomes, refreshFlag}) => {
  const [incomeBySource, setIncomeBySource] = useState(null)
  const [addIncome, setAddIncome] = useState(false)

  const exitAddForm = () => {
    setAddIncome(false) 
    refreshIncomes()
  }


  useEffect(() => {
    setIncomeBySource(null)
    fetchIncomeBySource(intervalId).then(incomeBySourceData => setIncomeBySource(incomeBySourceData))
  },[addIncome, intervalId, refreshFlag])

  return (
    <>
      { addIncome 
        ?
        <AddIncomePage exitAddForm={exitAddForm}/>
        :
        <div>
            { incomeBySource 
              ?
              <>
                <div>
                  <Button isPrimary isStretched onClick={() => setAddIncome(true)}>
                    {"Add Income"}
                  </Button>
                </div>
                <IncomeBySourceTable incomeBySource={incomeBySource} refreshIncomes={refreshIncomes}/>
              </>
              : 
              <Inline size={32} color={PALETTE.blue[600]} />
            }
        </div>
      }
    </>
  )
}

export default IncomeTab
