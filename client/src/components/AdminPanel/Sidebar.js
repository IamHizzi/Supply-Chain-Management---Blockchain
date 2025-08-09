import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io5';
import * as CgIcons from 'react-icons/cg';
import Controls from './controls/Controls'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions'




const Nav = styled.div`
  background: #15171c;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 230px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  overflow-y:auto;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const DashboardLabel = styled(Link)`
    margin-left: 250px;
    font-size: 3rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
`;



const Sidebar = ({auth,logoutUser,setLoginUser}) => {
  const { isAuthenticated, user } = auth;
  const [sidebar, setSidebar] = useState(false);
  const history=useHistory()
  const showSidebar = () => setSidebar(!sidebar);

  

  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
    setLoginUser({})
  }

  const gotoSetting = ()=>{
  }
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <DashboardLabel to='#'>
            <GiIcons.GiTruck/>
          </DashboardLabel>
          <span class="badge badge-light" style={{marginLeft:"25px",color:"white"}}>TMS Dashboard</span>
           
           <span style={{ marginLeft:"56%",fontSize:"2rem"}}
            >
              <IoIcons.IoNotificationsCircleSharp  />
            </span>

            <span>
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '30px', marginLeft: '7px' ,marginTop:'5px' }}
              title=""
            />
            </span>
            <span style={{marginRight:'5%'}}>
            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" style={{color:'white',marginTop:'10px'}}></a>
          <div class="dropdown-menu dropdown-menu-end">
              <a  class="dropdown-item">Profile</a>
              <a  class="dropdown-item" onClick={gotoSetting}>Settings</a>
              <div class="dropdown-divider"></div>
              <a href="" class="dropdown-item" onClick={onLogoutClick}>Logout</a>
          </div>
            </span>
            </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

Sidebar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, { logoutUser })(Sidebar);