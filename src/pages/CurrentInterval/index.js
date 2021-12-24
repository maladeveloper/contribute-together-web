import React, { useState, useEffect } from 'react';
import { Row, Col } from '@zendeskgarden/react-grid';
import { fetchLatestInterval } from '../../utils/apis/interval'
import { Tabs, TabList, Tab, TabPanel } from '@zendeskgarden/react-tabs';
import IncomeTab from '../../components/IncomeTab'
import TaxTab from '../../components/TaxTab'
import IntervalContext from '../../context/interval'
import styled from 'styled-components';

const SpacedRow = styled(Row)`
  margin: 50px 0px;
`

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
    <>
      <SpacedRow justifyContent={'center'}>
        <Col sm={10}>
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
        </Col>
      </SpacedRow>
    </>
  )
}

export default CurrentInterval
