import React from 'react'
import styles from './Info.module.css'
import { Card, Row, Col } from 'react-bootstrap';

export default function Info() {
  return (
    <section className={styles.infoSection}>
        <Row className="d-flex justify-content-center">
          <Col sm={12} md={6} lg={4}>
            <Card className={styles.Infocard}>
              <Card.Img variant="left" src="UsingTheMap.gif" alt="Using the map. gif" height="250" width="auto"></Card.Img>
              <Card.Body>
                <Card.Title>
                <svg className={styles.info_svg} height="20" width="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
	                <path d="M7.106 15.553L.553 12.276A1 1 0 0 1 0 11.382V9.471a1 1 0 0 1 .606-.89L6 6.269v1.088L1 9.5l5.658 2.83a3 3 0 0 0 2.684 0L15 9.5l-5-2.143V6.27l5.394 2.312a1 1 0 0 1 .606.89v1.911a1 1 0 0 1-.553.894l-6.553 3.277a2 2 0 0 1-1.788 0z"/>
	                <path d="M7.5 9.5v-6h1v6h-1z" fillRule="evenodd"/>
                  <path d="M10 9.75c0 .414-.895.75-2 .75s-2-.336-2-.75S6.895 9 8 9s2 .336 2 .75zM10 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                </svg>
                  Using the map
                </Card.Title>
                <Card.Text>
                Using the map is a easy and comfortable any other well know digital maps. 
                <p className={styles.card_subheading}>Controls:</p>
                Scroll or use zooming buttons to <b>Zoom</b> (On mobile devices you can use 2 fingers to pinch and zoom) <br/>
                Click or touch and drag to <b>pan</b> around the map <br/>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={4}>
            <Card className={styles.Infocard}>
              <Card.Img variant="left" src="UsingSearch.gif" height="250" width="auto"></Card.Img>
              <Card.Body>
                <Card.Title>
                <svg className={styles.info_svg} height="20" width="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	                <circle cx="12" cy="12" r="3"/>
	                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                  Using the configure area
                </Card.Title>
                <Card.Text>
                You can access this area by pressing the button on the top left corner of the map. By doing this you will open 
                the configure menu from the side. <br/>
                <p className={styles.card_subheading}>Configuring the map:</p>
                Searching for places is a really useful feature for finding information about the area you live in or a particular area in the UK<br/>
                Pressing the refresh button gets the new information about the area you are looking at<br/>
                Accessing the list of the categories on the page will allow you to filter the crimes on the map to that particular category<br/>
                If you are getting too flustered with all the data on the screen you can always clear everything from the map and cofigure area to start fresh.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={4}>
            <Card className={styles.Infocard}>
              <Card.Img variant="left" src="MarkerPopup.gif" height="250" width="auto"></Card.Img>
              <Card.Body>
                <Card.Title>
                <svg className={styles.info_svg} fill="none" height="20" width="20" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeWidth="2"/>
                </svg>
                  Accessing information about a crime
                </Card.Title>
                <Card.Text>
                Once you have populated your map with markers of crimes in that area you can then click on that markers to find more information about that crime.<br/>
                Each crime popup will show its location, the category it falls under, the date (to the nearest month) and the current status of that crime
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </section>
  )
}
