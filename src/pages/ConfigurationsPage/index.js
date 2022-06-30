import React, { useState, useEffect } from 'react';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Inline } from '@zendeskgarden/react-loaders';
import { Button } from '@zendeskgarden/react-buttons';
import { Field, Label, Hint, Input, Message } from '@zendeskgarden/react-forms';
import { Paragraph } from '@zendeskgarden/react-typography';
import { MD, XXL, XXXL } from '@zendeskgarden/react-typography';
import { fetchLatestInterval, patchIntervalAmount } from '../../utils/apis/interval'
import { fetchNumericalParams, patchNumericalParams } from '../../utils/apis/params'


const defaultColumn = {width:'100%', display:'flex', alignItems:'flex-start', flexDirection:'column'}


const AmountInput = ({ label, hint, defaultValue, submitFunc }) =>{
  const [validValid, setValid] = useState(true)
  const [value, setValue] = useState(defaultValue)
  const [valueActive, setValueActive] = useState(false)
  
  const isValid = (value) => {
    const numInt = Number(value)
    if (isNaN(numInt) || numInt > 10000 || numInt < 1){
      return false
    }
    return true
  }
  
  return(
      <div style={{display: 'flex'}}>
        <div style={{marginBottom:'3%', width: '100%'}}>
          <Field>
            <Label>{label}</Label>
            <Hint>{hint}</Hint>
            <Input  
              validation={!validValid ? "error": ""} 
              readOnly={!valueActive} 
              value={value}
              onChange={(e) => {setValid(isValid(e.target.value));  setValue(e.target.value)}}
            />
            {!validValid && <Message validation="error">Must provide a number between 0 and 10,000</Message>}
          </Field>
        </div>

          <div style={{ marginTop:'9%', marginLeft:'15%' }}>
            { !valueActive && <Button onClick={() => {setValueActive(true)}}> {"Change"} </Button>}
            { valueActive && <Button disabled={!validValid} isPrimary onClick={() => submitFunc(Number(value))}> {"Submit"} </Button>}
          </div>
      </div>
  )
}

const IntervalAmountConfig = () =>{
  const [currentIntervalId, setCurrentIntervalId] = useState(null)
  const [defaultValue, setDefaultValue] = useState(null)
  const [currentValue, setCurrentValue] = useState(null)

  useEffect(() => {
    fetchLatestInterval().then(interval => { 
      fetchNumericalParams().then(numericalParams =>{
        setCurrentIntervalId(interval.id);
        setCurrentValue(interval.amount)
        setDefaultValue(numericalParams.defaultIntervalAmount)
      })
    })
  },[currentValue, defaultValue])

  const currentIntervalSubmission = (newAmount) => {
    patchIntervalAmount(currentIntervalId, newAmount).then((response) =>setCurrentValue(null))
  }

  const defaultIntervalSubmission = (newAmount) => {
    patchNumericalParams('default_interval_amount', newAmount).then((response) =>setDefaultValue(null))
  }
  
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
       <div style={{ ...defaultColumn, marginTop:'2%', height:'150px', alignItems:'center'}}>
        {currentValue 
          ?(
         <div style={{width:'500px', marginBottom:'5%'}}>
           <AmountInput
             label={"Current Interval Amount"}
             hint={"The amount to reach for the current interval."}
             defaultValue={currentValue}
             submitFunc={currentIntervalSubmission}
           />
         </div>
          )
          : (<Inline size={32} color={PALETTE.blue[600]} />)
        }
       </div>
       <div style={{ ...defaultColumn, height:'150px', alignItems:'center'}}>
        {defaultValue 
          ?(
         <div style={{width:'500px', marginBottom:'5%'}}>
           <AmountInput
             label={"Default Interval Amount"}
             hint={"The default amount to reach for a new interval."}
             defaultValue={defaultValue}
             submitFunc={defaultIntervalSubmission}
           />
         </div>
          )
          : (<Inline size={32} color={PALETTE.blue[600]} />)
        }
       </div>
    </div>
  )
}


const ConfigurationsPage = () => {

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