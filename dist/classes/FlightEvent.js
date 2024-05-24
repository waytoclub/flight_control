"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightEvents = void 0;
class FlightEvents {
    constructor() {
        this.flightDetails = [];
    }
    saveFlightDetails(flight) {
        this.flightDetails.push(flight);
        return this.flightDetails;
    }
    getFlightDetails() {
        return this.flightDetails;
    }
}
exports.FlightEvents = FlightEvents;
//# sourceMappingURL=FlightEvent.js.map