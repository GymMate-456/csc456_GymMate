import { useState, FormEvent } from 'react';
import styles from '../styles/Signin.module.css';
import Image from 'next/image';
import tempLogo from "./../public/icons/temp_logo2.png";
import dynamic from 'next/dynamic';

const LocationAutocomplete = dynamic(() => import('../utils/LocationAutocomplete'), {
  ssr: false, // Disable server-side rendering
});

const MapPage: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    setSelectedPlace(place);
  };

  return (
    <div>
      <LocationAutocomplete onSelect={handlePlaceSelect} />
      {selectedPlace && (
        <div>
          <h2>{selectedPlace.name}</h2>
          <p>{selectedPlace.formatted_address}</p>
        </div>
      )}
    </div>
  );
}

export default MapPage;
