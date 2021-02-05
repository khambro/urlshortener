const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require('body-parser')
const port = 8000;
const shortUrlRoute = require("./routes/shortenurl")
const getShortenedUrlRoute = require("./routes/getshortenedurl")

const app = express();
connectDB();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
app.use(express.json({}));

app.listen(port, () => console.log(`Server listening on port ${port}.`));


app.use('/v1', getShortenedUrlRoute)
app.use("/v1/shorturl", shortUrlRoute);