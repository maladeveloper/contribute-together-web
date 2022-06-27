import {
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table
} from '@zendeskgarden/react-tables';

const arrToRows = (data) => {
  return(
    Object.keys(data).map( key => (
      <Row key={key}>
        <Cell>{key}</Cell>
        <Cell>{data[key]}</Cell>
      </Row>
    ))
)}

const KeyToValueTable = ({ data, colOneName, colTwoName, totalAmount=null }) =>{

  return(
    <Table >
      <Head>
        <HeaderRow>
          <HeaderCell>{colOneName}</HeaderCell>
          <HeaderCell>{colTwoName}</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
          {arrToRows(data)}
        {totalAmount != null &&
        <Row key={-1}>
          <Cell><i>{"Total"}</i></Cell>
          <Cell><i>{totalAmount}</i></Cell>
        </Row>
        }
      </Body>
    </Table>
  )
}

export default KeyToValueTable
