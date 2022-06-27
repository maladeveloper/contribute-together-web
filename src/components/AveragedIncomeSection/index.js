import UserAmountTable from '../UserAmountsTable'
import { MD, XXL } from '@zendeskgarden/react-typography';
import { Paragraph } from '@zendeskgarden/react-typography';

const AveragedIncomeInfo = () =>(
  <div style={{marginTop:'2%', marginBottom:'2%'}}>
    <XXL>{"Averaged Income"}</XXL>
    <Paragraph>
      <MD tag="span"> { "The averaged income over 2 periods (4 weeks) for each user."} </MD>
    </Paragraph>
  </div>
)


const AveragedIncomeSection = ({ averagedIncome }) =>{
  return(
    <>
      <AveragedIncomeInfo />
      <UserAmountTable data={averagedIncome}/>
    </>
  )
}

export default AveragedIncomeSection
