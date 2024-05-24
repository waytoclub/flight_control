"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flights = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const flightSchema = new mongoose_1.default.Schema({
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
});
flightSchema.statics.build = (attr) => {
    return new Flights(attr);
};
const Flights = mongoose_1.default.model('Flights', flightSchema);
exports.Flights = Flights;
//# sourceMappingURL=flights.js.map