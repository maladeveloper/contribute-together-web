import React, { useContext } from 'react';
import UserContext from '../../context/users'
import KeyToValueTable from '../KeyToValueTable';
import UserAmountTable from '../UserAmountsTable';
import {LG, XL } from '@zendeskgarden/react-typography';
import { zipIdToName } from '../../utils/helpers'



const showSourceIncome = (userSourceIncome) =>{
    console.log( 'userSourceIncome', userSourceIncome)
    const sourceToAmount = {}
    let totalAmount = 0

    Object.keys(userSourceIncome).forEach(key => {
        totalAmount += userSourceIncome[key].amount 
        sourceToAmount[key] = userSourceIncome[key].amount
    })
    

    console.log( 'sourceToAmount', sourceToAmount)
    return(
        <div><KeyToValueTable  data={sourceToAmount} colOneName={"Source"} colTwoName={"Amount($)"} totalAmount={totalAmount}/> </div>
    )
}


const showIndividualIncomeBySource = (incomeBySourceData, userDict) => {

    return(
       <>
        {Object.keys(incomeBySourceData).map(id =>(
            <div key={id} style={{marginTop:'2%'}}>
            <LG>{userDict[id]}</LG>
            {showSourceIncome(incomeBySourceData[id])}
            </div>
        ))
        }
       </> 
    )

}

const AllIntervalData = ({ intervalData }) => {
  const allUsers = useContext(UserContext)
  const userDict =  zipIdToName(allUsers)

  return(
    <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
        <div style={{width:'85%', marginTop: '1%'}} >
          <XL>{"Paid Tax"}</XL>
          <UserAmountTable data={intervalData.paymentData}/>
        </div>
        <div style={{width:'85%', marginTop: '4%'}} >
          <XL>{"Averaged Income"}</XL>
          <UserAmountTable data={intervalData.averagedIncomeData}/>
        </div>
        <div style={{width:'85%', marginTop: '4%'}} >
          <XL>{"Individual Income"}</XL>
            {showIndividualIncomeBySource(intervalData.incomeBySourceData, userDict)}
       
        </div>
    </div>
  )
}

export default AllIntervalData
