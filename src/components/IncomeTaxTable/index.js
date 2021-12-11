import React, { useState, useEffect, useContext } from 'react';
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

const arrToRows = (obj) => {
  return(
    Object.keys(obj).map( userId => (
      <Row key={userId}>
        <Cell>{userId}</Cell>
        <Cell>{obj[userId]}</Cell>
      </Row>
    ))
)}

const IncomeTaxTable = ({ tax, averagedIncome}) =>{
  return(
    <div >
      <Table size={"large"}>
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
            {arrToRows(averagedIncome)}
          <GroupRow>
            <Cell colSpan={2}>
              <b>Tax</b>
            </Cell>
          </GroupRow>
            {arrToRows(tax)}
        </Body>
      </Table>
    </div>
  )

}

export default IncomeTaxTable
