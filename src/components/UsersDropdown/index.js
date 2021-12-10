import React, { useState, useEffect } from 'react';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Inline } from '@zendeskgarden/react-loaders';
import { Row, Col } from '@zendeskgarden/react-grid';
import { Dropdown, Field, Menu, Item, Hint, Select, Label } from '@zendeskgarden/react-dropdowns';
import { fetchAllUsers } from '../../utils/apis/admin'
import styled from 'styled-components';

const SpacedRow = styled(Row)`
  margin: 50px 0px;
`
const UsersDropdown = ({ selectedUser, setSeletedUser }) => {
  const [ allUsers, setAllUsers ] = useState(null)

  useEffect(() => {
    fetchAllUsers().then(users =>{
      setAllUsers(users)
    })
  }, [])


  return(
    <>
    {!allUsers && <Inline size={32} color={PALETTE.blue[600]} />}
    { allUsers &&
      <SpacedRow justifyContent="start">
        <Col sm={5}>
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
        </Col>
      </SpacedRow>
    }
    </>
  )
}

export default UsersDropdown
