import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface Gym {
  name: string;
  rating: number;
  vicinity: string;
  photos: Array<{ height: number; html_attributions: string[]; width: number; photo_reference: string }>;
}

interface GymCardProps {
  gym: Gym;
}

const GymCard: React.FC<GymCardProps> = ({ gym }) => {
  const { name, rating, vicinity, photos } = gym;
  const photoUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=YOUR_API_KEY";

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardMedia component="img" height="140" image={photoUrl} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {rating}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {vicinity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}&query_place_id=${gym.place_id}">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default GymCard;