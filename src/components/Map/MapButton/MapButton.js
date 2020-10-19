import React from 'react';
import styles from './MapButton.module.css';
import {Button} from '@material-ui/core';

export default function MapButton() {
  
  const openSideBar = () => {
    const viewButton = document.getElementById('viewButton');
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth < 900) {
      sidebar.style.width = '100%'
    }
    else {
      sidebar.style.width = '250px'
      
    }
    sidebar.style.padding = '60px 10px'

    viewButton.style.display = 'none'
  }
  return (
    <Button className={styles.sidebar_button}  onClick={openSideBar} variant="contained" color="primary" id='viewButton'>Configure</Button>
  )
}
