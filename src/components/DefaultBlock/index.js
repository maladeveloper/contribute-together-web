import React from 'react';
import { Row, Col } from '@zendeskgarden/react-grid';
import styled from 'styled-components';


const DefaultBlock = ({ sm=10, justifyContent='center', topBotMargin=50, children}) =>{
  const SpacedRow = styled(Row)`
    margin: ${topBotMargin}px;
  `
  return(
    <SpacedRow justifyContent={justifyContent} >
      <Col sm={sm}>
        {children} 
      </Col>
    </SpacedRow>
  )
}

export default DefaultBlock
