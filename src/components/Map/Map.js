/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useRef} from 'react'
import ReactMapGl, {Marker, Popup} from 'react-map-gl';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import axios from 'axios';
import styles from './Map.module.css'


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
  const searchElem = useRef(null);
  const chossenCategory = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [address, setAddress] = useState('');
  useEffect(() => {
    //get the current users location with permision
    navigator.geolocation.getCurrentPosition(pos => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
      refresh()
    });
    setLoading(true)
    const fetchresult = async () => {
      const result = await axios(`https://data.police.uk/api/crimes-street/all-crime?lat=${viewport.latitude}&lng=${viewport.longitude}`,)
      await setPoliceData(result.data)
      setLoading(false)
    }
    fetchresult();

    //get the users
    }, []);

  const refresh = async () => {
    setLoading(true)
    const result = await axios(`https://data.police.uk/api/crimes-street/all-crime?lat=${viewport.latitude}&lng=${viewport.longitude}`,)
    setPoliceData(result.data)
    setLoading(false)
  }

  const searchPlace = async () => {
    setErrorMessage('');
    setPoliceData([]);
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
      zoom: 12,
      longitude: latlng.lng,
      latitude: latlng.lat
    })

    //try and refresh the data once the user has been placed in the area
    // await setTimeout(async () => {
    //   await refresh();
    // }, 5000);

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
    setLoading(true)
    setPoliceData([]);
    setLoading(false)
  }

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
            </div>
          </Popup>
        )}
        <a className={styles.sidebar_button} onClick={openSideBar} id='viewButton'>View</a>
        <div className={styles.config_area} id="sidebar">
          <a href="javascript:void(0)" className={styles.close_button} onClick={closeSideBar}>X</a>
          <div className={styles.config_elements} id="sidebarElements">
            <div className={styles.input_group}>
              <label htmlFor="Place">Place </label>
              <label htmlFor="Place"><b className={styles.error_Message}>{errorMessage}</b></label>
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
              {loading ?
              <div className="d-flex justify-content-center">
                <svg height="24" width="24" className={styles.loading_icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	                <path d="M12,22c5.421,0,10-4.579,10-10h-2c0,4.337-3.663,8-8,8s-8-3.663-8-8c0-4.336,3.663-8,8-8V2C6.579,2,2,6.58,2,12 C2,17.421,6.579,22,12,22z"/>
                </svg>
                </div>
                :
                <div>
                  <button className={styles.search_button} onClick={searchPlace}>Search</button>
                  <button className={styles.refresh_button} disabled={loading} onClick={refresh}>{loading ? 'Loading...' : 'Refresh'}</button>
                </div>
              }

            </div>

            <div className={styles.input_group}>
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


            <button className={styles.clear_markers_button} onClick={clearMarkers}>Clear Markers</button>


            <div className={styles.map_info}>
              <p>Number of crimes in area: <b>{policeData.length}</b></p>
              <p>Longitude: <b>{viewport.longitude.toFixed(4)}</b></p>
              <p>Latitude: <b>{viewport.latitude.toFixed(4)}</b></p>
            </div>
          </div>
        </div>
    </ReactMapGl>
    </div>
  )
}
