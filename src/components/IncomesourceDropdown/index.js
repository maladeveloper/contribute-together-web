import React, { useState, useEffect } from 'react';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Inline } from '@zendeskgarden/react-loaders';
import { Dropdown, Field, Menu, Item, Hint, Select, Label, Message } from '@zendeskgarden/react-dropdowns';
import { fetchIncomeSources } from '../../utils/apis/income'
import DefaultBlock from '../DefaultBlock'


const IncomesourceDropdown = ({ userId, setLoading, onChange, errors }) => {
  const [incomeSources, setIncomeSources] = useState(null)
  const [selectedSource, setSelectedSource] = useState(null);

  useEffect(() => {
    setLoading(true)
    setSelectedSource(null)
    setIncomeSources(null)
    onChange(null)
    fetchIncomeSources(userId).then(incomeSources =>{
      setIncomeSources(incomeSources)
      setLoading(false)
    })
  }, [ userId ])

  const triggerSelectActions = (source) => {
    onChange(source.id)
    setSelectedSource(source)
  }

  return(
    <DefaultBlock justifyContent={"start"} sm={5}>
        { incomeSources &&
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
        }
        { !incomeSources && <Inline size={32} color={PALETTE.blue[600]} />}
    </DefaultBlock>
  )
}

export default IncomesourceDropdown
