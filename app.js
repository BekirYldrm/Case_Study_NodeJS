import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import placesNearby from "./placesNearby.js"

const app = express();
const PORT = 8070 || process.env.PORT

app.
    use(bodyParser.urlencoded({extended:true}))
    .use(cors())

    .get("/placesNearby" , placesNearby )


    .listen(PORT, ()=>{
        console.log(`Server is running : ${PORT}`);
    })