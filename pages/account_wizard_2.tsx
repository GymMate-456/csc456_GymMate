import { useState, FormEvent } from 'react';
import styles from '../styles/Signin.module.css';
import Image from 'next/image';
import tempLogo from "./../public/icons/temp_logo2.png";
import Multiselect from 'multiselect-react-dropdown';
import dynamic from 'next/dynamic';

const LocationAutocomplete = dynamic(() => import('../utils/LocationAutocomplete'), {
  ssr: false, // Disable server-side rendering
});

function Wizard2() {
  const [age, setAge] = useState('');
  const [sportsPreference, setSportsPreference] = useState([]);
  const sports = [
    'Football',
    'Basketball',
    'Baseball',
    'Soccer',
    'Ice Hockey',
    'Tennis',
    'Golf',
    'Wrestling',
    'Rugby',
    'Badminton',
    'Cycling',
    'Boxing',
    'Lacrose',
    'Volleyball',
    'Cricket',
    'Swimming',
    'Track & Field'
  ]

  const [location, setLocation] = useState<google.maps.places.PlaceResult | null>(null);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    setLocation(place);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle wizard2 input submit logic here
  }

  function console_check() {
    console.log("Age", age)
    console.log("Location", location?.formatted_address)
    console.log("Sports: ", sportsPreference);
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
      <div className={styles.image_container}>
          <Image src={tempLogo} alt="Image" className={styles.logo}/>
        </div>
        <h1 className={styles.heading}>Tell us more about you</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Age:
            <input className={styles.input} type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
          <br />
          <label className={styles.label}>
            Location:
            <LocationAutocomplete onSelect={handlePlaceSelect} />
          </label>
          
          <br />
          <label className={styles.label}>
            Sports Preference:
            <Multiselect
              isObject={false}
              placeholder=" "
              onKeyPressFn={function noRefCheck(){}}
              onRemove={(e) => setSportsPreference(e)}
              onSearch={function noRefCheck(){}}
              onSelect={(e) => setSportsPreference(e)}
              options={sports}
              className={styles.input}
              style={{
                searchBox: {
                  border: 'none',
                }
              }}
            />
          </label>
          <br />
          <button className={styles.button} type="submit" onClick={console_check}>Continue</button>
        </form>
        <br></br>
      </div>
    </div>
  );
}

export default Wizard2;
