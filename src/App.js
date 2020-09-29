import React from 'react';
import Map from './components/Map'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Info from "./components/Middle Section/Info/Info";

function App() {
  return (
    <>
    <Header/>
    <Info/>
    <h1 style={{textAlign: 'center', marginTop: '30px', fontSize: '50px'}}>Our Map</h1>
    <Map></Map>
    <Footer/>
    </>
  );
}

export default App;
