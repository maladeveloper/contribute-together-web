import React, { useContext } from 'react';
import {
  Body,
  Cell,
  GroupRow,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table
} from '@zendeskgarden/react-tables';
import UserContext from '../../context/users'
import { zipIdToName } from '../../utils/helpers'

const arrToRows = (obj, allUsers) => {
  const userDict =  zipIdToName(allUsers)
  return(
    Object.keys(obj).map( userId => (
      <Row key={userId}>
        <Cell>{userDict[userId]}</Cell>
        <Cell>{obj[userId]}</Cell>
      </Row>
    ))
)}

const IncomeTaxTable = ({ tax, averagedIncome}) =>{
  const allUsers = useContext(UserContext)

  return(
    <Table >
      <Head>
        <HeaderRow>
          <HeaderCell>User</HeaderCell>
          <HeaderCell>Amount($)</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        <GroupRow>
          <Cell colSpan={2}>
            <b>Averaged Income</b>
          </Cell>
        </GroupRow>
          {arrToRows(averagedIncome, allUsers)}
        <GroupRow>
          <Cell colSpan={2}>
            <b>Tax</b>
          </Cell>
        </GroupRow>
          {arrToRows(tax, allUsers)}
      </Body>
    </Table>
  )
}

export default IncomeTaxTable
