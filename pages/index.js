import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Filter from "../components/Filter";
import Ride from "../components/Ride";
import { rides } from "../data/ride";
import { user } from "../data/user";
import FilterIcon from "../public/filter-icon";

export default function Home() {
  const { station_code } = user;

  const calculateDistance = (array) => {
    const distanceArray = array.map((arr) => arr - station_code);
    const absoluteDistance = distanceArray.map((d) => Math.abs(d));
    const leastDistance = Math.min(...absoluteDistance);
    return leastDistance;
  };

  const sortedRides = rides.sort((a, b) =>
    calculateDistance(a.station_path) > calculateDistance(b.station_path)
      ? 1
      : calculateDistance(a.station_path) === calculateDistance(b.station_path)
      ? calculateDistance(a.station_path) > calculateDistance(b.station_path)
        ? 1
        : -1
      : -1
  );

  const [result, setResult] = useState(sortedRides);
  const [showFilter, setShowFilter] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const filterRef = useRef();

  const filterRides = (e) => {
    const { value } = e.target;
  };

  const openFilter = () => {
    setShowFilter(true);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        showFilter &&
        filterRef.current &&
        !filterRef.current.contains(e.target)
      ) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showFilter]);

  return (
    <div>
      <Head>
        <title>Edvora</title>
        <meta name="description" content="Edvora Ride App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <ul>
          <li>Nearest Rides (4)</li>
          <li>Upcoming Rides (2)</li>
          <li>Past Rides (3)</li>
        </ul>
        <span className="filter-container" onClick={openFilter}>
          <FilterIcon />
          Filter
        </span>
        {showFilter && (
          <Filter onClick={openFilter} ref={filterRef}>
            <h3>Filter</h3>
            <div className="options">
              <select id="">
                <option value="" defaultValue>
                  State
                </option>
              </select>
              <select name="" id="">
                <option value="" defaultChecked>
                  City
                </option>
              </select>
            </div>
          </Filter>
        )}
      </nav>
      <div className="ride-container">
        {result.map(({ id, origin_station_code, station_path, date }) => {
          let distance = calculateDistance(station_path);
          return (
            <Ride
              key={id}
              id={id}
              originStationCode={origin_station_code}
              stationPath={station_path}
              date={date}
              distance={distance}
            />
          );
        })}
      </div>
    </div>
  );
}
