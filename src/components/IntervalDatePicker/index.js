import React, { useState, useContext } from 'react';
import { Datepicker } from '@zendeskgarden/react-datepickers';
import { Field, Label, Hint, Input, Message } from '@zendeskgarden/react-forms';
import { Row, Col } from '@zendeskgarden/react-grid';
import IntervalContext from '../../context/interval'
import styled from 'styled-components';
import moment from 'moment';

const SpacedRow = styled(Row)`
  margin: 50px 0px;
`

const IntervalDatePicker = ({ onChange, errors }) => {
  const { startDate, endDate } = useContext(IntervalContext)
  const [ chosenDate, setChosenDate] = useState(null)
  const formatDate = (date) => moment(date, "YYYY-MM-DD").toDate() 
  const sendDate = ( date ) => {
    onChange(moment(date).format("YYYY-MM-DD"))
    setChosenDate(date)
  }

  return(
      
        <SpacedRow justifyContent="start">
          <Col sm={5}>
            <Field>
              <Label>Date</Label>
              <Hint>The date the income was recieved</Hint>
              <Datepicker 
                value={chosenDate ? formatDate(chosenDate) : chosenDate} 
                onChange={sendDate}
                minValue={formatDate(startDate)} 
                maxValue={formatDate(endDate)}
              >
                <Input validation={errors?.date && 'error'}  />
              </Datepicker>
            </Field>
            {errors?.date && <Message validation="error">Must provide a date</Message>}
          </Col>
        </SpacedRow>
  )
}

export default IntervalDatePicker
