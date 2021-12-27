import React, { useState } from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import UsersDropdown from '../../components/UsersDropdown'
import StaticAddIncomeForm from '../../components/StaticAddIncomeForm'

const AddIncomePage = ({ exitAddForm=()=>{} }) => {
  const [ selectedUser, setSeletedUser ] = useState(null)

  return(
    <div style={{width:'90%', height:'55rem'}}>
      <div style={{marginBottom:'3%', marginTop:'3%'}}>
         <Button onClick={() => exitAddForm()}>Exit</Button>
      </div>
      <div style={{marginBottom:'3%'}}>
        <UsersDropdown selectedUser={selectedUser} setSeletedUser={setSeletedUser}/>
      </div>
      <div style={{marginBottom:'3%'}}>
      { selectedUser && <StaticAddIncomeForm userId={selectedUser.id} exitAddForm={exitAddForm}/>}
      </div>
    </div>
  )
}

export default AddIncomePage
