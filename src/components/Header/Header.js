import React from 'react'
import styles from './Header.module.css'
import {Navbar, Nav} from 'react-bootstrap'
export default function Header() {
  return (
    <Navbar className={styles.custom_navbar} collapseOnSelect expand="lg">
      <Navbar.Brand className={styles.navbar_brand} href="#home">UK Crime Visualiser</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>

        <Nav className={styles.nav_right}>
          <Nav.Link href="#">Map 
          <svg className={styles.header_svg} height="24" width="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6L1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6z"/>
              <path d="M8 2L8 18"/>
	            <path d="M16 6L16 22"/>
            </svg>
          </Nav.Link>
          <Nav.Link href="https://data.police.uk/docs/" target="_blank">Police API
          <svg className={styles.header_svg} fill="none" stroke="currentColor" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeWidth="2"/>
          </svg>
          </Nav.Link>
          <Nav.Link href="https://github.com/sjohnston00/React-Mapbox-UK-Crime#readme" target="_blank">Docs
          <svg className={styles.header_svg} height="24" width="24" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
	          <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" fillRule="evenodd"/>
	          <path d="M8.361 1.17a.51.51 0 0 0-.722 0L4.766 4.044 8 7.278l3.234-3.234L8.361 1.17zm3.595 3.596L8.722 8l3.234 3.234 2.873-2.873c.2-.2.2-.523 0-.722l-2.873-2.873zm-.722 7.19L8 8.722l-3.234 3.234 2.873 2.873c.2.2.523.2.722 0l2.873-2.873zm-7.19-.722L7.278 8 4.044 4.766 1.17 7.639a.511.511 0 0 0 0 .722l2.874 2.873zM6.917.45a1.531 1.531 0 0 1 2.166 0l6.469 6.468a1.532 1.532 0 0 1 0 2.166l-6.47 6.469a1.532 1.532 0 0 1-2.165 0L.45 9.082a1.531 1.531 0 0 1 0-2.165L6.917.45z" fillRule="evenodd"/>
          </svg>
          </Nav.Link>
          <Nav.Link href="https://github.com/sjohnston00/React-Mapbox-UK-Crime" target="_blank">Github
          <svg className={styles.header_svg} height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <path d="M12.026,2c-5.509,0-9.974,4.465-9.974,9.974c0,4.406,2.857,8.145,6.821,9.465&#x9;c0.499,0.09,0.679-0.217,0.679-0.481c0-0.237-0.008-0.865-0.011-1.696c-2.775,0.602-3.361-1.338-3.361-1.338&#x9;c-0.452-1.152-1.107-1.459-1.107-1.459c-0.905-0.619,0.069-0.605,0.069-0.605c1.002,0.07,1.527,1.028,1.527,1.028&#x9;c0.89,1.524,2.336,1.084,2.902,0.829c0.091-0.645,0.351-1.085,0.635-1.334c-2.214-0.251-4.542-1.107-4.542-4.93&#x9;c0-1.087,0.389-1.979,1.024-2.675c-0.101-0.253-0.446-1.268,0.099-2.64c0,0,0.837-0.269,2.742,1.021&#x9;c0.798-0.221,1.649-0.332,2.496-0.336c0.849,0.004,1.701,0.115,2.496,0.336c1.906-1.291,2.742-1.021,2.742-1.021&#x9;c0.545,1.372,0.203,2.387,0.099,2.64c0.64,0.696,1.024,1.587,1.024,2.675c0,3.833-2.33,4.675-4.552,4.922&#x9;c0.355,0.308,0.675,0.916,0.675,1.846c0,1.334-0.012,2.41-0.012,2.737c0,0.267,0.178,0.577,0.687,0.479&#x9;C19.146,20.115,22,16.379,22,11.974C22,6.465,17.535,2,12.026,2z" fillRule="evenodd"/>
          </svg>
          </Nav.Link>
        </Nav>



      </Navbar.Collapse>
    </Navbar>
  )
}
