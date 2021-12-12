import React, { useState, useEffect } from 'react';
import { fetchTaxByInterval } from '../../utils/apis/tax'
import { fetchAveragedIncomeByInterval, fetchIncomeBySource } from '../../utils/apis/income'
import { Row, Col } from '@zendeskgarden/react-grid';
import { fetchLatestInterval } from '../../utils/apis/interval'
import { Tabs, TabList, Tab, TabPanel } from '@zendeskgarden/react-tabs';
import IncomeTaxTable from '../../components/IncomeTaxTable'
import IncomeBySourceTable from '../../components/IncomeBySourceTable'
import IntervalContext from '../../context/interval'
import AddIncomePage from '../../pages/AddIncomePage'
import styled from 'styled-components';

const SpacedRow = styled(Row)`
  margin: 50px 0px;
`

const CurrentInterval = () => {
  const [interval, setInterval] = useState(null)
  const [tax, setTax] = useState(null)
  const [averagedIncome, setAveragedIncome] = useState(null)
  const [incomeBySource, setIncomeBySource] = useState(null)
  const [selectedTab, setSelectedTab] = useState('tab-1')

  useEffect(() => {
    fetchLatestInterval().then(interval => { 
      setInterval(interval) 
      fetchTaxByInterval(interval.id).then(taxData => setTax(taxData))
      fetchAveragedIncomeByInterval(interval.id).then(averagedIncomeData => setAveragedIncome(averagedIncomeData))
      fetchIncomeBySource(interval.id).then(incomeBySourceData => setIncomeBySource(incomeBySourceData))
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
                <SpacedRow justifyContent={'center'}>
                  <Col sm={10}>
                    { interval && incomeBySource &&<IncomeBySourceTable incomeBySource={incomeBySource} />}
                    {!interval || !incomeBySource && <div>Loading</div>}
                  </Col>
                </SpacedRow>
              </TabPanel>
              <TabPanel item="tab-2">
                <SpacedRow justifyContent={'center'}>
                  <Col sm={10}>
                    { interval && averagedIncome && tax  && <IncomeTaxTable averagedIncome={averagedIncome} tax={tax}/>}
                    {!interval || !averagedIncome || !tax &&  <div>Loading</div>}
                  </Col>
                </SpacedRow>
              </TabPanel>
            </Tabs>
          </IntervalContext.Provider>
        </Col>
      </SpacedRow>
    </>
  )
}

export default CurrentInterval
