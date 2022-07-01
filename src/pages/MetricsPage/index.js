import React, { useState, useEffect, useContext } from 'react';
import { Paragraph } from '@zendeskgarden/react-typography';
import { MD, XXXL, XXL } from '@zendeskgarden/react-typography';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Inline } from '@zendeskgarden/react-loaders';
import { ComposedChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchTotalIncomeMetric, fetchTotalPaidMetric, fetchTotalIncomeByIntervalMetric, fetchPaymentByIntervalMetric } from '../../utils/apis/metrics'
import UserContext from '../../context/users'
import { zipIdToName } from '../../utils/helpers'
import moment from 'moment';


const IncomeAndTaxPerUser = ({userIdToName}) => {

  const [data, setData] = useState(null)

  useEffect(() => {
      fetchTotalIncomeMetric().then(incomeMetric => {
        fetchTotalPaidMetric().then( paidMetric => {
          const data = []
          Object.keys(userIdToName).forEach(userId => {
            const userData = {}
            userData['Name'] = userIdToName[userId]
            userData['Total Income Received'] = incomeMetric[userId]
            userData['Total Tax Paid'] = paidMetric[userId]
            data.push(userData)
          })
          setData(data)
        })
      })
  }, [userIdToName])
  

  return (
    <>
    {data
    ?(
    <div style={{ height:'500px', marginBottom:'5%', marginTop:'3%'}}>
      <div style={{marginBottom:'3%'}}>
        <XXL>{"Total Income Received and Total Tax Contributed by User"}</XXL>
      </div>
      <ResponsiveContainer width="100%" height="100%">
       <BarChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5, }} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Total Income Received" fill="#17494D" />
            <Bar dataKey="Total Tax Paid" fill="#84b0ad" />
          </BarChart>
      </ResponsiveContainer>
    </div>
    )
    :(
    <div style={{ height:'500px', display:'flex', justifyContent: 'center', alignItems:'center'}}>
      <Inline size={32} color={PALETTE.blue[600]} />
    </div>
    )
    }
    </>
  );
}

const IncomePerInterval = () => {

  const [data, setData] = useState(null)

  useEffect(() => {
    fetchTotalIncomeByIntervalMetric().then( incomeMetric =>{
      fetchPaymentByIntervalMetric().then( paidMetric =>{
        const data = []
        Object.keys(incomeMetric).forEach( intervalDate => {
          const [startDate, endDate] = intervalDate.split('_')
          const intervalObj = {}
          intervalObj['Interval'] = moment(startDate, "YYYY-MM-DD").format("D MMM YY") + ' - ' + moment(endDate, "YYYY-MM-DD").format("D MMM YY")
          intervalObj['Income'] = incomeMetric[intervalDate]
          intervalObj['Paid Tax'] = paidMetric[intervalDate]
          data.push(intervalObj)
        })
        setData(data)
      })
    })
  }, [])

  return(
    <>
    {data
    ?(
    <div style={{ height:'500px' }}>
      <div style={{marginTop:'10%', marginBottom:'3%' }}>
        <XXL>{"Income Received and Tax Contributed per Interval"}</XXL>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart width={500} height={400} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20, }} >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="Interval" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" barSize={20} fill="#30AABC" />
          <Bar dataKey="Paid Tax" barSize={20} fill="#7D3D54" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
    )
    :(
    <div style={{ height:'500px', display:'flex', justifyContent: 'center', alignItems:'center'}}>
      <Inline size={32} color={PALETTE.blue[600]} />
    </div>
    )
    }
    </>
  )
}

const MetricsPage = () => {

  const allUsers = useContext(UserContext)
          

  return(
    <div style={{display:'flex', alignItems:'flex-start', flexDirection:'column'}}>
      <div>
        <XXXL>{"Metrics"}</XXXL>
    <Paragraph>
      <div style={{ marginBottom:'2%', marginTop:'2%' }}>
      <MD tag="span"> { "Metric data."} </MD>
      </div>
    </Paragraph>
      </div>
      <div style={{height:'2000px', overflow:'scroll', width:'100%'}} >
      { allUsers
        ?(
        <>
        <IncomeAndTaxPerUser userIdToName={zipIdToName(allUsers)}/>
        <IncomePerInterval />
        </>
        )
        :(<Inline size={32} color={PALETTE.blue[600]} />)
      }
      </div>
    </div>
  )
}

export default MetricsPage