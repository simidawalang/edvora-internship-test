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
  const upcomingRides = rides.filter((r) => r.date * 1000 > Date.now());
  const pastRides = rides.filter((r) => r.date * 1000 < Date.now());

  const [showFilter, setShowFilter] = useState(false);
  const cities = [...new Set(rides.map(({ city }) => city))];
  const states = [...new Set(rides.map(({ state }) => state))];
  // To have unique values in case there are duplicate cities or states

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const filterRef = useRef();

  const openFilter = () => {
    setShowFilter(true);
  };

  const handleStateChange = (e) => {
    const { value } = e.target;
    setSelectedState(value);
    value.trim().length === 0 && setResult(sortedRides);
    value.trim().length !== 0 &&
      setResult(
        sortedRides.filter((r) => r.state.toLowerCase() === value.toLowerCase())
      );
    setSelectedCity('');
  };


  const handleCityChange = (e) => {
    const { value } = e.target;
    setSelectedCity(value);
    value.trim().length === 0 && setSelectedState(selectedState);
    value.trim().length !== 0 &&
      setResult(
        sortedRides.filter(
          (r) =>
            r.city.toLowerCase() === value.toLowerCase() &&
            r.state.toLowerCase() === selectedState.toLowerCase()
        )
      );
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
          <li onClick={() => setResult(rides)}>
            Nearest Rides ({rides.length})
          </li>
          <li onClick={() => setResult(upcomingRides)}>
            Upcoming Rides ({upcomingRides.length})
          </li>
          <li onClick={() => setResult(pastRides)}>
            Past Rides ({pastRides.length})
          </li>
        </ul>
        <span className="filter-container" onClick={openFilter}>
          <FilterIcon />
          Filter
        </span>
        {showFilter && (
          <Filter onClick={openFilter} ref={filterRef}>
            <h3>Filter</h3>
            <div className="options">
              <select id="" value={selectedState} onChange={handleStateChange}>
                <option value="" defaultValue>
                  State
                </option>
                <option value="some state">Some State</option>
                {states.map((state) => (
                  <option id={state} value={state} key={state}>
                    {state}
                  </option>
                ))}
              </select>
              <select
                name=""
                id=""
                value={selectedCity}
                onChange={handleCityChange}
                disabled={selectedState.trim().length === 0}
              >
                <option value="" defaultChecked>
                  City
                </option>
                {cities.map((city) => (
                  <option id={city} value={city} key={city}>
                    {city}
                  </option>
                ))}
                <option value="some city">Some city</option>
              </select>
            </div>
          </Filter>
        )}
      </nav>
      <div className="ride-container">
        {result.length > 0
          ? result.map(({ id, origin_station_code, station_path, date }) => {
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
            })
          : "No result found"}
      </div>
    </div>
  );
}
