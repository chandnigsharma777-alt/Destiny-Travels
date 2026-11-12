
import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    state: { type: String, required: true },
    distance: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5 },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    bestSeason: { type: String }
});

export default mongoose.model("Destination", destinationSchema, "destinations");
