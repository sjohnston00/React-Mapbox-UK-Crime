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
  const [errorMessage, setErrorMessage] = useState('');

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
    setPoliceData(result.data)
    setLoading(false)
  }
  
  const searchPlace = async () => {
    setErrorMessage('');
    const searchParams = searchElem.current.value;
    if (searchParams === '' || searchParams === null) {
      setErrorMessage('You must enter a place');
      return
    }
    //query the api to get places
    setLoading(true)
    const result = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchParams}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
    
    //validate errors
    if (result.data.features.length === 0) {
      setErrorMessage('Not a valid place')
      setLoading(false)
      return 
    }

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
    const filteredPoliceData = policeData.filter(crime => crime.category === chossenCategory.current.value)
    setPoliceData(filteredPoliceData);
    setLoading(false)
  }

  const closeSideBar = () => {
    const viewButton = document.getElementById('viewButton');
    const sidebar = document.getElementById('sidebar');

    sidebar.style.width = '0px'
    sidebar.style.padding = '0px'

    viewButton.style.visibility = 'visible'
  }
  
  const openSideBar = (e) => {
    const viewButton = document.getElementById('viewButton');
    const sidebar = document.getElementById('sidebar');
    sidebar.style.width = '200px'
    sidebar.style.padding = '60px 10px'
    
    viewButton.style.visibility = 'hidden'
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
        <a className="sidebar-button" onClick={openSideBar} id='viewButton'>View</a>
        <div className="config-area" id="sidebar">
          <a href="javascript:void(0)" className="close-button" onClick={closeSideBar}>X</a>
          <div className="config-elements" id="sidebarElements">
            <div className="input-group">
              <label htmlFor="Place">Place </label>
              <label htmlFor="Place"><b className="errorMessage">{errorMessage}</b></label>
              <input 
                type="text" 
                id="Place" 
                name="Place" 
                ref={searchElem}
                placeholder="Search for place..."
                // onEnterPressed toggle search place function
                onKeyUp={(e) => {e.key === 'Enter' && searchPlace()}}
                />
              <button className="search-button" onClick={searchPlace}>Search</button>
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
            <button className="refresh-button" disabled={loading} onClick={refresh}>{loading ? 'Loading...' : 'Refresh'}</button>

            <div className="map-info">
              <p>Number of crimes in area: <b>{policeData.length}</b></p>
              <p>Longitude: <b>{viewport.longitude.toFixed(4)}</b></p>
              <p>Latitude: <b>{viewport.latitude.toFixed(4)}</b></p>
            </div>
          </div>
        </div>
    </ReactMapGl>
    </>
  )
}
