import React, { useState, useEffect } from 'react';
import CurrentInterval from '../CurrentInterval'
import UserContext from '../../context/users'
import { fetchAllUsers } from '../../utils/apis/admin'
import styled from 'styled-components';


const HomePage = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    fetchAllUsers().then(usersData => {
      setUsers(usersData)
    })
  }, [])
  
  return(
    <div style={{display:'flex', justifyContent:'center'}}>
    <div style={{width:'90%'}}>
      <UserContext.Provider value={users}>
        <CurrentInterval />
      </UserContext.Provider>
    </div>
    </div>
  )
}
export default HomePage
