import React, { useEffect } from "react";
import { Marker, Popup } from "react-map-gl";
import styles from "./Markers.module.css";

const Markers = React.memo(function Components({
  policeData,
  setSelectedCrime,
  selectedCrime
}) {
  useEffect(() => {
    const listener = (e) => {
      e.key === "Escape" && setSelectedCrime(null);
    };

    window.addEventListener("keydown", listener);
  }, [setSelectedCrime]);

  return (
    <>
      {policeData.map((crime) => (
        <Marker
          key={crime.id}
          latitude={Number(crime.location.latitude)}
          longitude={Number(crime.location.longitude)}>
          <button
            className={styles.icon_button}
            onClick={(e) => {
              e.preventDefault();
              setSelectedCrime(crime);
            }}>
            <svg
              className={styles.icon}
              viewBox='0 0 384 512'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z' />
            </svg>
          </button>
        </Marker>
      ))}

      {selectedCrime && (
        <Popup
          latitude={Number(selectedCrime.location.latitude)}
          longitude={Number(selectedCrime.location.longitude)}
          className={styles.MapBox_popup}
          onClose={() => setSelectedCrime(null)}>
          <div className={styles.popup}>
            <h2>{selectedCrime.category}</h2>
            <p>
              <b>Location:</b> {selectedCrime.location.street.name}
            </p>
            {selectedCrime.outcome_status && (
              <p>
                <b>Outcome:</b> {selectedCrime.outcome_status.category}
              </p>
            )}
            <i>
              <b>Date:</b> {selectedCrime.month}
            </i>
          </div>
        </Popup>
      )}
    </>
  );
});

export default Markers;
