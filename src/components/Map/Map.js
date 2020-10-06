/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useRef} from 'react';
import MapButton from './MapButton/MapButton';
import Sidebar from './Sidebar/Sidebar';
import ReactMapGl, {Marker, Popup} from 'react-map-gl';
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
      <div className={styles.map}>
        <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport => setViewport(viewport))}
        mapStyle="mapbox://styles/sjohnston00/ckf3u6kt90x0j1and9dg4n7cf?optimze=true"
        onClick={() => setSelectedCrime(null)}
        >
          {policeData.map((crime) => (
            <Marker
              key={crime.id}
              latitude={Number(crime.location.latitude)}
              longitude={Number(crime.location.longitude)}
            >
              <button
              className={styles.icon_button}
              onClick={e => {
                e.preventDefault()
                setSelectedCrime(crime);
              }}>
                <svg className={styles.icon} viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
                </svg>

              </button>
            </Marker>
          ))}

          {selectedCrime && (
            <Popup
              latitude={Number(selectedCrime.location.latitude)}
              longitude={Number(selectedCrime.location.longitude)}
              className={styles.popup}
              onClose={() => setSelectedCrime(null)}
            >
              <div>
                <h2>{selectedCrime.category}</h2>
                <p>Location: {selectedCrime.location.street.name}</p>
                {selectedCrime.outcome_status && <p>Outcome: {selectedCrime.outcome_status.category}</p>}
                <i>Date: {selectedCrime.month}</i>
              </div>8
            </Popup>
          )}
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
  )
}
