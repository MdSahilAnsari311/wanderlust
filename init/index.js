const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// 1. Explicitly load environment variables from your root directory
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// 2. Import and initialize the Mapbox Geocoding Service
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken : mapToken });

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(async () => {
    console.log("connected to DB");
    await initDB();
    mongoose.disconnect(); 
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    console.log("Fetching exact coordinates from Mapbox... Please wait.");

    // 2. Loop through all your listings and fetch real-time coordinates
    const updatedData = await Promise.all(initData.data.map(async (obj) => {
        try {
            // Forward geocode the location string (e.g., "Costa Rica" or "Goa, India")
            const response = await geocodingClient.forwardGeocode({
                query: `${obj.location}, ${obj.country}`,
                limit: 1
            }).send();

            // Default fallback coordinates [0, 0] if Mapbox can't resolve the location name
            let coords = [0, 0]; 

            if (response.body.features && response.body.features.length > 0) {
                // Mapbox naturally returns data as [longitude, latitude] matching GeoJSON Point spec
                coords = response.body.features[0].geometry.coordinates;
            }

            return {
                ...obj,
                owner: "6ac622f2b6fa6e1f66c4b744",
                geometry: {
                    type: "Point",
                    coordinates: coords
                }
            };
        } catch (error) {
            console.error(`Failed to geocode location: ${obj.location}. Error:`, error.message);
            // Return item with fallback coordinates if a single request fails
            return {
                ...obj,
                owner: "6ac622f2b6fa6e1f66c4b744",
                geometry: { type: "Point", coordinates: [0, 0] }
            };
        }
    }));

    // 3. Save the dynamically generated GeoJSON array into MongoDB
    await Listing.insertMany(updatedData);
    console.log("Data was successfully initialized with exact Mapbox coordinates!");
};