import { NextApiRequest, NextApiResponse } from "next";

const searchGyms = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const lat = req.query.lat;
    const long = req.query.long;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=100000&keyword=gym&key=AIzaSyDGceG3Jh7935unV0Eoa44oD4WOkdTVyMo`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(
      "Error while searching for gyms with given latitude and longitude: ",
      error
    );
    res.status(400).json("There was an error searching for gyms");
  }
};

export default searchGyms;
