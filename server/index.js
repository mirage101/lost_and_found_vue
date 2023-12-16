require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const corsOptions = require("./config/cors");
const connectDB = require("./config/database");
const credentials = require("./middleware/credentials");
const errorHandlerMiddleware = require("./middleware/error_handler");
const authenticationMiddleware = require("./middleware/authentication");

const advicesController = require('./controllers/advicesController');
const missionController = require('./controllers/missionController');
const faqsController = require('./controllers/faqController');
const petsController = require('./controllers/petsController');



const app = express();
const PORT = 3500;

connectDB();

// Allow Credentials
app.use(credentials);

// CORS
app.use(cors(corsOptions));
// app.use(
//   cors({
//     origin: "http://localhost:5174",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//     optionsSuccessStatus: 204,
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );


app.get("/vets", async (req, res) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lng}&radius=5000&type=veterinary_care&key=AIzaSyDAvZaaV15EizIjZYsTA1v6p1PczPIGbHs`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from Google Places API" });
  }
});

// application.x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// application/json response
app.use(express.json());



// middleware for cookies
app.use(cookieParser());

app.use(authenticationMiddleware);

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// Default error handler
app.use(errorHandlerMiddleware);

// Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use('/advices', advicesController);
app.use('/mission', missionController);
app.use('/faqs', faqsController);
app.use('/pets', petsController);

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("DB connected");
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
