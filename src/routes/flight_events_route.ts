import express from "express";
const flight_routes = express.Router();
import * as __ from "../controller/tower_controller";
import covert from "../middleware/scrap";
import { 
    validate_flight_data, 
    validate_flight_data_remove, 
    validate_flight_timeframe, 
    validate_flight_timeframe_remove 
} from "../middleware/validate";
/**
 * Ground Crew sends flight details to tower control to save
 */
flight_routes.post('/save-flight-events', [validate_flight_data, covert],  __.save_flight_event)

/**
 * Get Live Departure of all flights on the basis of TAG ['TAKE_OFF'] in env or DB : Its just example
 */
flight_routes.get('/get-flights-departure', __.get_flight_departure)

/**
 * Control tower should know each flight at any given time
 */
flight_routes.get('/get-flights-by-time/:timeframe', [validate_flight_timeframe], __.get_flight_by_time)

/**
 * Audit search for flight by time - past records
 */
flight_routes.get('/get-audit-search-flights/:timeframe', [validate_flight_timeframe],  __.get_audit_search_flights)

/**
 * Update flight details [timing or fuel-delta] on the basis of other parameters
 */
flight_routes.put('/update-flight-details', [validate_flight_data, covert],  __.update_flight_details)

/**
 * Remove flight on the basis of [plain_id && timeframe]
 */
flight_routes.delete('/remove-flight-details', [validate_flight_data_remove, validate_flight_timeframe_remove],  __.remove_flight_details)


export default flight_routes