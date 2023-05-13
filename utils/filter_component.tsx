import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Grid from '@mui/material/Grid';
import Multiselect from 'multiselect-react-dropdown';
import styles from '../styles/Signin.module.css';
import axios from 'axios';

const sportsList = [
  "Baseball",
  "Basketball",
  "Boxing",
  "Calisthenics",
  "Gymnastics",
  "Soccer",
  "Swimming",
  "Tennis",
  "Track and Field",
  "Volleyball",
  "Weightlifting",
  "Wrestling",
];

interface FilterProps {
  currentUserId: string;
  onFilteredData: (data: string[]) => void;
}

interface Person {
  userID: string;
  username: string;
  age: string;
  bio: string;
  sports: string[];
  profileImgUrl: string;
  cardImgUrl?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  zipcode: string;
  email: string;
  uid: string;
  likes: string[];
  likesMe?: string[];
  matches?: string[];
  dislikes?: string[];
  flagNewUser?: boolean;
}


const Filter: React.FC<FilterProps> = ({ currentUserId, onFilteredData}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [distance, setDistance] = useState<number>(1);

  const handleDistanceChange = (event: Event, newValue: number | number[]) => {
    setDistance(newValue as number);
  };

  const applyFilters = async () => {
    console.log('Selected sports:', selectedSports);
    console.log('Selected distance:', distance);
    try {
      const filteredUsers = await filterUsersBySports(selectedSports, currentUserId);
      onFilteredData(filteredUsers);
      // Do something with the filteredUsers, such as updating state or passing it to another component
    } catch (error: unknown) {
      // Handle error
      if (error instanceof Error) {
        console.error('Error applying filters:', error.message);
      } else {
        console.error('Error applying filters:', String(error));
      }
    }
    setIsOpen(false);
    // Call API to fetch users based on filters
  };

  const filterUsersBySports = async (selectedSports: string[], currentUserId: string) => {
    if (selectedSports.length === 0) {
      return [];
    }
    try {
      const response = await axios.post('/api/filterUsersBySports', {
        selectedSports,
        currentUserId,
      });
      const filteredUsers = response.data;
      console.log('Filtered users:', filteredUsers);
      return filteredUsers;
      console.log("Filtered Users");
      console.log(filteredUsers);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error applying filters:', error.message);
      } else {
        console.error('Error applying filters:', String(error));
      }
      return [];
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      {isOpen ? (
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
          <Grid item xs={12} sm={5}>
            <label className={styles.label}>
            Sports Preference:
            <Multiselect
              isObject={false}
              placeholder="Sports"
              onKeyPressFn={function noRefCheck(){}}
              onRemove={(e) => setSelectedSports(e)}
              onSearch={function noRefCheck(){}}
              onSelect={(e) => setSelectedSports(e)}
              options={sportsList}
              className={styles.input}
              selectedValues={selectedSports}
              style={{
                searchBox: {
                  border: 'none'
                },
                color: 'black'
              }}
            />
          </label>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="body1" color="black">
                Max distance: {distance} miles
              </Typography>
              <Slider
                value={distance}
                onChange={handleDistanceChange}
                aria-labelledby="distance-slider"
                step={1}
                min={1}
                max={10}
                sx={{ width: '100%' }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button onClick={applyFilters} variant="contained" color="primary" fullWidth>
              Apply
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
      ) : (
        <Button onClick={() => setIsOpen(true) } variant="contained" color="secondary">Show filter</Button>
      )}
    </AppBar>
  );
};

export default Filter;
