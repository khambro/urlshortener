
const express = require("express");
const config = require("config");
const Url = require("../models/url");
var getShortenedUrlRoute = express.Router();

getShortenedUrlRoute.get('/blah', (req, res) => {res.json({msg: "get route is twerking"})})

getShortenedUrlRoute.get('/:shortUrl', async (req, res) => {
    var shortUrlCode = req.params.shortUrl;
    var url = await Url.findOne({ urlCode: shortUrlCode });

    try {
        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(400).json("The shortened url doesn't exist in our system.");
        }
    }
    catch (err) {
        console.error("Error while retrieving long url for shorturlcode " + shortUrlCode);
        return res.status(500).json("Internal server error");
    }
})

module.exports = getShortenedUrlRoute;