"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove_flight_details = exports.update_flight_details = exports.get_audit_search_flights = exports.get_flight_by_time = exports.get_flight_departure = exports.save_flight_event = void 0;
const env_1 = require("../env/env");
const flights_1 = require("../models/flights");
const save_flight_event = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { plane_id, plane_model, origin, destination, event_type, timeframe, fuel_delta } = req.body;
        const flight = flights_1.Flights.build({ plane_id, plane_model, origin, destination, event_type, timeframe, fuel_delta });
        yield flight.save();
        return res.status(201).json({
            status: "success",
            message: 'Flight details saved.',
            data: flight
        });
    }
    catch (e) {
        return res.status(500).json({
            status: "error",
            message: 'Flight details save failed.',
            error: e.message
        });
    }
});
exports.save_flight_event = save_flight_event;
const get_flight_departure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flights = yield flights_1.Flights.find({ event_type: env_1.env.TAKE_OFF });
        return res.send({
            status: "success",
            message: 'Flight departure extracted.',
            data: (flights === null || flights === void 0 ? void 0 : flights.length) > 0 ? flights : []
        });
    }
    catch (e) {
        return res.status(500).json({
            status: "error",
            message: 'Get flight departure extract failed.',
            error: e.message
        });
    }
});
exports.get_flight_departure = get_flight_departure;
const get_flight_by_time = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const timeframe = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.timeframe;
        const flights = yield flights_1.Flights.find({ timeframe: timeframe }, { _id: 0, plane_id: 1, event_type: 1, fuel_delta: 1 });
        return res.send({
            status: "success",
            message: 'Flights by time extracted.',
            data: (flights === null || flights === void 0 ? void 0 : flights.length) > 0 ? flights : []
        });
    }
    catch (e) {
        return res.status(500).json({
            status: "error",
            message: 'Get flights by time extract failed.',
            error: e.message
        });
    }
});
exports.get_flight_by_time = get_flight_by_time;
const get_audit_search_flights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        let flight_plaintext = "";
        const timeframe = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.timeframe;
        const flights = yield flights_1.Flights.find({
            "timeframe": {
                "$lte": timeframe
            }
        }, { _id: 0, plane_id: 1, event_type: 1, fuel_delta: 1 });
        if (flights.length > 0)
            flights.map(val => {
                flight_plaintext += `${val.plane_id} ${val.event_type} ${val.fuel_delta} \n`;
            });
        return res.send({
            status: "success",
            message: 'Audit search flight results extracted.',
            data: (flight_plaintext == "") ? null : flight_plaintext
        });
    }
    catch (e) {
        return res.status(500).json({
            status: "error",
            message: 'Audit search flight results extract failed.',
            error: e.message
        });
    }
});
exports.get_audit_search_flights = get_audit_search_flights;
const update_flight_details = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { plane_id, plane_model, origin, destination, event_type, timeframe, fuel_delta } = req.body;
        const flights = yield flights_1.Flights.updateOne({
            plane_id: plane_id,
            plane_model: plane_model,
            origin: origin,
            destination: destination,
            event_type: event_type
        }, {
            timeframe: timeframe, // time update
            fuel_delta: fuel_delta // delta update
        });
        return res.send({
            status: "success",
            updated: flights.acknowledged,
            message: 'Flight update success.'
        });
    }
    catch (e) {
        return res.status(500).json({
            status: "error",
            message: 'Flight update failed.',
            error: e.message
        });
    }
});
exports.update_flight_details = update_flight_details;
const remove_flight_details = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { plane_id, timeframe } = req.body;
        const flights = yield flights_1.Flights.deleteOne({
            plane_id: plane_id,
            timeframe: timeframe
        });
        return res.send({
            status: "success",
            message: 'Flight remove success.'
        });
    }
    catch (e) {
        return res.status(500).json({
            status: "error",
            message: 'Flight remove failed.',
            error: e.message
        });
    }
});
exports.remove_flight_details = remove_flight_details;
//# sourceMappingURL=tower_controller.js.map