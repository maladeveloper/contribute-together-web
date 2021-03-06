import React, { useState, useEffect } from 'react';
import CurrentInterval from '../CurrentInterval'
import PreviousPayments from '../PreviousPayments'
import ConfigurationsPage from '../ConfigurationsPage'
import UserContext from '../../context/users'
import MetricsPage from '../MetricsPage'
import { fetchAllUsers } from '../../utils/apis/admin'
import { PALETTE } from '@zendeskgarden/react-theming';
import { ReactComponent as ProductIcon } from '@zendeskgarden/svg-icons/src/26/garden.svg';
import { ReactComponent as FlagIcon } from '@zendeskgarden/svg-icons/src/16/flag-fill.svg';
import { ReactComponent as ClockIcon } from '@zendeskgarden/svg-icons/src/26/clock.svg';
import { ReactComponent as AdjustIcon } from '@zendeskgarden/svg-icons/src/16/adjust-stroke.svg';
import { ReactComponent as GraphIcon } from '@zendeskgarden/svg-icons/src/26/bar-chart.svg';
import { ReactComponent as ChevronRight } from '@zendeskgarden/svg-icons/src/16/chevron-double-right-stroke.svg';
import { ReactComponent as ChevronLeft } from '@zendeskgarden/svg-icons/src/16/chevron-double-left-stroke.svg';
import {
  Nav,
  NavItem,
  NavItemIcon,
  NavItemText,
} from '@zendeskgarden/react-chrome';


const chooseShowPage = (showpageId) => {
  switch (showpageId) {
    case 'nav-1':
      return <CurrentInterval/>
    case 'nav-2':
      return <PreviousPayments/>
    case 'nav-3':
      return <ConfigurationsPage/>
    case 'nav-4':
      return <MetricsPage/>
    default: return <ConfigurationsPage/>

  }
}

const HomePage = () => {
  const [users, setUsers] = useState(null)
  const [nav, setNav] = useState('nav-4');
  const [isExpanded, setIsExpanded] = useState(false)


  useEffect(() => {
    fetchAllUsers().then(usersData => {
      setUsers(usersData)
    })
  }, [])
  
  return(
    <div style={{display:'flex', justifyContent:'flex-start'}}>
        <Nav isExpanded={isExpanded}>   
            <NavItem hasLogo>
              <NavItemIcon>
                <ProductIcon style={{ color: PALETTE.green[400] }} />
              </NavItemIcon>
              <NavItemText>Zendesk Garden</NavItemText>
            </NavItem>
            <NavItem isCurrent={nav === 'nav-1'} onClick={() => setNav('nav-1')}>
              <NavItemIcon>
                <FlagIcon />
              </NavItemIcon>
              <NavItemText>Current Interval</NavItemText>
            </NavItem>
            <NavItem isCurrent={nav === 'nav-2'} onClick={() => setNav('nav-2')}>
              <NavItemIcon>
                <ClockIcon />
              </NavItemIcon>
              <NavItemText>Previous Payments</NavItemText>
            </NavItem>
            <NavItem isCurrent={nav === 'nav-3'} onClick={() => setNav('nav-3')}>
              <NavItemIcon>
                <AdjustIcon />
              </NavItemIcon>
              <NavItemText>Configurations</NavItemText>
            </NavItem>
            <NavItem isCurrent={nav === 'nav-4'} onClick={() => setNav('nav-4')}>
              <NavItemIcon>
                <GraphIcon />
              </NavItemIcon>
              <NavItemText>Metrics</NavItemText>
            </NavItem>
            <NavItem onClick={() => setIsExpanded(!isExpanded)}>
              <NavItemIcon>
              { isExpanded
                ?<ChevronLeft />
                :<ChevronRight />
              }
                
              </NavItemIcon>
            </NavItem>
          </Nav>
      <div style={{marginLeft:'20px', width:'95%', marginTop:'3%'}}>
        <UserContext.Provider value={users}>
          {chooseShowPage(nav)}
        </UserContext.Provider>
      </div>

    </div>
  )
}

export default HomePage
