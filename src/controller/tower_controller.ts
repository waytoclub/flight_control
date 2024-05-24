import { env } from '../env/env';
import Express from 'express';
import { iFlights } from "../interface/resource";
import { Flights, FlightDoc } from "../models/flights";

interface TypedRequestBody<T> extends Express.Request {
    body: T
}

const save_flight_event = async (req: Express.Request, res: Express.Response) => {
    try {
        const { plane_id, plane_model, origin, destination, event_type, timeframe, fuel_delta } = req.body;
        const flight = Flights.build({ plane_id, plane_model, origin, destination, event_type, timeframe, fuel_delta })
        await flight.save();
        return res.status(201).json({
            status: "success",
            message: 'Flight details saved.',
            data: flight
        })
    } catch(e) {
        return res.status(500).json({
            status: "error",
            message: 'Flight details save failed.',
            error: e.message
        })
    }
}

const get_flight_departure = async (req: Express.Request, res: Express.Response) => {
    try {
        const flights = await Flights.find({ event_type: env.TAKE_OFF });
        return res.send({
            status: "success",
            message: 'Flight departure extracted.',
            data: (flights?.length) > 0 ? flights : []
        })
    } catch(e) {
        return res.status(500).json({
            status: "error",
            message: 'Get flight departure extract failed.',
            error: e.message
        })
    }
}

const get_flight_by_time = async (req: Express.Request, res: Express.Response) => {
    try {
        const timeframe = req?.params?.timeframe;
        const flights = await Flights.find({ timeframe: timeframe }, { _id: 0, plane_id: 1, event_type: 1, fuel_delta: 1 });
        return res.send({
            status: "success",
            message: 'Flights by time extracted.',
            data: (flights?.length) > 0 ? flights : []
        })
    } catch(e) {
        return res.status(500).json({
            status: "error",
            message: 'Get flights by time extract failed.',
            error: e.message
        })
    }
}

const get_audit_search_flights = async (req: Express.Request, res: Express.Response) => {
    try {
        let flight_plaintext = ""; 
        const timeframe = req?.params?.timeframe;
        const flights = await Flights.find({
            "timeframe": {
                "$lte": timeframe
            }
        }, { _id: 0, plane_id: 1, event_type: 1, fuel_delta: 1 });
        if(flights.length > 0)
            flights.map(val => {
                flight_plaintext+= `${val.plane_id} ${val.event_type} ${val.fuel_delta} \n`
            })
        return res.send({
            status: "success",
            message: 'Audit search flight results extracted.',
            data: (flight_plaintext == "") ? null : flight_plaintext 
        })
    } catch(e) {
        return res.status(500).json({
            status: "error",
            message: 'Audit search flight results extract failed.',
            error: e.message
        })
    }
}


const update_flight_details = async (req: Express.Request, res: Express.Response) => {
    try {
        const { plane_id, plane_model, origin, destination, event_type, timeframe, fuel_delta } = req.body;
        const flights = await Flights.updateOne({
            plane_id: plane_id,
            plane_model: plane_model,
            origin: origin,
            destination: destination,
            event_type: event_type
        }, {
            timeframe: timeframe, // time update
            fuel_delta: fuel_delta // delta update
        })
        return res.send({
            status: "success",
            updated: flights.acknowledged,
            message: 'Flight update success.'
        })
    } catch(e) {
        return res.status(500).json({
            status: "error",
            message: 'Flight update failed.',
            error: e.message
        })
    }
}


const remove_flight_details = async (req: Express.Request, res: Express.Response) => {
    try {
        const { plane_id, timeframe } = req.body;
        const flights = await Flights.deleteOne({
            plane_id: plane_id,
            timeframe: timeframe
        })
        return res.send({
            status: "success",
            deleted: flights.acknowledged,
            message: 'Flight remove success.'
        })
    } catch(e) {
        return res.status(500).json({
            status: "error",
            message: 'Flight remove failed.',
            error: e.message
        })
    }
}



export {
    save_flight_event,
    get_flight_departure,
    get_flight_by_time,
    get_audit_search_flights,
    update_flight_details,
    remove_flight_details
}