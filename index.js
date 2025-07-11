import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up Express server and listen on specified port
const app = express();
const PORT = process.env.LISTEN_PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

let validCrimeCategories;

//Endpoints
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://data.police.uk/api/crime-categories');
    validCrimeCategories = response.data.map(category => category.url);
    res.render('index.ejs', { categories: validCrimeCategories });
  } catch (error) {
    console.error('Error fetching crime data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// TODO: Use GeoApify API to get latitude and longitude from address entered by user
app.post('/crime-data', express.urlencoded({ extended: true }), async (req, res) => {
  const category = req.body.category;
  const date = req.body.date;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  try {
    const response = await axios.get(`https://data.police.uk/api/crimes-street/${category}?date=${date}&lat=${latitude}&lng=${longitude}`);
    res.render('index.ejs', { data: response.data });
  } catch (error) {
    console.error('Error fetching crime data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});