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
  const [loading, setLoading] = useState(true);
  const [policeData, setPoliceData] = useState([])

  useEffect(() => {
    setLoading(true)
    const fetchresult = async () => {
      const result = await axios(`https://data.police.uk/api/crimes-street/all-crime?lat=${viewport.latitude}&lng=${viewport.longitude}`,)
      await setPoliceData(result.data)
      setLoading(false)
    }
    fetchresult();
}, []);

  const refresh = async () => {
    setLoading(true)
    const result = await axios(`https://data.police.uk/api/crimes-street/all-crime?lat=${viewport.latitude}&lng=${viewport.longitude}`,)
    await setPoliceData(result.data)
    setLoading(false)
  }
  
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
    <div className="config-area">
      <button className="refresh-button" disabled={loading} onClick={refresh}>{loading ? 'Loading...' : 'Refresh'}</button>
      <div className="input-group">
        <label htmlFor="Place">Place</label>
        <input type="text" id="Place" name="Place" placeholder="Search for place..."></input>
      </div>
      <div className="input-group">
        <label htmlFor="Crime">Crime</label>
        <select>
          <option value="All-Crime">All Crime</option>
          <option value="Bicycle-Theft">Bicycle-Theft</option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </div>

    </div>

    </ReactMapGl>
    </>
  )
}
