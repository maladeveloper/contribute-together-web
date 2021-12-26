import React, { useState } from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import { Row, Col } from '@zendeskgarden/react-grid';
import UsersDropdown from '../../components/UsersDropdown'
import StaticAddIncomeForm from '../../components/StaticAddIncomeForm'
import DefaultBlock from '../../components/DefaultBlock'

const AddIncomePage = ({ exitAddForm=()=>{} }) => {
  const [ selectedUser, setSeletedUser ] = useState(null)

  return(
    <Row justifyContent='center'>
      <Col sm={10}>
        <DefaultBlock justifyContent={"start"} sm={5}>
           <Button onClick={() => exitAddForm()}>Exit</Button>
        </DefaultBlock>
        <UsersDropdown selectedUser={selectedUser} setSeletedUser={setSeletedUser}/>
        { selectedUser && <StaticAddIncomeForm userId={selectedUser.id} exitAddForm={exitAddForm}/>}
      </Col>
    </Row>
  )
}

export default AddIncomePage
