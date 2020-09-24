/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useRef} from 'react'
import ReactMapGl, {Marker, Popup} from 'react-map-gl';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import axios from 'axios';
import { logDOM } from '@testing-library/react';


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
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({lat: null, lng: null})

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
    const searchParams = searchElem.current.props.value;
    if (searchParams === '' || searchParams === null) {
      setErrorMessage('You must enter a place');
      return
    }
    //query the api to get places
    setLoading(true)

    const results = await geocodeByAddress(searchParams)
    const latlng = await getLatLng(results[0]);


    //set the long and lat of the first place to be viewport long and lat
    setViewport({
      ...viewport,
      longitude: latlng.lng,
      latitude: latlng.lat
    })

    await refresh();
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

  const clearMarkers = () => {
    setPoliceData([]);
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
              <div>
                <PlacesAutocomplete value={address} onChange={setAddress} ref={searchElem}>
                  {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                      <input
                        {...getInputProps({ placeholder: 'Search Place Here...'})}
                        onKeyUp={e => {e.key === 'Enter' && searchPlace()}} 
                      />
                      <div>
                        <div>
                          {loading && <div>Loading...</div>}

                          {suggestions.map( suggestion => 
                            {
                              const style = {
                                backgroundColor: suggestion.active ? 'rgba(0,0,0,0.7)' : 'transparent',
                                color: 'white',
                                padding: '5px 10px',
                                borderLeft: '1px solid white',
                                borderRight: '1px solid white',
                                borderBottom: '1px solid white',
                                marginLeft: '5px'
                              }
                              return (
                                <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, {style})}>{suggestion.description}</div>
                              )
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  )} 
                </PlacesAutocomplete>
              </div>
              {/* <input 
                type="text" 
                id="Place" 
                name="Place" 
                ref={searchElem}
                placeholder="Search for place..."
                // onEnterPressed toggle search place function
                onKeyUp={(e) => {e.key === 'Enter' && searchPlace()}}
                />*/}
              <button className="search-button" onClick={searchPlace}>Search</button> 
              <button className="refresh-button" disabled={loading} onClick={refresh}>{loading ? 'Loading...' : 'Refresh'}</button>
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


            <button className="clear-markers-button" onClick={clearMarkers}>Clear Markers</button>


            <div className="map-info">
              <p>Number of crimes in area: <b>{policeData.length}</b></p>
              <p>Longitude: <b>{viewport.longitude.toFixed(4)}</b></p>
              <p>Latitude: <b>{viewport.latitude.toFixed(4)}</b></p>
            </div>
          </div>
        </div>
    </ReactMapGl>



    <div>
      
    </div>
    </>
  )
}
