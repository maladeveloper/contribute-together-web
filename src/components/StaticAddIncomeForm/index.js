import React, { useState } from 'react';
import { Field, Label, Hint, Input, Message } from '@zendeskgarden/react-forms';
import { useForm, Controller  } from "react-hook-form";
import { Button } from '@zendeskgarden/react-buttons';
import IntervalDatePicker from '../IntervalDatePicker'
import IncomesourceDropdown from '../IncomesourceDropdown'
import { postNewIncome } from '../../utils/apis/income'



const IncomesourceInput = ({control, errors, userId, setLoading} ) => (
  <div style={{marginBottom:'3%'}}>
    < Controller
      control = {control}
      rules={{ required: true }}
      name= "incomesource"
      render={({ field: { onChange } }) =>(
      <IncomesourceDropdown onChange={onChange} userId={userId} errors={errors} setLoading={setLoading}/>
      )}
    />
  </div>
)
const DateInput = ({control, errors } ) => (
  <div style={{marginBottom:'3%'}}>
    < Controller
      control = {control}
      rules={{ required: true }}
      name= "date"
      render={({ field: { onChange } }) =>(
      <IntervalDatePicker onChange={onChange} errors={errors} />
      )}
    />
  </div>
)

const AmountInput = ({register, errors}) =>(
  <div style={{marginBottom:'3%'}}>
      <Field>
        <Label>Amount</Label>
        <Hint>The money amount earned</Hint>
        <Input {...register("amount",{ required: true, pattern:/^[0-9]*$/, max:10000, min:0 }) } validation={errors.amount && 'error'} />
      </Field>
      {errors.amount && <Message validation="error">Must provide a number between 0 and 10,000</Message>}
  </div>
)

const SubmitButton = () => (
  <div>
     <Button type='submit'>Submit</Button>
  </div>
)

const StaticAddIncomeForm = ({ userId='MAL0001', exitAddForm=()=>{} }) => {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const [ isLoading, setLoading ] = useState(true)

  const onSubmit = data => {
    postNewIncome(data).then(response => { exitAddForm() })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IncomesourceInput errors={errors} userId={userId} control={control} setLoading={setLoading}/>
        { !isLoading &&
          <>
            <DateInput errors={errors} control={control} />
            <AmountInput errors={errors} register={register} />
            <SubmitButton/>
          </>
        }
      </form>
    </div>
  );
}

export default StaticAddIncomeForm
