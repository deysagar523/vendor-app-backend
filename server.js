// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const vendorRoutes = require("./routes/vendor");
const dotenv = require("dotenv"); // Import dotenv

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/vendors", vendorRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
