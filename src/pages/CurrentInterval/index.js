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
  const [refreshFlag, setRefreshFlag] = useState(false)

  const refreshIncomes = () => { setRefreshFlag(!refreshFlag) }


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
            { interval && <IncomeTab  intervalId={interval.id} refreshIncomes={refreshIncomes} refreshFlag={refreshFlag}/>}
          </TabPanel>
          <TabPanel item="tab-2">
            { interval && <TaxTab intervalId={interval.id} refreshFlag={refreshFlag}/>}
          </TabPanel>
        </Tabs>
      </IntervalContext.Provider>
    </DefaultBlock>
  )
}

export default CurrentInterval
