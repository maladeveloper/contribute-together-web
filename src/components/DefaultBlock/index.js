import React from 'react';
import { Row, Col } from '@zendeskgarden/react-grid';
import styled from 'styled-components';


const DefaultBlock = ({justifyContent='center', topBotMargin=1, children}) =>{
  const SpacedRow = styled(Row)`
  `
  return(
    <SpacedRow justifyContent={justifyContent} >
      <Col >
        {children} 
      </Col>
    </SpacedRow>
  )
}

export default DefaultBlock
