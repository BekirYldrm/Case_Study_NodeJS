import { Router } from "express";
import { Client } from "@googlemaps/google-maps-services-js";
import { config } from "dotenv";
import bodyParser from "body-parser";

config();


const client = new Client({});

const router = Router();

router
    .use(bodyParser.urlencoded({ extended: true }))


    .get("/placesNearby", (req, res) => {

        client
            .placesNearby({
                params: {
                    location: { latitude: 33.8670522, longitude: 151.1957362 },
                    radius: 1500,
                    key: process.env.API_KEY,
                }
            })
            .then(apiRes => {
                res.json(apiRes.data.results)
            })
            .catch(error => console.error(error))
    })

export default router;