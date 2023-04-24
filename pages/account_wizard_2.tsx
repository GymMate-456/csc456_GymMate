import { useState, FormEvent } from 'react';
import styles from '../styles/Signin.module.css';
import Image from 'next/image';
import logo from "./../public/icons/logo.png";
import Multiselect from 'multiselect-react-dropdown';
import dynamic from 'next/dynamic';
import { database } from '../utils/firebase';
import { useRouter } from 'next/router';

const LocationAutocomplete = dynamic(() => import('../utils/LocationAutocomplete'), {
  ssr: false, // Disable server-side rendering
});

function Wizard2() {
  const [age, setAge] = useState('');
  // const [location, setLocation] = useState('');
  const [sportsPreference, setSportsPreference] = useState('');
  const router = useRouter();
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

  const handleSubmit =async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle signin logic here

    try {
      await database.collection('users').doc(router.query['uid']?.toString()).update({
        age: age, location: location, sportsPreference: sportsPreference
      });

      router.push({
        pathname: '/',
        query: { uid: router.query['uid']?.toString() },
      });
    } catch (error) {
      // error message to the user
      alert('An error occurred while creating a new user.');

      // Log the error to the console for debugging purposes
      console.error('Failed process to save new user data.', error);
    }
}


  return (
    <div className={styles.container}>
      <div className={styles.card}>
      <div className={styles.image_container}>
          <Image src={logo} alt="Image" className={styles.logo}/>
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
          <button className={styles.button} type="submit">Continue</button>
        </form>
        <br></br>
      </div>
    </div>
  );
}

export default Wizard2;
