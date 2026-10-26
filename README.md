# Wanderlust — Discover Your Next Stay

Wanderlust is a full-stack web application inspired by Airbnb that allows users to explore places to stay, create and manage property listings, share reviews, and save their favorite listings to a personal wishlist.

This project was built to apply full-stack web development concepts in a practical application, including authentication, authorization, database management, image uploads, geocoding, validation, and RESTful routing.

## Live Demo

**Live Website:** https://wanderlust-serf.onrender.com/listings

**GitHub Repository:** https://github.com/MdSahilAnsari311/wanderlust

## Features

- **User Authentication:** Sign up, log in, and log out using Passport.js and Passport Local Mongoose.
- **Listing Management:** Create, view, edit, and delete property listings.
- **Authentication and Authorization:** Protect restricted routes and ensure only listing owners can edit or delete their listings.
- **Review System:** Add and delete reviews with authentication and authorization checks.
- **Joi Schema Validation:** Validate listing and review data on the server before processing requests.
- **Image Uploads:** Upload listing images to Cloudinary and store image information in MongoDB.
- **Location and Maps:** Use Mapbox geocoding to convert listing locations into geographic coordinates and display map information.
- **Search and Category Filters:** Search listings by name and explore properties through category-based filters.
- **Wishlist:** Add listings to a personal wishlist, view saved listings, and remove them.
- **MongoDB Data Models:** Manage users, listings, and reviews using Mongoose schemas and model relationships.
- **Session Management:** Maintain user sessions using Express Session and MongoDB-backed session storage.
- **Flash Messages:** Display success and error feedback to users.
- **Error Handling:** Handle asynchronous errors and application errors through reusable utilities and middleware.
- **Responsive Interface:** Build the interface using EJS templates, CSS, and Bootstrap.

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap
- EJS
- EJS-Mate

### Backend
- Node.js
- Express.js
- RESTful routing

### Database and Authentication
- MongoDB
- Mongoose
- Passport.js
- Passport Local Mongoose
- Express Session
- Connect-Mongo
- Connect-Flash

### Validation and Error Handling
- Joi
- Custom Express error handling
- WrapAsync utility

### Cloud Services and Deployment
- Cloudinary — image uploads and storage
- Mapbox — geocoding and maps
- MongoDB Atlas — cloud database
- Render — application deployment
- Git and GitHub — version control

## Getting Started

Follow these steps to run Wanderlust locally.

### Prerequisites

Make sure you have installed:

- Node.js and npm
- A MongoDB instance or MongoDB Atlas account
- A Cloudinary account
- A Mapbox access token

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/MdSahilAnsari311/wanderlust
```

**2. Navigate to the project directory**

```bash
cd wanderlust
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the root directory and add your own credentials:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
MAP_TOKEN=your_mapbox_access_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

Use the exact environment variable names expected by your application. Never put real credentials in this README or commit your `.env` file to GitHub.

**5. Start the application**

If your `package.json` does not define a start script, run:

```bash
node app.js
```

If a start script is configured, you can use:

```bash
npm start
```

**6. Open the application**

Visit:

`http://localhost:8080`

## Project Structure

```text
wanderlust/
├── controllers/
│   ├── listings.js
│   ├── review.js
│   ├── users.js
│   └── wishlists.js
├── init/
│   ├── data.js
│   └── index.js
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public/
│   ├── css/
│   │   ├── rating.css
│   │   └── style.css
│   ├── image/
│   │   └── wanderlust-logo.png
│   └── js/
│       ├── map.js
│       └── script.js
├── routes/
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│   └── wishlist.js
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── views/
│   ├── includes/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── users/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   ├── error.ejs
│   └── wishlist.ejs
├── .gitignore
├── app.js
├── cloudConfig.js
├── middleware.js
├── package-lock.json
├── package.json
├── README.md
└── schema.js
```

## Key Files

- **`app.js`** — Configures Express, middleware, database connectivity, sessions, and application routes.
- **`cloudConfig.js`** — Configures Cloudinary for listing image uploads.
- **`middleware.js`** — Contains reusable authentication and authorization middleware.
- **`schema.js`** — Defines Joi validation schemas for listing and review data.
- **`models/`** — Defines MongoDB data models for listings, reviews, and users.
- **`controllers/`** — Contains application logic for listings, users, reviews, and wishlists.
- **`routes/`** — Defines endpoints for listing management, user authentication, reviews, and wishlists.
- **`init/`** — Contains initial data and database initialization scripts.
- **`utils/`** — Contains reusable error-handling utilities.
- **`views/`** — Contains EJS templates and shared interface components.
- **`public/`** — Stores CSS, JavaScript, and image assets.

## Security and Validation

- Passport.js handles user authentication.
- Authorization middleware restricts protected actions to permitted users.
- Joi schemas validate incoming listing and review data.
- Express Session and Connect-Mongo provide session management and database-backed session storage.
- Environment variables keep sensitive configuration out of the source code.
- Reusable error-handling utilities help manage application errors.

## Learning Outcomes

Building Wanderlust provided practical experience with:

- Developing a full-stack application using Node.js, Express, EJS, and MongoDB.
- Implementing authentication and resource-level authorization.
- Designing RESTful routes and organizing application logic using MVC principles.
- Integrating third-party services for image uploads and geolocation.
- Implementing server-side validation and error handling.
- Managing sessions and database relationships.
- Using Git and GitHub for version control.
- Deploying a full-stack application using Render and MongoDB Atlas.

## Acknowledgements

Wanderlust was developed as a full-stack learning project inspired by Airbnb while learning web development.

---

**Wanderlust** — Explore places, discover possibilities, and save the stays you love.