import React, { useState } from 'react';
import { Row, Col } from '@zendeskgarden/react-grid';
import UsersDropdown from '../../components/UsersDropdown'
import StaticAddIncomeForm from '../../components/StaticAddIncomeForm'

const AddIncomePage = ({ submittedCall=()=>{} }) => {
  const [ selectedUser, setSeletedUser ] = useState(null)

  return(
    <Row justifyContent='center'>
      <Col sm={10}>
        <UsersDropdown selectedUser={selectedUser} setSeletedUser={setSeletedUser}/>
        { selectedUser && <StaticAddIncomeForm userId={selectedUser.id} submittedCall={submittedCall}/>}
      </Col>
    </Row>
  )
}

export default AddIncomePage
