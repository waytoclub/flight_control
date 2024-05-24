"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFlightData = void 0;
const formatFlightData = (data) => {
    try {
        data = data.split(' ');
        const flight = {
            plane_id: data[0].toString(),
            plane_model: Number(data[1]),
            origin: data[2].toString(),
            destination: data[3].toString(),
            event_type: data[4].toString(),
            timeframe: data[5].toString(),
            fuel_delta: Number(data[6]),
        };
        return flight;
    }
    catch (e) {
        return null;
    }
};
exports.formatFlightData = formatFlightData;
//# sourceMappingURL=helper.js.map