/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import styles from "./Sidebar.module.css";
import { FlyToInterpolator } from "react-map-gl";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Button } from "@material-ui/core";
import axios from "axios";
import filterCrimeNames from "../../../functions/filterCrimeNames";
export default function Sidebar({
  setLoading,
  setPoliceData,
  setViewport,
  viewport,
  policeData,
  loading
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [address, setAddress] = useState("");
  const searchInput = useRef(null);

  const closeSideBar = () => {
    const viewButton = document.getElementById("viewButton");
    const sidebar = document.getElementById("sidebar");

    sidebar.style.width = "0px";
    sidebar.style.padding = "0px";

    viewButton.style.display = "inline";
  };
  const refresh = async () => {
    setLoading(true);
    const result = await axios(
      `https://data.police.uk/api/crimes-street/all-crime?lat=${viewport.latitude}&lng=${viewport.longitude}`
    );
    const data = filterCrimeNames(result.data, "-");
    await setPoliceData(data);
    setLoading(false);
  };

  const searchPlace = async () => {
    setErrorMessage("");
    setPoliceData([]);
    const searchParams = address;
    if (searchParams === "" || searchParams === null) {
      setErrorMessage("You must enter a place");
      return;
    }
    setLoading(true);

    const results = await geocodeByAddress(searchParams);
    const latlng = await getLatLng(results[0]);

    setViewport((prevViewport) => {
      return {
        ...prevViewport,
        zoom: 12,
        longitude: latlng.lng,
        latitude: latlng.lat,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
      };
    });

    setLoading(false);
  };

  const filterPoliceData = async (e) => {
    e.persist();
    if (e.target.value === "all-crime") {
      await refresh();
      return;
    }
    setLoading(true);
    const filteredPoliceData = await policeData.filter(
      (crime) => crime.category === e.target.value
    );
    setPoliceData(filteredPoliceData);
    setLoading(false);
  };

  const resetFields = () => {
    setLoading(true);
    setPoliceData([]);
    setAddress("");
    setLoading(false);
  };
  return (
    <div className={styles.config_area} id='sidebar'>
      <a className={styles.close_button} onClick={closeSideBar}>
        x
      </a>
      <div className={styles.config_elements} id='sidebarElements'>
        <div className={styles.input_group}>
          <label htmlFor='Place'>
            <b className={styles.error_Message}>{errorMessage}</b>
          </label>
          <div>
            {/*  */}
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              ref={searchInput}>
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places",
                      className: "search-input"
                    })}
                    type='text'
                    onKeyUp={(e) => e.key === "Enter" && searchPlace()}
                    className={styles.search_field}
                  />
                  <div className={styles.autoComplete_container}>
                    {loading && (
                      <svg
                        key='1'
                        height='24'
                        width='24'
                        className={styles.loading_icon}
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path d='M12,22c5.421,0,10-4.579,10-10h-2c0,4.337-3.663,8-8,8s-8-3.663-8-8c0-4.336,3.663-8,8-8V2C6.579,2,2,6.58,2,12 C2,17.421,6.579,22,12,22z' />
                      </svg>
                    )}

                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? "#fff"
                          : "transparent",
                        color: "rgba(0,0,0,0.7)",
                        padding: "5px 10px",
                        borderBottom: "1px solid #11324B"
                      };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, { style })}
                          key={suggestion.placeId}>
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          {loading ? (
            <div className='d-flex justify-content-center'>
              <svg
                height='24'
                width='24'
                className={styles.loading_icon}
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M12,22c5.421,0,10-4.579,10-10h-2c0,4.337-3.663,8-8,8s-8-3.663-8-8c0-4.336,3.663-8,8-8V2C6.579,2,2,6.58,2,12 C2,17.421,6.579,22,12,22z' />
              </svg>
            </div>
          ) : (
            <div className={styles.button_area}>
              <Button
                onClick={searchPlace}
                size='large'
                variant='contained'
                color='default'>
                Search
              </Button>
              <Button
                onClick={refresh}
                size='large'
                variant='contained'
                color='secondary'>
                Refresh
              </Button>
            </div>
          )}
        </div>

        <select className={styles.dropdown} onChange={filterPoliceData}>
          <option value='all-crime'>All Crime</option>
          <option value='anti-social-behaviour'>Anti Social Behaviour</option>
          <option value='bicycle-theft'>Bicycle Theft</option>
          <option value='burglary'>Burglary</option>
          <option value='criminal-damage-arson'>
            Criminal Damage and Arson
          </option>
          <option value='drugs'>Drugs</option>
          <option value='other-theft'>Other Theft</option>
          <option value='possesion-of-weapons'>Possession Of Weapons</option>
          <option value='public-order'>Public Order</option>
          <option value='robbery'>Robbery</option>
          <option value='shoplifting'>Shoplifting</option>
          <option value='theft-from-the-person'>Theft From The Person</option>
          <option value='vehicle-crime'>Vehicle Crime</option>
          <option value='violent-crime'>Violent Crime</option>
          <option value='other-crime'>Other Crime</option>
        </select>

        <div className={styles.map_info}>
          <p>
            Number of crimes in area: <b>{policeData.length}</b>
          </p>
          <p>
            Longitude: <b>{viewport.longitude.toFixed(4)}</b>
          </p>
          <p>
            Latitude: <b>{viewport.latitude.toFixed(4)}</b>
          </p>
        </div>
      </div>
      <div className='d-flex justify-content-center m-3'>
        <Button
          onClick={resetFields}
          size='large'
          variant='contained'
          color='secondary'>
          Reset
        </Button>
      </div>
    </div>
  );
}
