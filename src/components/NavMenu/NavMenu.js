import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './styleNavMenu.module.css'

export default function NavMenu(){
    return(
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto w-100 justify-content-between">
          <div>
            <NavLink 
            className={styles.menuItem}
            activeClassName={styles.active}
            to="/"
            exact>Home</NavLink>
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
        </Nav>
      </Navbar>
    );
};