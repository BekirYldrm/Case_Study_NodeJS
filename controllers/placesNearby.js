import { Router } from "express";
import { Client } from "@googlemaps/google-maps-services-js";
import { config } from "dotenv";
import bodyParser from "body-parser";
import mapsModel from "../models/mapsModel.js";
import cors from "cors";

config();

const client = new Client({});
const router = Router();

router
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cors())

    .get("/", (req, res) => {
        const lat = req.query.lat;
        const long = req.query.long;
        const rad = req.query.rad;

        mapsModel
            .findOne({ latitude:  lat , longitude:  long , radius:  rad  })

            .then(foundData => {
                if (foundData) {
                    res.json(foundData.results);
                    console.log(foundData.results);

                }
                else {
                    client
                        .placesNearby({
                            params: {
                                location: { latitude: lat , longitude:  long  },
                                radius: rad ,
                                key: process.env.API_KEY,
                            }
                        })

                        .then((responseAPI) => {

                            res.json( responseAPI.data.results )
                            const resultsAPI = responseAPI.data.results;
                            const paramsAPI = responseAPI.config.params;

                            const newData = new mapsModel({

                                latitude: paramsAPI.location.latitude,
                                longitude: paramsAPI.location.longitude,
                                radius: paramsAPI.radius,
                                results: resultsAPI

                            });
                            
                            newData.save();

                        })

                        .catch(error => console.error(error))

                }
            })
            .catch(error => console.log(error))

    });

export default router;