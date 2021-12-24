import React, { useContext } from 'react';
import { Dropdown, Field, Menu, Item, Hint, Select, Label } from '@zendeskgarden/react-dropdowns';
import UserContext from '../../context/users'
import DefaultBlock from '../DefaultBlock'

const UsersDropdown = ({ selectedUser, setSeletedUser }) => {
  const allUsers =  useContext(UserContext)

  return(
    <>
    { allUsers &&
      <DefaultBlock justifyContent={"start"} sm={5}>
          <Dropdown
             selectedItem={selectedUser}
             onSelect={setSeletedUser}
             downshiftProps={{ itemToString: (item) => item && item.name }}
              >
                <Field>
                  <Label>User</Label>
                  <Hint> {'Select the user for which to add the income'}</Hint>
                  <Select >{selectedUser?.name}</Select>
                </Field>
                <Menu>
                  {
                    allUsers.map(option => (
                     <Item key={option.id} value={option}>
                        <span>{option.name}</span>
                      </Item>
                    ))
                  }
                </Menu>
          </Dropdown>
      </DefaultBlock>
    }
    </>
  )
}

export default UsersDropdown
