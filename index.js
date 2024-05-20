const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const jobRoutes = require("./routes/job");

const app = express();

dotenv.config();

// JSON Parsing middleware
app.use(express.json());
console.log("URL=>", process.env.DB_CONNECTION_URL);
// MongoDB Connection
mongoose
  .connect(process.env.DB_CONNECTION_URL) // Connection String
  .then(() => console.log("Connection with Database established successfully"))
  .catch((err) => console.log("ERROR CONNECTING WITH DATABASE", err));

// API Routes
app.use(jobRoutes);

app.listen(10000, () => console.log("Server is up and running at port 8080"));
