import React from 'react'
import styles from './Info.module.css'
import { Card, Row, Col } from 'react-bootstrap';

export default function Info() {
  return (
    <section className={styles.infoSection}>
      <Row className="d-flex justify-content-center">
        <Col>
          <Card className={styles.Infocard}>
            <Card.Img variant="left" src="https://via.placeholder.com/150" height="150"></Card.Img>
            <Card.Body>
              <Card.Title>Using The Map (GIF Above)</Card.Title>
              <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque eget quam id egestas. 
              In orci sem, convallis in elit at, rhoncus ultricies metus. 
              Vivamus tempor ex vel mollis vehicula. Fusce tristique ornare risus. Ut at augue arcu. 
              Proin pellentesque lobortis augue. Sed ultricies ullamcorper ligula, at bibendum neque tincidunt eget. 
              Vestibulum convallis, lacus quis malesuada consequat, lectus orci bibendum libero, vel consectetur arcu nulla et nisl. 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className={styles.Infocard}>
            <Card.Img variant="left" src="https://via.placeholder.com/150"></Card.Img>
            <Card.Body>
              <Card.Title>Limitations (GIF Above)</Card.Title>
              <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque eget quam id egestas. 
              In orci sem, convallis in elit at, rhoncus ultricies metus. 
              Vivamus tempor ex vel mollis vehicula. Fusce tristique ornare risus. Ut at augue arcu. 
              Proin pellentesque lobortis augue. Sed ultricies ullamcorper ligula, at bibendum neque tincidunt eget. 
              Vestibulum convallis, lacus quis malesuada consequat, lectus orci bibendum libero, vel consectetur arcu nulla et nisl. 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className={styles.Infocard}>
            <Card.Img variant="left" src="https://via.placeholder.com/150"></Card.Img>
            <Card.Body>
              <Card.Title>Feedback (GIF Above)</Card.Title>
              <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque eget quam id egestas. 
              In orci sem, convallis in elit at, rhoncus ultricies metus. 
              Vivamus tempor ex vel mollis vehicula. Fusce tristique ornare risus. Ut at augue arcu. 
              Proin pellentesque lobortis augue. Sed ultricies ullamcorper ligula, at bibendum neque tincidunt eget. 
              Vestibulum convallis, lacus quis malesuada consequat, lectus orci bibendum libero, vel consectetur arcu nulla et nisl. 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  )
}
