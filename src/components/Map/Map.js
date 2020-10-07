/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import MapButton from './MapButton/MapButton';
import Sidebar from './Sidebar/Sidebar';
import Markers from './Markers/Markers';
import ReactMapGl, { Popup} from 'react-map-gl';
import axios from 'axios';
import styles from './Map.module.css';


export default function Map() {
  const [viewport, setViewport] = useState({
    height: '100%',
    width: '100%',
    longitude: 0.5557,
    latitude: 52.4016,
    zoom: 15,
  })
  const [loading, setLoading] = useState(true);
  const [policeData, setPoliceData] = useState([])
  const [selectedCrime, setSelectedCrime] = useState(null)

  useEffect(() => {
    //get the current users location with permision
    navigator.geolocation.getCurrentPosition(pos => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    });
    setLoading(true)
    const fetchresult = async () => {
      const result = await axios(`https://data.police.uk/api/crimes-street/all-crime?lat=${viewport.latitude}&lng=${viewport.longitude}`,)
      await setPoliceData(result.data)
      setLoading(false)
    }
    fetchresult();
    }, []);

  return (
   <> 
    <h1 className={styles.map_heading}>Our Map</h1>
    <div className={styles.map}>
      <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(viewport => setViewport(viewport))}
      mapStyle="mapbox://styles/sjohnston00/ckfzik7uk19n419nyty2pubtj?optimze=true"
      onClick={() => setSelectedCrime(null)}
      >
        <Markers 
          policeData={policeData} 
          setSelectedCrime={setSelectedCrime} 
          selectedCrime={selectedCrime}
        />

        <MapButton/>

        <Sidebar 
          loading={loading} 
          setLoading={setLoading} 
          policeData={policeData} 
          setPoliceData={setPoliceData} 
          viewport={viewport}
          setViewport={setViewport}
        />
      </ReactMapGl>
      </div>  
    </>
  )
}
