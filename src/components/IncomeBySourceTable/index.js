import React, { useContext, useState } from 'react';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Inline } from '@zendeskgarden/react-loaders';
import {
  GroupRow,
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table
} from '@zendeskgarden/react-tables';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { zipIdToName } from '../../utils/helpers'
import UserContext from '../../context/users'
import { IconButton } from '@zendeskgarden/react-buttons';
import { ReactComponent as LeafIcon } from '@zendeskgarden/svg-icons/src/16/x-circle-stroke.svg';
import { deleteSpecificIncome } from '../../utils/apis/income'




const IncomeBySourceTable = ({ incomeBySource, refreshIncomes }) => {
  const [isLoading, setLoading] = useState(false)
  const allUsers = useContext(UserContext)
  const deleteIncomes = (idArr) => {
    setLoading(true)
    Promise.all(idArr.map( id =>  deleteSpecificIncome(id))).then(() => refreshIncomes())
  }


  const incomeToRows = (obj) => {
    return(
      <>
        {
          Object.keys(obj).map( incName =>{
            const incomeIds = obj[incName]['ids']
            return(
              <Row key={incName}>
                <Cell>{incName}</Cell>
                <Cell>{obj[incName]['amount']}</Cell>
                <Cell>
                  <Tooltip content="Delete">
                    <IconButton isDanger onClick={() => deleteIncomes(incomeIds)}>
                      <LeafIcon />
                    </IconButton>
                  </Tooltip>
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
                <Cell colSpan={3}>
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

  return(
    <>
    { !isLoading &&
    <div style={{ overflowX: 'auto' }}>
      <Table style={{ minWidth: 500 }}>
        <Head>
          <HeaderRow>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell width={'70px'}> </HeaderCell>
          </HeaderRow>
        </Head>
        { objToRows(incomeBySource, allUsers)}
      </Table>
    </div>
    }
    { isLoading && <Inline size={32} color={PALETTE.blue[600]} />}
    </>
  )
}

export default IncomeBySourceTable
