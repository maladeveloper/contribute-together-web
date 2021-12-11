import React, { useState, useEffect, useContext } from 'react';
import { Dropdown, Trigger, Menu, Item } from '@zendeskgarden/react-dropdowns';
import {
  GroupRow,
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  OverflowButton,
  Row,
  Table
} from '@zendeskgarden/react-tables';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { zipIdToName } from '../../utils/helpers'
import UserContext from '../../context/users'

const OverflowMenu = () => (
  <Dropdown>
    <Trigger>
      <Tooltip content="Row actions">
        <OverflowButton aria-label="row actions" />
      </Tooltip>
    </Trigger>
    <Menu
      placement="bottom-end"
      popperModifiers={{
        preventOverflow: {
          boundariesElement: 'viewport'
        },
        flip: {
          enabled: false
        },
        offset: {
          fn: data => {
            data.offsets.popper.top -= 2;
            return data;
          }
        }
      }}
    >
      <Item value="item-1">Edit</Item>
      <Item value="item-2">Delete</Item>
    </Menu>
  </Dropdown>
);

const incomeToRows = (obj) => {
  return(
    <>
      {
        Object.keys(obj).map( incName =>{
          return(
            <Row key={incName}>
              <Cell>{incName}</Cell>
              <Cell>{obj[incName]}</Cell>
              <Cell hasOverflow>
                <OverflowMenu />
              </Cell>
            </Row>
          )
        })
      }
    </>
  )
}

const objToRows = (obj, allUsers) => {
  const userDict =  zipIdToName(allUsers)

  return(
    <Body>
    {
      Object.keys(obj).map( userId =>{
        return (
          <>
            <GroupRow>
              <Cell colSpan={2}>
                <b>{userDict[userId]}</b>
              </Cell>
            </GroupRow>
            { incomeToRows(obj[userId])}
          </>
        )
      })
    }
    </Body>
  )
}


const IncomeBySourceTable = ({ incomeBySource }) => {
  const allUsers = useContext(UserContext)
  return(
    <div style={{ overflowX: 'auto' }}>
      <Table style={{ minWidth: 500 }}>
        <Head>
          <HeaderRow>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell hasOverflow>
            </HeaderCell>
          </HeaderRow>
        </Head>
        { objToRows(incomeBySource, allUsers)}
      </Table>
    </div>
  )
}

export default IncomeBySourceTable
