import React, { useState, useEffect } from 'react';
import { Row, Col } from '@zendeskgarden/react-grid';
import styled from 'styled-components';
import { fetchIncomeBySource } from '../../utils/apis/income'
import IncomeBySourceTable from '../IncomeBySourceTable'
import AddIncomePage from '../../pages/AddIncomePage'
import { Button } from '@zendeskgarden/react-buttons';


const SpacedRow = styled(Row)`
  margin: 50px 0px;
`

const IncomeTab = ( {intervalId, callSetNewSubmit}) => {
  const [incomeBySource, setIncomeBySource] = useState(null)
  const [addIncome, setAddIncome] = useState(false)

  const submittedCall = () => {
    console.log("I AM SUBMITTING") 
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
        <SpacedRow justifyContent={'center'}>
          <Col sm={10}>
            { incomeBySource 
              ?
              <>
              <SpacedRow justifyContent={'center'}>
                <Col sm={10}>
                     <Button isPrimary isStretched onClick={() => setAddIncome(true)}>
                       {"Add Income"}
                     </Button>
                </Col>
              </SpacedRow>
               <IncomeBySourceTable incomeBySource={incomeBySource} />
              </>
              : 
              <div>Loading</div>
            }
          </Col>
        </SpacedRow>
      }
    </>
  )
}

export default IncomeTab
