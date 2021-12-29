import React, { useState, useEffect } from 'react';
import { fetchLatestInterval } from '../../utils/apis/interval'
import { Tabs, TabList, Tab, TabPanel } from '@zendeskgarden/react-tabs';
import IncomeTab from '../../components/IncomeTab'
import TaxTab from '../../components/TaxTab'
import IntervalContext from '../../context/interval'
import { SM, MD, LG, XL, XXL, XXXL } from '@zendeskgarden/react-typography';
import { Paragraph, Span, } from '@zendeskgarden/react-typography';
import moment from 'moment';

const CurrentIntevalInfo = ({ interval }) =>(
  <div style={{marginBottom:'1%'}}>
    <XXXL>{"Current Interval"}</XXXL>
    <Paragraph>
      <div style={{ marginBottom:'0.5%', marginTop:'1%' }}>
      <MD tag="span"> { "The income and tax contribution required for the current interval"} </MD>
      <MD tag="span"> { "which spans the following dates."} </MD>
      </div>
        <div>
          <MD> { "Start date: "}<b>{moment(interval.startDate, "YYYY-MM-DD").format("dddd, MMMM Do YYYY")}</b></MD>
        </div>
        <div>
          <MD> { "End date: "}<b>{moment(interval.endDate, "YYYY-MM-DD").format("dddd, MMMM Do YYYY")}</b></MD>
        </div>
      <div style={{ marginBottom:'0.5%', marginTop:'0.5%' }}>
        <MD tag="span"> { "The goal for the current interval is as follows."} </MD>
      </div>
      <div >
        <MD> { "Goal Amount: "}<b>{`$${interval.amount}`}</b></MD>
      </div>
    </Paragraph>
  </div>
)

const CurrentInterval = () => {
  const [interval, setInterval] = useState(null)
  const [selectedTab, setSelectedTab] = useState('tab-1')
  const [refreshFlag, setRefreshFlag] = useState(false)

  const refreshIncomes = () => { setRefreshFlag(!refreshFlag) }


  useEffect(() => {
    fetchLatestInterval().then(interval => { 
      setInterval(interval)
    })
  },[])
    

  return(
      <IntervalContext.Provider value={interval}>
        { interval && <CurrentIntevalInfo interval={interval}/> }
        <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
          <TabList>
            <Tab item="tab-1">Tax</Tab>
            <Tab item="tab-2" >Income</Tab>
          </TabList>
          <TabPanel item="tab-1">
            <div style={{display:'flex', justifyContent:'center', height:'50rem'}}>
              { interval && <TaxTab intervalId={interval.id} refreshFlag={refreshFlag}/>}
            </div>
          </TabPanel>
          <TabPanel item="tab-2">
            <div style={{display:'flex', justifyContent:'center'}}>
              { interval && <IncomeTab  intervalId={interval.id} refreshIncomes={refreshIncomes} refreshFlag={refreshFlag}/>}
            </div>
          </TabPanel>
        </Tabs>
      </IntervalContext.Provider>
  )
}

export default CurrentInterval
