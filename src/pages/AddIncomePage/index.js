import React, { useState } from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import UsersDropdown from '../../components/UsersDropdown'
import StaticAddIncomeForm from '../../components/StaticAddIncomeForm'

const AddIncomePage = ({ exitAddForm=()=>{} }) => {
  const [ selectedUser, setSeletedUser ] = useState(null)

  return(
    <>
      <div>
         <Button onClick={() => exitAddForm()}>Exit</Button>
      </div>
      <UsersDropdown selectedUser={selectedUser} setSeletedUser={setSeletedUser}/>
      { selectedUser && <StaticAddIncomeForm userId={selectedUser.id} exitAddForm={exitAddForm}/>}
    </>
  )
}

export default AddIncomePage
