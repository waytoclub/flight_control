import mongoose from "mongoose";
import { iFlights } from "../interface/resource";

interface FlightDoc extends mongoose.Document {
    plane_id: string;
    plane_model: number;
    origin: string;
    destination: string;
    event_type: string;
    timeframe: string;
    fuel_delta: number;
}
interface FlightModelInterface extends mongoose.Model<FlightDoc> {
    build(attr: iFlights): FlightDoc
}

const flightSchema = new mongoose.Schema({
    plane_id: {
        type: String,
        required: true
    },
    plane_model: {
        type: Number,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    event_type: {
        type: String,
        required: true
    },
    timeframe: {
        type: String,
        required: true
    },
    fuel_delta: {
        type: Number,
        required: true
    }
})
flightSchema.statics.build = (attr: iFlights) =>   {
    return new Flights(attr)
}

const Flights = mongoose.model<FlightDoc, FlightModelInterface>('Flights', flightSchema)

export {
    Flights,
    FlightDoc
} 