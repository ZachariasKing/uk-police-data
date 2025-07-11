import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up Express server and listen on specified port
const app = express();
const PORT = process.env.LISTEN_PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

var validCrimeCategories;

//Endpoints
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://data.police.uk/api/crime-categories"
    );
    validCrimeCategories = response.data.map((category) => category.url);
    res.render("index.ejs", { categories: validCrimeCategories });
  } catch (error) {
    console.error("Error fetching crime data:", error);
    res.status(500).render("index.ejs", {
      error: error.response.data || "An error occurred while fetching crime categories.",
      categories: validCrimeCategories,
    });
  }
});

// TODO: Use GeoApify API to get latitude and longitude from address entered by user
app.post(
  "/crime-data",
  express.urlencoded({ extended: true }),
  async (req, res) => {
    const category = req.body.category;
    const date = req.body.date;
    const postcode = req.body.postcode;

    try {
      // Use GeoApify API to get latitude and longitude from postcode
      const geoResponse = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?postcode=${postcode}&format=json&apiKey=${process.env.GEOAPIFY_API_KEY}`
      );
      const coords = {
        lat: geoResponse.data.results[0].lat,
        lon: geoResponse.data.results[0].lon,
      };

      const response = await axios.get(
        `https://data.police.uk/api/crimes-street/${category}?date=${date}&lat=${coords.lat}&lng=${coords.lon}`
      );
      res.render("index.ejs", { data: response.data, categories: validCrimeCategories });
    } catch (error) {
      console.error("Error fetching crime data:", error);
      res.render("index.ejs", {
        error: `${error.response.status} - ${error.response.statusText}`,
        categories: validCrimeCategories,
      });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
