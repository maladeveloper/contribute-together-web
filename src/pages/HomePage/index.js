import React, { useState, useEffect } from 'react';
import CurrentInterval from '../CurrentInterval'
import UserContext from '../../context/users'
import { fetchAllUsers } from '../../utils/apis/admin'

const HomePage = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    fetchAllUsers().then(usersData => {
      setUsers(usersData)
    })
  }, [])
  
  return(
    <div>
      <UserContext.Provider value={users}>
        <CurrentInterval />
      </UserContext.Provider>
    </div>
  )
}
export default HomePage
