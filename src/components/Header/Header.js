import React from 'react'
import styles from './Header.module.css'
import {Navbar, Nav} from 'react-bootstrap'
export default function Header() {
  return (
    <Navbar className={styles.custom_navbar} collapseOnSelect expand="lg">
      <Navbar.Brand href="#home">UK CRIME VISUALISER</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>

        <Nav className={styles.nav_right}>
          <Nav.Link href="#">Map</Nav.Link>
          <Nav.Link href="https://data.police.uk/docs/" target="_blank">Police API</Nav.Link>
          <Nav.Link href="#" target="_blank">Docs</Nav.Link>
          <Nav.Link href="https://github.com/sjohnston00/React-Mapbox-UK-Crime" target="_blank">
          <svg className={styles.gitHub_svg} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <path d="M12.026,2c-5.509,0-9.974,4.465-9.974,9.974c0,4.406,2.857,8.145,6.821,9.465&#x9;c0.499,0.09,0.679-0.217,0.679-0.481c0-0.237-0.008-0.865-0.011-1.696c-2.775,0.602-3.361-1.338-3.361-1.338&#x9;c-0.452-1.152-1.107-1.459-1.107-1.459c-0.905-0.619,0.069-0.605,0.069-0.605c1.002,0.07,1.527,1.028,1.527,1.028&#x9;c0.89,1.524,2.336,1.084,2.902,0.829c0.091-0.645,0.351-1.085,0.635-1.334c-2.214-0.251-4.542-1.107-4.542-4.93&#x9;c0-1.087,0.389-1.979,1.024-2.675c-0.101-0.253-0.446-1.268,0.099-2.64c0,0,0.837-0.269,2.742,1.021&#x9;c0.798-0.221,1.649-0.332,2.496-0.336c0.849,0.004,1.701,0.115,2.496,0.336c1.906-1.291,2.742-1.021,2.742-1.021&#x9;c0.545,1.372,0.203,2.387,0.099,2.64c0.64,0.696,1.024,1.587,1.024,2.675c0,3.833-2.33,4.675-4.552,4.922&#x9;c0.355,0.308,0.675,0.916,0.675,1.846c0,1.334-0.012,2.41-0.012,2.737c0,0.267,0.178,0.577,0.687,0.479&#x9;C19.146,20.115,22,16.379,22,11.974C22,6.465,17.535,2,12.026,2z" fillRule="evenodd"/>
          </svg>
          </Nav.Link>
        </Nav>



      </Navbar.Collapse>
    </Navbar>
    // <nav className={styles.header}>
    //   <h1>UK Crime Visualiser</h1>

    //   <div className={styles.navElements}>

    //     <ul>
    //       <li>
    //         <a href="https://github.com/sjohnston00/React-Mapbox-UK-Crime">
    //           <svg className={styles.gitHub_svg} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M12.026,2c-5.509,0-9.974,4.465-9.974,9.974c0,4.406,2.857,8.145,6.821,9.465&#x9;c0.499,0.09,0.679-0.217,0.679-0.481c0-0.237-0.008-0.865-0.011-1.696c-2.775,0.602-3.361-1.338-3.361-1.338&#x9;c-0.452-1.152-1.107-1.459-1.107-1.459c-0.905-0.619,0.069-0.605,0.069-0.605c1.002,0.07,1.527,1.028,1.527,1.028&#x9;c0.89,1.524,2.336,1.084,2.902,0.829c0.091-0.645,0.351-1.085,0.635-1.334c-2.214-0.251-4.542-1.107-4.542-4.93&#x9;c0-1.087,0.389-1.979,1.024-2.675c-0.101-0.253-0.446-1.268,0.099-2.64c0,0,0.837-0.269,2.742,1.021&#x9;c0.798-0.221,1.649-0.332,2.496-0.336c0.849,0.004,1.701,0.115,2.496,0.336c1.906-1.291,2.742-1.021,2.742-1.021&#x9;c0.545,1.372,0.203,2.387,0.099,2.64c0.64,0.696,1.024,1.587,1.024,2.675c0,3.833-2.33,4.675-4.552,4.922&#x9;c0.355,0.308,0.675,0.916,0.675,1.846c0,1.334-0.012,2.41-0.012,2.737c0,0.267,0.178,0.577,0.687,0.479&#x9;C19.146,20.115,22,16.379,22,11.974C22,6.465,17.535,2,12.026,2z" fillRule="evenodd"/>
    //           </svg>
    //         </a>
    //       </li>
    //       <li><a href="https://google.com">Map</a></li>
    //       <li><a href="https://google.com">Police API</a></li>
    //       <li><a href="https://google.com">Docs</a></li>
    //     </ul>
    //   </div>
    // </nav>
  )
}
