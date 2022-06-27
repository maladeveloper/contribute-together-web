import React, { useState, useEffect } from 'react';
import { Paragraph, Span, } from '@zendeskgarden/react-typography';
import { SM, MD, LG, XL, XXL, XXXL } from '@zendeskgarden/react-typography';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Inline } from '@zendeskgarden/react-loaders';
import { Accordion } from '@zendeskgarden/react-accordions';
import { fetchIncomeBySource, fetchAveragedIncomeByInterval } from '../../utils/apis/income'
import { fetchIntervals } from '../../utils/apis/interval'
import { fetchTaxByInterval } from '../../utils/apis/tax'
import AllIntervalData from '../../components/AllIntervalData'
import moment from 'moment';



const AccordianIntervals = ({ intervals }) => {
  const [intervalData, setIntervalData] = useState({})
  
  const addNewInterval = (intervalIndex) => {
    if (!(intervalIndex in setIntervalData)){
      //Make a call to get interval data
      const intervalId = intervals[intervalIndex].id
      fetchIncomeBySource(intervalId).then(incomeBySourceData => {
        fetchTaxByInterval(intervalId).then(taxData =>{
          fetchAveragedIncomeByInterval(intervalId).then(averagedIncomeData =>{
            const newIntervalDataObj = { incomeBySourceData, taxData, averagedIncomeData };
            const newIntervalData = { ...intervalData }
            console.log( 'newIntervalData', newIntervalData)
            newIntervalData[intervalIndex] = newIntervalDataObj
            setIntervalData(newIntervalData)
          })
        })
      })
    }
  }
  

  return(
    <Accordion level={4} isExpandable onChange={(index) => addNewInterval(index)} defaultExpandedSections={[]}>
      { intervals.map((interval, key) =>(
        <Accordion.Section key={key}>
          <Accordion.Header>
            <Accordion.Label>
             {moment(interval.startDate, "YYYY-MM-DD").format("MMMM Do YYYY")} - {moment(interval.endDate, "YYYY-MM-DD").format("MMMM Do YYYY")}
             </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            {intervalData[key] 
                ? < AllIntervalData intervalData={intervalData[key]} />
                :<Inline size={32} color={PALETTE.blue[600]} />
            }
          </Accordion.Panel>
        </Accordion.Section>

      ))}
    </Accordion>
  )
}

const PreviousPayments = () => {
  const [intervals, setIntervals] = useState(null)

  useEffect(() => {
    fetchIntervals().then(intervals => { 
      //Remove the latest interval      
      intervals.shift()
      setIntervals(intervals)
    })
  },[])

  return(
    <div style={{display:'flex', alignItems:'flex-start', flexDirection:'column'}}>
      <div>
        <XXXL>{"Previous Payments"}</XXXL>
    <Paragraph>
      <div style={{ marginBottom:'2%', marginTop:'2%' }}>
      <MD tag="span"> { "Previous payments that have already been paid within their pay period."} </MD>
      </div>
    </Paragraph>
      </div>
      <div style={{height:'1200px', overflow:'scroll', width:'85%', marginLeft:'10%'}} >
        { intervals && <AccordianIntervals intervals={intervals}/>}
      </div>
    </div>
  )
}

export default PreviousPayments