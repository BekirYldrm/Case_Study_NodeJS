import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import placesNearby from "./placesNearby.js"



const app = express();
const PORT = 8070 || process.env.PORT

app.
    use(bodyParser.urlencoded({ extended: true }))
    .use(cors())

    .get("/placesNearby", placesNearby)

mongoose
    .connect(process.env.DB_URL)

    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running : ${PORT}`);
        })
    })

    .catch(error=>console.error(error));


