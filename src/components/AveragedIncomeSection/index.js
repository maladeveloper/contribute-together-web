import React, { useState, useEffect, useContext } from 'react';
import UserAmountTable from '../UserAmountsTable'
import { SM, MD, LG, XL, XXL, XXXL } from '@zendeskgarden/react-typography';
import { Paragraph, Span, } from '@zendeskgarden/react-typography';

const AveragedIncomeInfo = () =>(
  <div style={{marginTop:'2%', marginBottom:'2%'}}>
    <XXL>{"Averaged Income"}</XXL>
    <Paragraph>
      <MD tag="span"> { "The averaged income over 2 periods (4 weeks) for each user."} </MD>
    </Paragraph>
  </div>
)


const AveragedIncomeSection = ({ averagedIncome }) =>{
  return(
    <>
      <AveragedIncomeInfo />
      <UserAmountTable data={averagedIncome}/>
    </>
  )
}

export default AveragedIncomeSection
