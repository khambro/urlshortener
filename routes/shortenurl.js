const express = require("express");
const { nanoid } = require("nanoid");
const isUrl = require("is-valid-http-url");
const config = require("config");
const Url = require("../models/url");

var shortUrlRoute = express.Router();


shortUrlRoute.post("/", async (req, res)=>{
    const longUrl = req.body.longUrl;
    const baseUrl = config.get("baseURL");
    if(!isUrl(baseUrl)){
        return res.status(401).json("Internal server error. Please try again later.");
    }


    if(isUrl(longUrl)){

        console.log("URL is valid")
        const urlCode = nanoid(6);

        try{
            var url = await Url.findOne({longUrl : longUrl});
            if (url) {
                return  res.status(200).json(url);
            } else {
                const shortUrl = baseUrl + "/" + urlCode;
                url  = new Url({
                    longUrl,
                    shortUrl,
                    urlCode
                });

                await url.save()
                return res.status(201).json(url);
            }
        }catch(err){
            console.error(err.message);
            return res.status(500).json("Internal Server error " + err.message);
        }
    }else{
        res.status(400).json(`"${longUrl}" is not a valid URL. Please enter a valid URL to be shortened.`);
    }
});

module.exports = shortUrlRoute;