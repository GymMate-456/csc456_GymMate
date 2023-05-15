import { useState, FormEvent } from 'react';
import styles from '../styles/Signin.module.css';
import Image from 'next/image';
import logo from "./../public/icons/logo.png";
import dynamic from 'next/dynamic';

const LocationAutocomplete = dynamic(() => import('../utils/LocationAutocomplete'), {
  ssr: false, // Disable server-side rendering
});

const MapPage: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

  const handlePlaceSelect = async(coordinates: any) => {
    console.log('Selected coordinates:', coordinates.lat);
    console.log('Selected coordinates:', coordinates.lng);
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
