import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Results for "searched gym" and some information about results displayed in a card format
//NOTE: "More Details" button currently doesn't do anything and is just there as a placeholder
type Photo = {
  height: number;
  width: number;
  photo_reference: string;
  html_attributions: string[];
};

type GeometryLocation = {
  lat: number;
  lng: number;
};

type GeometryViewport = {
  northeast: GeometryLocation;
  southwest: GeometryLocation;
};

type Geometry = {
  location: GeometryLocation;
  viewport: GeometryViewport;
};

type Gym = {
  business_status: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  photos?: Photo[];
  place_id: string;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
};

type GymCardProps = {
  gym: Gym;
};
const GymCard: React.FC<GymCardProps> = ({ gym }) => {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {gym && gym.name ? gym.name : "Name Not available"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {gym && gym.rating ? gym.rating : "Not Available"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {gym && gym.vicinity ? gym.vicinity : "Not Available"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          More Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default GymCard;
