/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useRef} from 'react'
import styles from './Sidebar.module.css';
import {FlyToInterpolator} from 'react-map-gl';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {Button, TextField, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';

export default function Sidebar({setLoading, setPoliceData, setViewport, viewport, policeData, loading}) {

  const [errorMessage, setErrorMessage] = useState('');
  const [address, setAddress] = useState('');
  const [chossenCategory, setChossenCategory] = useState('');
  const searchInput = useRef(null);

  const closeSideBar = () => {
    const viewButton = document.getElementById('viewButton');
    const sidebar = document.getElementById('sidebar');

    sidebar.style.width = '0px'
    sidebar.style.padding = '0px'

    viewButton.style.visibility = 'visible'
  }

  const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#11324B',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#11324B',
        },
        '&:hover fieldset': {
          borderColor: '#11324B',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#11324B',
        },
      },
    },
  })(TextField);


  const refresh = async () => {
    setLoading(true)
    const result = await axios(`https://data.police.uk/api/crimes-street/all-crime?lat=${viewport.latitude}&lng=${viewport.longitude}`,)
    setPoliceData(result.data)
    setLoading(false)
  }

  const searchPlace = async () => {
    setErrorMessage('');
    setPoliceData([]);
    const searchParams = address
    if (searchParams === '' || searchParams === null) {
      setErrorMessage('You must enter a place');
      return
    }
    setLoading(true)

    const results = await geocodeByAddress(searchParams)
    const latlng = await getLatLng(results[0]);

    setViewport({
      ...viewport,
      zoom: 12,
      longitude: latlng.lng,
      latitude: latlng.lat,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    })

    setLoading(false)
  }

  const filterPoliceData = async (e) => {
    setChossenCategory(e.target.value);
    if (chossenCategory === "all-crime") {
      await refresh();
      return
    }
    setLoading(true)
    await refresh();
    const filteredPoliceData = policeData.filter(crime => crime.category === chossenCategory)
    setPoliceData(filteredPoliceData);
    setLoading(false)
  }

  const resetFields = () => {
    setLoading(true)
    setPoliceData([]);
    setAddress('')
    setChossenCategory('')
    setLoading(false)
  }
  return (
    <div className={styles.config_area} id="sidebar">
          <a className={styles.close_button} onClick={closeSideBar}>x</a>
          <div className={styles.config_elements} id="sidebarElements">
            <div className={styles.input_group}>
              <label htmlFor="Place"><b className={styles.error_Message}>{errorMessage}</b></label>
              <div>
              {/*  */}
                <PlacesAutocomplete value={address} onChange={setAddress} ref={searchInput}>
                
                  {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                      <CssTextField
                        {...getInputProps({placeholder: 'Search Places', className: 'search-input'})}
                        onKeyUp={e => {e.key === 'Enter' && searchPlace()}}
                        label="Search Place"  
                        variant="outlined"
                        autoFocus
                        style={{width: '100%'}}
                      />
                      <div className="autocomplete-dropdown-container">
                        {
                          loading && 
                            <svg key="1" height="24" width="24" className={styles.loading_icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	                            <path d="M12,22c5.421,0,10-4.579,10-10h-2c0,4.337-3.663,8-8,8s-8-3.663-8-8c0-4.336,3.663-8,8-8V2C6.579,2,2,6.58,2,12 C2,17.421,6.579,22,12,22z"/>
                            </svg>
                        }

                        {suggestions.map( (suggestion) =>
                          {
                            const style = {
                              backgroundColor: suggestion.active ? '#11324B' : 'transparent',
                              color: suggestion.active ? 'white' : '#11324B',
                              padding: '5px 10px',
                              borderBottom: '1px solid #11324B',
                            }
                            return (
                                <div  {...getSuggestionItemProps(suggestion, {style})} key={suggestion.placeId}><span>{suggestion.description}</span></div>
                            )
                          }
                        )}
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
                <div className={styles.button_area}>
                  <Button onClick={searchPlace} size="large" variant="contained" color="default">Search</Button>
                  <Button onClick={refresh} size="large" variant="contained" color="secondary">Refresh</Button>
                </div>
              }
            </div>

            <FormControl style={{width: '100%'}} variant="outlined">
              <InputLabel className={styles.dropdown_label} id="select-label">Category</InputLabel>
              <Select className={styles.dropdown} value={chossenCategory} onChange={filterPoliceData} labelId="select-label" id="select-crime-category">
                <MenuItem value={'all-crime'}>All Crime</MenuItem>
                <MenuItem value={'anti-social-behaviour'}>Anti Social Behaviour</MenuItem>
                <MenuItem value={'bicycle-theft'}>Bicycle Theft</MenuItem>
                <MenuItem value={'burglary'}>Burglary</MenuItem>
                <MenuItem value={'criminal-damage-arson'}>Criminal Damage and Arson</MenuItem>
                <MenuItem value={'drugs'}>Drugs</MenuItem>
                <MenuItem value={'other-theft'}>Other Theft</MenuItem>
                <MenuItem value={'possession-of-weapons'}>Possession Of Weapons</MenuItem>
                <MenuItem value={'public-order'}>Public Order</MenuItem>
                <MenuItem value={'robbery'}>Robbery</MenuItem>
                <MenuItem value={'shoplifting'}>Shoplifting</MenuItem>
                <MenuItem value={'theft-from-the-person'}>Theft From The Person</MenuItem>
                <MenuItem value={'vehicle-crime'}>Vehicle Crime</MenuItem>
                <MenuItem value={'violent-crime'}>Violent Crime</MenuItem>
                <MenuItem value={'other-crime'}>Other Crime</MenuItem>
              </Select>
            </FormControl>

            <div className={styles.map_info}>
              <p>Number of crimes in area: <b>{policeData.length}</b></p>
              <p>Longitude: <b>{viewport.longitude.toFixed(4)}</b></p>
              <p>Latitude: <b>{viewport.latitude.toFixed(4)}</b></p>
            </div>
          </div>
          <div className="d-flex justify-content-center m-3">
            <Button onClick={resetFields} size="large" variant="contained" color="secondary">Reset</Button>
          </div>
        </div>
  )
}
