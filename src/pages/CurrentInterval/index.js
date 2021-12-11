import React, { useState, useEffect } from 'react';
import { Row, Col } from '@zendeskgarden/react-grid';
import { fetchLatestInterval } from '../../utils/apis/interval'
import IntervalContext from '../../context/interval'
import AddIncomePage from '../../pages/AddIncomePage'
import CurrentIntervalStatus from '../../components/CurrentIntervalStatus'

const CurrentInterval = () => {
  const [interval, setInterval] = useState(null)

  useEffect(() => {
    fetchLatestInterval().then(interval => {
      setInterval(interval)
    })
  }, [])

  return(
    <>
      { interval &&
          <IntervalContext.Provider value={interval}>
            {<CurrentIntervalStatus/>}
            {false &&<AddIncomePage/>}
          </IntervalContext.Provider>
      }
      {!interval && <div>Loading</div>}
    </>
  )
}

export default CurrentInterval
