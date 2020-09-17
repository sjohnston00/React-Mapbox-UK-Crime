import React, {useState, useEffect, useRef} from 'react'
import {PureComponent} from 'react';
import ReactMapGl, {Marker, Popup} from 'react-map-gl';
import axios from 'axios';

export default function Map() {
  const [viewport, setViewport] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
    longitude: -1.548567,
    latitude: 53.801277,
    zoom: 15,
  })
  const [loading, setLoading] = useState(true);
  const [policeData, setPoliceData] = useState([])
  const [selectedCrime, setSelectedCrime] = useState(null)
  const searchElem = useRef(null);
  const chossenCategory = useRef(null);

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
  
  const searchPlace = async () => {
    const searchParams = searchElem.current.value;
    //query the api to get places
    setLoading(true)
    const result = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchParams}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
    const first_result = await result.data.features[0]

    //set the long and lat of the first place to be viewport long and lat
    setViewport({
      ...viewport,
      longitude: first_result.center[0],
      latitude: first_result.center[1]
    })
    //once searched set the textbox to be empty
    searchElem.current.value = ""
    setLoading(false)
  }

  const filterPoliceData = async () => {
    if (chossenCategory.current.value === "all-crime") {
      await refresh();
      return 
    }
    setLoading(true)
    await refresh();
    const newArray = policeData.filter(crime => crime.category === chossenCategory.current.value)
    setPoliceData(newArray);
    setLoading(false)
  }
  
  return (
    <>
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
          onMouseEnter={() => setSelectedCrime(crime)} 
          className="icon-button" 
          onClick={e => {
            e.preventDefault()
            setSelectedCrime(crime);
          }}>
            <img className="icon" src="/marker.svg" alt="Crime icon"/>
          </button>
          </Marker>
        ))}

        {selectedCrime && (
          <Popup
            latitude={Number(selectedCrime.location.latitude)}
            longitude={Number(selectedCrime.location.longitude)} 
            className="popup"
            onClose={() => setSelectedCrime(null)}
          >
            <div>
              <h2>{selectedCrime.category}</h2>
              <p>Location: {selectedCrime.location.street.name}</p>
              {selectedCrime.outcome_status && <p>Outcome: {selectedCrime.outcome_status.category}</p>}
              <i>Date: {selectedCrime.month}</i>
            </div>
          </Popup>
        )}

        <div className="config-area">
          <button className="refresh-button" disabled={loading} onClick={refresh}>{loading ? 'Loading...' : 'Refresh'}</button>
          <div className="input-group">
            <label htmlFor="Place">Place</label>
            <input 
              type="text" 
              id="Place" 
              name="Place" 
              ref={searchElem}
              placeholder="Search for place..."/>
            <button onClick={searchPlace}>Search</button>
          </div>
          <div className="input-group">
            <label htmlFor="Crime">Crime</label>
            <select ref={chossenCategory} onChange={filterPoliceData}>
              <option value="all-crime">All Crime</option>
              <option value="anti-social-behaviour">Anti Social Behaviour</option>
              <option value="bicycle-theft">Bicycle Theft</option>
              <option value="burglary">Burglary</option>
              <option value="criminal-damage-arson">Criminal damage and arson</option>
              <option value="drugs">Drugs</option>
              <option value="other-theft">Other Theft</option>
              <option value="possession-of-weapons">Possession Of Weapons</option>
              <option value="public-order">Public Order</option>
              <option value="robbery">Robbery</option>
              <option value="shoplifting">Shoplifting</option>
              <option value="theft-from-the-person">Theft From The Person</option>
              <option value="vehicle-crime">Vehicle Crime</option>
              <option value="violent-crime">Violent Crime</option>
              <option value="other-crime">Other Crime</option>
            </select>
          </div>

          <div>
            <p>Number of crimes: {policeData.length}</p>
            <p>Longitude: {viewport.longitude.toFixed(4)}</p>
            <p>Latitude: {viewport.latitude.toFixed(4)}</p>
          </div>
        </div>
    </ReactMapGl>
    </>
  )
}
