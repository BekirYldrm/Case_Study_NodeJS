import mongoose from "mongoose";

const mapsSchema =new mongoose.Schema({
    
        latiude: Number,
        longitude : Number,
        radius : Number,
})

const mapsModel = mongoose.model("Map", mapsSchema);

export default mapsModel;