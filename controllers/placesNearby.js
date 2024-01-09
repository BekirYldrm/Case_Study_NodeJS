import { Router } from "express";
import { Client } from "@googlemaps/google-maps-services-js";
import { config } from "dotenv";
import bodyParser from "body-parser";
import mapsModel from "../models/mapsModel.js";

config();

const client = new Client({});
const router = Router();

router
    .use(bodyParser.urlencoded({ extended: true }))

    .get("/placesNearby", (req, res) => {

        mapsModel
            .findOne({ latitude:33.8670522, longitude:151.1957362 , radius:150000 })
            .then(foundData => {
                if (foundData) {
                    res.send(foundData)
                }
                else {
                    client

                        .placesNearby({
                            params: {
                                location: { latitude: 33.8670522, longitude: 151.1957362 },
                                radius: 150000,
                                key: process.env.API_KEY,
                            }
                        })

                        .then((responseAPI) => {

                            res.json(responseAPI.data.results)
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