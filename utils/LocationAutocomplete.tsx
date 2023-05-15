import { useState, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import styles from '../styles/Signin.module.css';

interface Props {
  onSelect: (coordinates: { lat: number; lng: number }) => void;
}

const LocationAutocomplete: React.FC<Props> = ({ onSelect }) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const { lat, lng } = place.geometry.location;
        onSelect({ lat: lat(), lng: lng() });
        console.log({ lat: lat(), lng: lng() });
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <>
      {typeof google !== 'undefined' && (
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input className={styles.input} type="text" placeholder="Enter Location..." />
        </Autocomplete>
      )}
    </>
  );
};

export default LocationAutocomplete;

