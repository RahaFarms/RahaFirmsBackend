const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const path = require("path");
const bookNowRoute = require("./routes/bookNowRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
var cors = require('cors')

dotenv.config();

connectDB();
const app = express();

app.use(cors())
//Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/bookNow", bookNowRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow.bold));
