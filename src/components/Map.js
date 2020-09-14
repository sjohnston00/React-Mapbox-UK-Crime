import React, {useState, useEffect} from 'react'
import ReactMapGl, {Marker} from 'react-map-gl';
import axios from 'axios';

export default function Map() {
  const [viewport, setViewport] = useState({
    height: '100vh',
    width: '100vw',
    longitude: -1.548567,
    latitude: 53.801277,
    zoom: 15,
  })

  const [policeData, setPoliceData] = useState([])

  useEffect(() => {
    const fetchresult = async () => {
      const result = await axios(`https://data.police.uk/api/crimes-street/all-crime?lat=${viewport.latitude}&lng=${viewport.longitude}`,)
      await setPoliceData(result.data)
    }
    fetchresult();
}, []);

  return (
    <>
    <ReactMapGl 
    {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onViewportChange={(viewport => setViewport(viewport))}
    >

    {policeData.map((crime, i) => (
      <Marker
        key={crime.id}
        latitude={Number(crime.location.latitude)}
        longitude={Number(crime.location.longitude)}
      >
      <button className="icon-button">
        <img className="icon" src="/marker.svg" alt="Crime icon"/>
      </button>
      </Marker>
    ))}
      <button className="refresh-button">Refresh</button>

    </ReactMapGl>
    </>
  )
}
