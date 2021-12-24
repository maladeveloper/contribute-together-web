import React from 'react';
import { Row, Col } from '@zendeskgarden/react-grid';
import styled from 'styled-components';

const SpacedRow = styled(Row)`
  margin: 50px 0px;
`

const DefaultBlock = ({ sm=10, justifyContent='center', children}) =>{
  return(
    <SpacedRow justifyContent={justifyContent} >
      <Col sm={sm}>
        {children} 
      </Col>
    </SpacedRow>
  )
}

export default DefaultBlock
