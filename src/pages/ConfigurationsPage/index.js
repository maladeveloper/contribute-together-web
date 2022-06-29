import React, { useState, useEffect } from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import { Field, Label, Hint, Input, Message } from '@zendeskgarden/react-forms';
import { Paragraph } from '@zendeskgarden/react-typography';
import { MD, XXL, XXXL } from '@zendeskgarden/react-typography';
import { fetchIntervals, fetchLatestInterval } from '../../utils/apis/interval'
import { fetchNumericalParams } from '../../utils/apis/params'

const defaultColumn = {width:'100%', display:'flex', alignItems:'flex-start', flexDirection:'column'}

const AmountInput = ({ label, hint, value, active}) =>(
  <div style={{marginBottom:'3%'}}>
      <Field>
        <Label>{label}</Label>
        <Hint>{hint}</Hint>
        <Input value={value} readOnly={true}/>
      </Field>
  </div>
)

const IntervalAmountConfig = () =>{
  const [defaultValue, setDefaultValue] = useState(null)
  const [currentValue, setCurrentValue] = useState(null)

  useEffect(() => {
    fetchLatestInterval().then(interval => { 
      fetchNumericalParams().then(numericalParams =>{
        setCurrentValue(interval.amount)
        setDefaultValue(numericalParams.defaultIntervalAmount)
      })
    })
  },[])
  

  
  return(
    <div style={{ ...defaultColumn, marginTop:'3%'}}>
      <div>
        <XXL>{"Interval Amount Configuration"}</XXL>
        <Paragraph>
          <div style={{ marginBottom:'2%', marginTop:'2%' }}>
          <MD tag="span"> { "Amounts for each interval."} </MD>
          </div>
        </Paragraph>
      </div>
      <div style={{ ...defaultColumn, marginTop:'2%', alignItems:'center'}}>
        <div style={{display: 'flex'}}>
          <div style={{width:'500px', marginBottom:'5%'}}>
            <AmountInput
              label={"Current Interval Amount"}
              hint={"The amount to reach for the current interval."}
              value={currentValue}
            />
          </div>
          <div style={{ marginTop:'8%', marginLeft:'15%' }}>
            <Button isPrimary onClick={() => { console.log("hey")}}> {"Change"} </Button>
          </div>
        </div>
        <div style={{display: 'flex'}}>
          <div style={{width:'500px'}}>
            <AmountInput
              label={"Default Amount"}
              hint={"The default amount for each new interval"}
              value={defaultValue}
            />
          </div>
          <div style={{ marginTop:'8%', marginLeft:'15%' }}>
            <Button isPrimary onClick={() => {}}> {"Change"} </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


const ConfigurationsPage = () => {
  const [intervals, setIntervals] = useState(null)

  useEffect(() => {
    fetchIntervals().then(intervals => { 
      //Remove the latest interval      
      intervals.shift()
      setIntervals(intervals)
    })
  },[])

  return(
    <div style={{...defaultColumn, height:'1200px', overflow:'scroll'}}>
      <div>
        <XXXL>{"Configurations"}</XXXL>
        <Paragraph>
          <div style={{ marginBottom:'2%', marginTop:'2%' }}>
          <MD tag="span"> { "The default configurations."} </MD>
          </div>
        </Paragraph>
      </div>
      <div style={{...defaultColumn}}>
        <IntervalAmountConfig />
      </div>
    </div>
  )
}

export default ConfigurationsPage