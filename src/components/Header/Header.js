import React from "react";
import styles from "./Header.module.css";
import { Navbar, Nav } from "react-bootstrap";
import { DiamondIcon, DocIcon, GitHubIcon, MapIcon } from "../Icons";
export default function Header() {
  return (
    <Navbar className={styles.custom_navbar} collapseOnSelect expand='lg'>
      <Navbar.Brand className={styles.navbar_brand} href='#home'>
        UK Crime Visualiser
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'></Nav>
        <Nav className={styles.nav_right}>
          <Nav.Link href='#'>
            Map
            <MapIcon />
          </Nav.Link>
          <Nav.Link href='https://data.police.uk/docs/' target='_blank'>
            Police API
            <DocIcon />
          </Nav.Link>
          <Nav.Link
            href='https://github.com/sjohnston00/React-Mapbox-UK-Crime#readme'
            target='_blank'>
            Docs
            <DiamondIcon />
          </Nav.Link>
          <Nav.Link
            href='https://github.com/sjohnston00/React-Mapbox-UK-Crime'
            target='_blank'>
            Github
            <GitHubIcon />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
