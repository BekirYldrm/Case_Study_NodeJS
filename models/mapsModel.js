import mongoose from "mongoose";
const mapsSchema =new mongoose.Schema({
    
        latitude: Number,
        longitude : Number,
        radius : Number,
        results : Array
})

const mapsModel = mongoose.model("Map", mapsSchema);

export default mapsModel;