import { FormEvent, useState, useEffect } from "react";
import GymCard from "../GymCard";
import Header from "../header";
import styles from "../../styles/profile.module.css";
import { TextField, Button, CircularProgress, Avatar} from '@mui/material';
import dynamic from 'next/dynamic';
import { sendToast } from "../../utils/toasts"
import { ToastDependency } from "../../utils/toasts"

const LocationAutocomplete = dynamic(() => import('../../utils/LocationAutocomplete'), {
  ssr: false, // Disable server-side rendering
});

function searchGyms() {
  const [gymData, setGymData] = useState([]);
  const [enteredLat, setEnteredLat] = useState("");
  const [enteredLong, setEnteredLong] = useState("");

  const handlePlaceSelect = async(coordinates: any) => {
    // Handle the selected coordinates
    console.log('Selected coordinates:', coordinates.lat);
    console.log('Selected coordinates:', coordinates.lng);
    try {
      const nearbyGyms = await fetchNearbyGyms(
        Number(coordinates.lat),
        Number(coordinates.lng)
      ).then(async () => {
        await sendToast("success", "List of gyms loaded successfully.", 500);
        console.log('List of gym loaded successfully.');
      })
    } catch (error) {
      await sendToast("error", "Error getting gyms in the area:", 500);
      console.error("Error getting gyms near user:", error);
    }
  };

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

      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.heading} style={{fontSize:'25px'}}>Search for gyms in the area!</div>
          <div className={styles.textField} style={{margin:'2%'}}>
            <LocationAutocomplete onSelect={handlePlaceSelect} />
          </div>
          </div>
      </form>
    <ToastDependency/>
    <div className={styles.container}>
      
      {/* Note that down below it might show "error" and highlight results/gym/index but the code will still work fine */}
      {gymData &&
        gymData.map((gym, index) => (
          <>
            <GymCard key={index} gym={gym} />
          </>
        ))}
    </div>
    </>
  );
}

export default searchGyms;
