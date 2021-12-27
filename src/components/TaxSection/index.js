import React, { useState, useEffect, useContext } from 'react';
import UserAmountTable from '../UserAmountTable'
import UserContext from '../../context/users'
import IntervalContext from '../../context/interval'
import { Paragraph, Span, } from '@zendeskgarden/react-typography';
import { SM, MD, LG, XL, XXL, XXXL } from '@zendeskgarden/react-typography';
import { zipIdToName } from '../../utils/helpers'
import { fetchUnpaidUsers } from '../../utils/apis/admin'
import { PALETTE } from '@zendeskgarden/react-theming';
import { Inline } from '@zendeskgarden/react-loaders';


const TaxInfo = () =>(
  <>
    <XXL >Tax Collection</XXL>
    <Paragraph>
      <MD tag="span"> { "The contribution that is required to be paid by each individual"} </MD>
    </Paragraph>
  </>
)

const TaxUnpaidNotification = ({ unpaidNames }) => (
  <div>
  the following users have not paid {unpaidNames.map(name => <p>{name}</p>)}
 

  </div>
)

const findUnpaidNames = ( unpaidUsers, allUsers) =>{
    const userDict =  zipIdToName(allUsers)
    return unpaidUsers.map( userId => userDict[userId])
}

const TaxSection = ({ tax }) => {
  const [unpaidUsers, setUnpaidUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const allUsers = useContext(UserContext)
  const interval = useContext(IntervalContext)

  useEffect(() => {
    setIsLoading(true)
    fetchUnpaidUsers(interval.id).then( users => {
      setUnpaidUsers(users)
      setIsLoading(false)
    })
  }, [tax, interval])



  return(
    <>
      <TaxInfo/>
    { tax.length && !isLoading 
      ?
      <UserAmountTable data={tax}/> 
      :
      <TaxUnpaidNotification  unpaidNames={findUnpaidNames(unpaidUsers, allUsers)}/>
    }
    { isLoading && <Inline size={32} color={PALETTE.blue[600]} />}
    </>
  )
}

export default TaxSection
