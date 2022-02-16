import React from "react";
import Image from "next/image";
import map from "../public/map.jpg";

const Ride = ({ id, originStationCode, stationPath, date, distance, onClick }) => {
  const milliseconds = date * 1000;
  return (
    <div className="ride" onClick={onClick}>
      <Image src={map} alt="map" height={150} layout="intrinsic" />
      <div className="ride-details">
          <ul>
              <li>Ride Id: {id}</li>
              <li>Origin Station: {originStationCode}</li>
              <li>Station Path: {`[ ${stationPath.map(path => ' ' + path)} ]`}</li>
              <li>Date: {new Date(date* 1000).toLocaleString("en-US")}</li>
              <li>Distance: {distance}</li>
          </ul>
      </div>
    </div>
  );
};

export default Ride;
