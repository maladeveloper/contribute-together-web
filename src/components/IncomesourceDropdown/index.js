import React, { useState, useEffect } from 'react';
import { Row, Col } from '@zendeskgarden/react-grid';
import { Dropdown, Field, Menu, Item, Hint, Select, Label, Message } from '@zendeskgarden/react-dropdowns';
import { fetchIncomeSources } from '../../utils/apis/income'
import styled from 'styled-components';

const SpacedRow = styled(Row)`
  margin: 50px 0px;
`

const IncomesourceDropdown = ({ userId, onChange, errors }) => {
  const [incomeSources, setIncomeSources] = useState(null)
  const [selectedSource, setSelectedSource] = useState(null);

  useEffect(() => {
    setSelectedSource(null)
    onChange(null)
    fetchIncomeSources(userId).then(incomeSources =>{
      setIncomeSources(incomeSources)
    })
  }, [ userId ])

  const triggerSelectActions = (source) => {
    onChange(source.id)
    setSelectedSource(source)
  }

  return(
    <SpacedRow justifyContent="start">
      <Col sm={5}>
        { incomeSources
          ?
          <>
           <Dropdown
              selectedItem={selectedSource}
              onSelect={triggerSelectActions}
              downshiftProps={{ itemToString: (item) => item && item.name }}
               >
                 <Field>
                   <Label> Income Source </Label>
                   <Hint> {'The source i.e employment from which the income was received'} </Hint>
                   <Select validation={errors.incomesource && "error"}>{selectedSource?.name}</Select>
                   {errors.incomesource && <Message validation="error">Must choose an Income Source</Message>}
                 </Field>
                 <Menu>
                   {
                     incomeSources.map(option => (
                      <Item key={option.id} value={option}>
                         <span>{option.name}</span>
                       </Item>
                     ))
                   }
                 </Menu>
           </Dropdown>
          </>
          :
          <div> loading </div>
        }
      </Col>
    </SpacedRow>
  )
}

export default IncomesourceDropdown
