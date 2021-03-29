import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './styleNavMenu.module.css';
import {connect} from 'react-redux';
import {logout} from '../../helpers/auth';

function NavMenu(props){
    return(
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto w-100 justify-content-between">
          <div>
            {props.isAuthenticated &&
              <NavLink 
              className={styles.menuItem}
              activeClassName={styles.active}
              to="/"
              exact>Home</NavLink>
            }
            <NavLink 
            className={styles.menuItem}
            activeClassName={styles.active}
            to="/about"
            exact>About</NavLink>
            <NavLink 
            className={styles.menuItem}
            activeClassName={styles.active}
            to="/contact"
            exact>Contact us</NavLink>
          </div>

          {props.isAuthenticated ? 
            <button className={styles.logoutBtn}
            onClick={() => logout()}
            >
              Log out
            </button> :
            <div>
              <NavLink 
              className={styles.menuItem}
              activeClassName={styles.active}
              to="/login"
              exact>Login</NavLink>
              <NavLink 
              className={styles.menuItem}
              activeClassName={styles.active}
              to="/register"
              exact>Register</NavLink>
            </div> 
          }

        </Nav>
      </Navbar>
    );
};

const mapStateToProps = (state)=>{
  return {
    isAuthenticated: state.isAuthenticated
  }
}

const mapDispatchToProps = {
  logout: logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);