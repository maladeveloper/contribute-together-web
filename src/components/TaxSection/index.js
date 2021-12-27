import React, { useState, useEffect, useContext } from 'react';
import UserAmountTable from '../UserAmountTable'
import UserContext from '../../context/users'
import { Paragraph, Span, } from '@zendeskgarden/react-typography';
import { SM, MD, LG, XL, XXL, XXXL } from '@zendeskgarden/react-typography';
import { zipIdToName } from '../../utils/helpers'


const TaxInfo = () =>(
  <>
    <XXL >Tax Collection</XXL>
    <Paragraph>
      <MD tag="span"> { "The contribution that is required to be paid by each individual"} </MD>
    </Paragraph>
  </>
)

const TaxUnpaidNotif = ({ unpaidNames }) => (
  <div>
  the following users have not paid {unpaidNames.map(name => <p>{name}</p>)}
 

  </div>
)

const findUnpaidNames = ( tax, allUsers) =>{
    const allUsersArr = allUsers.map( user => user.id)
    const paidUsersArr = Object.keys(tax)
    const unpaidUsers = allUsersArr.filter( user => !paidUsersArr.includes(user))
    const userDict =  zipIdToName(allUsers)
    return unpaidUsers.map( userId => userDict[userId])
}



const TaxSection = ({ tax }) => {
  const allUsers = useContext(UserContext)


  return(
    <>
      <TaxInfo/>
    { tax.length  
      ?
      <UserAmountTable data={tax}/> 
      :
      <TaxUnpaidNotif  unpaidNames={findUnpaidNames(tax, allUsers)}/>
    }
    </>
  )
}

export default TaxSection
