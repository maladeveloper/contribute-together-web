import React, { useState, useEffect } from 'react';
import { fetchLatestInterval } from '../../utils/apis/interval'
import { Tabs, TabList, Tab, TabPanel } from '@zendeskgarden/react-tabs';
import IncomeTab from '../../components/IncomeTab'
import TaxTab from '../../components/TaxTab'
import IntervalContext from '../../context/interval'
import DefaultBlock from '../../components/DefaultBlock'


const CurrentInterval = () => {
  const [interval, setInterval] = useState(null)
  const [selectedTab, setSelectedTab] = useState('tab-1')
  const [newSubmit, setNewSubmit] = useState(false)

  const callSetNewSubmit = () => { setNewSubmit(!newSubmit) }


  useEffect(() => {
    fetchLatestInterval().then(interval => { 
      setInterval(interval)
    })
  },[])
    

  return(
    <DefaultBlock>
      <IntervalContext.Provider value={interval}>
        <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
          <TabList>
            <Tab item="tab-1">Income</Tab>
            <Tab item="tab-2" >Tax</Tab>
          </TabList>
          <TabPanel item="tab-1">
            { interval && <IncomeTab  intervalId={interval.id} callSetNewSubmit={callSetNewSubmit}/>}
          </TabPanel>
          <TabPanel item="tab-2">
            { interval && <TaxTab intervalId={interval.id} newSubmitFlag={newSubmit}/>}
          </TabPanel>
        </Tabs>
      </IntervalContext.Provider>
    </DefaultBlock>
  )
}

export default CurrentInterval
