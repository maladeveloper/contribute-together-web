import React, { useState, useEffect } from 'react';
import CurrentInterval from '../CurrentInterval'
import PreviousPayments from '../PreviousPayments'
import UserContext from '../../context/users'
import { fetchAllUsers } from '../../utils/apis/admin'
import styled from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { XXL, MD } from '@zendeskgarden/react-typography';
import { PALETTE } from '@zendeskgarden/react-theming';
import { ReactComponent as ProductIcon } from '@zendeskgarden/svg-icons/src/26/garden.svg';
import { ReactComponent as HomeIcon } from '@zendeskgarden/svg-icons/src/26/home-fill.svg';
import { ReactComponent as ClockIcon } from '@zendeskgarden/svg-icons/src/26/clock.svg';
import { ReactComponent as SettingsIcon } from '@zendeskgarden/svg-icons/src/26/settings-fill.svg';
import { ReactComponent as ZendeskIcon } from '@zendeskgarden/svg-icons/src/26/zendesk.svg';
import { ReactComponent as MenuTrayIcon } from '@zendeskgarden/svg-icons/src/16/grid-2x2-stroke.svg';
import { ReactComponent as PersonIcon } from '@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg';
import {
  Chrome,
  Body,
  Content,
  Main,
  Header,
  HeaderItem,
  HeaderItemIcon,
  HeaderItemText,
  Footer,
  FooterItem,
  Nav,
  NavItem,
  NavItemIcon,
  NavItemText,
  Sidebar,
  SkipNav
} from '@zendeskgarden/react-chrome';


const chooseShowPage = (showpageId) => {
  switch (showpageId) {
    case 'nav-1':
      return <CurrentInterval/>
    case 'nav-2':
      return <PreviousPayments/>

  }
}

const HomePage = () => {
  const [users, setUsers] = useState(null)
  const [nav, setNav] = useState('nav-1');
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
                <HomeIcon />
              </NavItemIcon>
              <NavItemText>Current Interval</NavItemText>
            </NavItem>
            <NavItem isCurrent={nav === 'nav-2'} onClick={() => setNav('nav-2')}>
              <NavItemIcon>
                <ClockIcon />
              </NavItemIcon>
              <NavItemText>Previous Payments</NavItemText>
            </NavItem>
          </Nav>
      <div style={{marginLeft:'20px', width:'90%', marginTop:'3%'}}>
        <UserContext.Provider value={users}>
          {chooseShowPage(nav)}
        </UserContext.Provider>
      </div>

    </div>
  )
}

export default HomePage
