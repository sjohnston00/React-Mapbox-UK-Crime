import React from 'react';
import Map from './components/Map'
import Header from './components/Header/Header'

function App() {
  return (
    <>
    <Header/>
    <h1 style={{textAlign: 'center', marginTop: '30px', fontSize: '50px'}}>Our Map</h1>
    <Map></Map>
    </>
  );
}

export default App;
