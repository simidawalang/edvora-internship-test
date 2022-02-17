import React from "react";
import Image from "next/image";
import Pill from "./Pill";
import map from "../public/map.jpg";

const Ride = ({
  id,
  originStationCode,
  stationPath,
  date,
  distance,
  onClick,
  city,
  state,
}) => {
  return (
    <div className="ride" onClick={onClick}>
      <Image src={map} alt="map" height={200} width={350} layout="intrinsic" objectFit="cover"/>
      <div className="ride-details">
        <ul>
          <li>
            Ride Id: {id}{" "}
            <span className="pill-container">
              <Pill>{city}</Pill> <Pill>{state}</Pill>
            </span>
          </li>
          <li>Origin Station: {originStationCode}</li>
          <li>
            Station Path: {`[ ${stationPath.map((path) => " " + path)} ]`}
          </li>
          <li>Date: {new Date(date * 1000).toLocaleString("en-US")}</li>
          <li>Distance: {distance}</li>
        </ul>
        <div className="pill-container"></div>
      </div>
    </div>
  );
};

export default Ride;
