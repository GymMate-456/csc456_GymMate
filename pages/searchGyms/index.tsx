import { FormEvent, useState, useEffect } from "react";
import GymCard from "../GymCard";
import Header from "../header";

function searchGyms() {
  const [gymData, setGymData] = useState([]);
  const [enteredLat, setEnteredLat] = useState("");
  const [enteredLong, setEnteredLong] = useState("");

  //Function that grabs user input lat&long and makes API call, searchGyms,to grab gyms nearby given location
  //then sets "gymData" variable to the response from API call
  const fetchNearbyGyms = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `/api/searchGyms?lat=${latitude}&long=${longitude}`
      );
      const gyms = await response.json();
      setGymData(gyms.results);
    } catch (error) {
      console.error("Error fetching gyms:", error);
      return null;
    }
  };

  //Function when "Get Nearby Gyms" is pressed, will populate on screen the nearby gyms in a "card" format
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const nearbyGyms = await fetchNearbyGyms(
        Number(enteredLat),
        Number(enteredLong)
      );
    } catch (error) {
      console.error("Error getting gyms near user:", error);
    }
  };

  //DEV NOTE: To check object(s) of the data that is being grabbed, uncomment next 3 lines and open console in web browser
  //          and you will be able to see what information is being grabbed from the API.

  // useEffect(() => {
  //     console.log("This is our results!",gymData.results)
  // },[gymData])

  return (
    <>

      <Header leftButton="profileIcon" logoButton="logoIcon" rightButton="searchIcon" rightButton2="chatIcon" />

      <h1>Enter Coordinates to search for gyms nearby! </h1>

      <form onSubmit={handleSubmit}>
        <label> Latitude: </label>
        <input
          type="text"
          value={enteredLat}
          onChange={(e) => setEnteredLat(e.target.value)}
          placeholder="Enter Latitude.."
        ></input>
        <label> Longitude: </label>
        <input
          type="text"
          value={enteredLong}
          onChange={(e) => setEnteredLong(e.target.value)}
          placeholder="Enter Longitude.."
        ></input>
        <button type="submit">Get Nearby Gyms</button>
      </form>

      {/* Note that down below it might show "error" and highlight results/gym/index but the code will still work fine */}
      {gymData &&
        gymData.map((gym, index) => (
          <>
            <GymCard key={index} gym={gym} />
          </>
        ))}
    </>
  );
}

export default searchGyms;
