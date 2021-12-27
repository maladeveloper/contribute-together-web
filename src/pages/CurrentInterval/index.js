import React, { useState, useEffect } from 'react';
import { fetchLatestInterval } from '../../utils/apis/interval'
import { Tabs, TabList, Tab, TabPanel } from '@zendeskgarden/react-tabs';
import IncomeTab from '../../components/IncomeTab'
import TaxTab from '../../components/TaxTab'
import IntervalContext from '../../context/interval'


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
        <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
          <TabList>
            <Tab item="tab-1">Tax</Tab>
            <Tab item="tab-2" >Income</Tab>
          </TabList>
          <TabPanel item="tab-1">
            <div style={{display:'flex', justifyContent:'center'}}>
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
