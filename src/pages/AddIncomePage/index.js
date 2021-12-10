import React, { useState, useEffect } from 'react';
import { Row, Col } from '@zendeskgarden/react-grid';
import UsersDropdown from '../../components/UsersDropdown'
import StaticAddIncomeForm from '../../components/StaticAddIncomeForm'

const AddIncomePage = ({ }) => {
  const [ selectedUser, setSeletedUser ] = useState(null)

  return(
    <Row justifyContent='center'>
      <Col sm={10}>
        <UsersDropdown selectedUser={selectedUser} setSeletedUser={setSeletedUser}/>
        { selectedUser && <StaticAddIncomeForm userId={selectedUser.id} />}
      </Col>
    </Row>
  )
}

export default AddIncomePage
