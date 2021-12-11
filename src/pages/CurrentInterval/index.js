import React, { useState, useEffect } from 'react';
import { Row, Col } from '@zendeskgarden/react-grid';
import { fetchLatestInterval } from '../../utils/apis/interval'
import IntervalContext from '../../context/interval'
import AddIncomePage from '../../pages/AddIncomePage'

const CurrentInterval = () => {
  const [interval, setInterval] = useState(null)

  useEffect(() => {
    fetchLatestInterval().then(interval => {
      setInterval(interval)
    })
  }, [])

  return(
    <IntervalContext.Provider value={interval}>
      <AddIncomePage/>
    </IntervalContext.Provider>
  )
}

export default CurrentInterval
