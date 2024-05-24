"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const flight_routes = express_1.default.Router();
const __ = __importStar(require("../controller/tower_controller"));
const scrap_1 = __importDefault(require("../middleware/scrap"));
const validate_1 = require("../middleware/validate");
/**
 * Ground Crew sends flight details to tower control to save
 */
flight_routes.post('/save-flight-events', [validate_1.validate_flight_data, scrap_1.default], __.save_flight_event);
/**
 * Get Live Departure of all flights on the basis of TAG ['TAKE_OFF'] in env or DB : Its just example
 */
flight_routes.get('/get-flights-departure', __.get_flight_departure);
/**
 * Control tower should know each flight at any given time
 */
flight_routes.get('/get-flights-by-time/:timeframe', [validate_1.validate_flight_timeframe], __.get_flight_by_time);
/**
 * Audit search for flight by time - past records
 */
flight_routes.get('/get-audit-search-flights/:timeframe', [validate_1.validate_flight_timeframe], __.get_audit_search_flights);
/**
 * Update flight details [timing or fuel-delta] on the basis of other parameters
 */
flight_routes.put('/update-flight-details', [validate_1.validate_flight_data, scrap_1.default], __.update_flight_details);
/**
 * Remove flight on the basis of [plain_id && timeframe]
 */
flight_routes.delete('/remove-flight-details', [validate_1.validate_flight_data], __.remove_flight_details);
exports.default = flight_routes;
//# sourceMappingURL=flight_events_route.js.map