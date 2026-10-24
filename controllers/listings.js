const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken : mapToken });


// Index Route
module.exports.index = async (req, res) => {
    // Grab the category parameter from the URL if someone clicked a filter icon
    const { category, q} = req.query; 
    
    let filter = {};
    
    // If a valid category exists and isn't 'All', update the Mongoose query object
    // Note: The string must match our schema enum capitalization ("Trending", "Rooms", etc.)
    if (category && category !== 'All') {
        filter.category = category;
    }

    if (q) {
        filter.$or = [
            { title: { $regex: q, $options: 'i' } },    // Matches words inside title
            { location: { $regex: q, $options: 'i' } }, // Matches words inside location (like Fiji)
            { country: { $regex: q, $options: 'i' } }   // Matches words inside country
        ];
    }

    // Pull filtered items from Atlas (or everything if filter is empty)
    const allListings = await Listing.find(filter); 
    res.render("./listings/index.ejs", { allListings });
};

// New Route
module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new.ejs");
};

// Show Route
module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path : "reviews", 
        populate : {
            path : "author",
        },
    }).populate("owner");
    
    if(!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", {listing});
};

// Create Route
module.exports.createListing = async (req, res) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send(); 

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

// Edit Route
module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url; 
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("./listings/edit.ejs", {listing, originalImageUrl}); 
};

// Update Route
module.exports.updateListing = async (req, res) => {
    let {id} = req.params;

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send(); 

    let listing = await Listing.findByIdAndUpdate(id,  {...req.body.listing, geometry: response.body.features[0].geometry}, {runValidators : true});
    
    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

// Delete/Destroy
module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!")
    res.redirect("/listings");
};