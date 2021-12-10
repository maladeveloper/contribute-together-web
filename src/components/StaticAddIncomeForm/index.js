import React from 'react';
import { Field, Label, Hint, Input, Message } from '@zendeskgarden/react-forms';
import { useForm, Controller  } from "react-hook-form";
import { Button } from '@zendeskgarden/react-buttons';
import { Row, Col } from '@zendeskgarden/react-grid';
import styled from 'styled-components';
import IntervalDatePicker from '../IntervalDatePicker'
import IncomesourceDropdown from '../IncomesourceDropdown'

const SpacedRow = styled(Row)`
  margin: 50px 0px;
`

const IncomesourceInput = ({control, errors, userId} ) => (
  < Controller
    control = {control}
    rules={{ required: true }}
    name= "incomesource"
    render={({ field: { onChange } }) =>(
    <IncomesourceDropdown onChange={onChange} userId={userId} errors={errors} />
    )}
  />
)
const DateInput = ({control, errors, startDate, endDate} ) => (
  < Controller
    control = {control}
    rules={{ required: true }}
    name= "date"
    render={({ field: { onChange } }) =>(
    <IntervalDatePicker onChange={onChange} errors={errors} startDate={startDate} endDate={endDate} />
    )}
  />
)

const AmountInput = ({register, errors}) =>(
  <SpacedRow justifyContent="start">
    <Col sm={1.5}>
      <Field>
        <Label>Amount</Label>
        <Hint>The money amount earned</Hint>
        <Input {...register("amount",{ required: true, pattern:/^[0-9]*$/, max:10000, min:0 }) } validation={errors.amount && 'error'} />
      </Field>
      {errors.amount && <Message validation="error">Must provide a number between 0 and 10,000</Message>}
    </Col>
  </SpacedRow>
)

const SubmitButton = () => (
  <SpacedRow justifyContent="start">
    <Col sm={4}>
     <Button type='submit'>Submit</Button>
    </Col>
  </SpacedRow>
)

const StaticAddIncomeForm = ({ userId='MAL0001' }) => {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IncomesourceInput errors={errors} userId={userId} control={control} />
        <DateInput errors={errors} control={control} />
        <AmountInput errors={errors} register={register} />
        <SubmitButton/>
      </form>
    </div>
  );
}

export default StaticAddIncomeForm
