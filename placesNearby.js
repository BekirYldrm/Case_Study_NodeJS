import { Router } from "express";
import {Client} from "@googlemaps/google-maps-services-js";
const client = new Client({});

const router = Router();

router
    .get("/placesNearby",(req,res)=>{
    res.send("Hellooo")});

export default router;