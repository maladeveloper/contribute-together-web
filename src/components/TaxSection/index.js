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
import { Notification, Title, Close } from '@zendeskgarden/react-notifications';
import { OrderedList, UnorderedList } from '@zendeskgarden/react-typography';
import DefaultBlock from '../DefaultBlock'



const TaxInfo = () =>(
  <DefaultBlock sm={14}>
    <XXL>{"Tax Collection"}</XXL>
    <Paragraph>
      <MD tag="span"> { "The contribution that is required to be paid by each individual."} </MD>
    </Paragraph>
  </DefaultBlock>
)

const TaxUnpaidNotification = ({ unpaidNames }) => (

  <DefaultBlock sm={14}>
  <Notification type="warning">
    <Title>{"Warning"}</Title>
    <MD tag="span"> {"The tax cannot be calculated since the following users have not paid."} </MD>
    <UnorderedList>
      {unpaidNames.map(name => <UnorderedList.Item>{name}</UnorderedList.Item>)}
    </UnorderedList>
  </Notification> 
  </DefaultBlock>
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
    <DefaultBlock sm={12}>
      <TaxInfo/>
    { !unpaidUsers.length 
      ?
      <UserAmountTable data={tax}/> 
      :
      <TaxUnpaidNotification  unpaidNames={findUnpaidNames(unpaidUsers, allUsers)}/>
    }
    { isLoading && <Inline size={32} color={PALETTE.blue[600]} />}
    </DefaultBlock>
  )
}

export default TaxSection
