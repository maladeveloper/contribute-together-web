import { zipIdToName } from '../../utils/helpers'
import UserContext from '../../context/users'
import React, { useContext, useEffect } from 'react';
import KeyToValueTable from '../KeyToValueTable';

const mapIdToNameInData = (userDict, data) => {
    const newData = {}
    Object.keys(data).forEach(id =>{
        const name = userDict[id]
        newData[name] = data[id]
    })
    return newData
}

const UserAmountTable = ({ data }) =>{
    const allUsers = useContext(UserContext)
    const userDict =  zipIdToName(allUsers)


    return <KeyToValueTable data={mapIdToNameInData(userDict, data)} colOneName={"User"} colTwoName={"Amount($)"}/>
  }
  
  export default UserAmountTable
  
  