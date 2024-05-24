"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_flight_data_remove = exports.validate_flight_timeframe = exports.validate_flight_data = void 0;
const validate_flight_data = (req, res, next) => {
    try {
        let error_satus = false;
        const data = req.body;
        const flight = data.split(' ');
        if (flight.length == 7) {
            flight.map(val => {
                if (val.trim() == '')
                    error_satus = true;
            });
            if (error_satus) {
                return res.status(500).send({
                    status: "error",
                    message: 'Flight data input in-correct format, details missing.'
                });
            }
            else {
                req.body.plain_id = flight[0];
                req.body.timeframe = flight[1];
                next();
            }
        }
        else {
            return res.status(500).send({
                status: "error",
                message: 'Flight data input in-correct format, details missing.'
            });
        }
    }
    catch (e) {
        return res.status(500).send({
            status: "error",
            message: 'Flight data input in-correct format, required text.',
            error: e.message
        });
    }
};
exports.validate_flight_data = validate_flight_data;
const validate_flight_data_remove = (req, res, next) => {
    try {
        let error_satus = false;
        const data = req.body;
        const flight = data.split(' ');
        if (flight.length == 2) {
            flight.map(val => {
                if (val.trim() == '')
                    error_satus = true;
            });
            if (error_satus) {
                return res.status(500).send({
                    status: "error",
                    message: 'Flight data input in-correct format, details missing to remove flight.'
                });
            }
            else {
                next();
            }
        }
        else {
            return res.status(500).send({
                status: "error",
                message: 'Flight data input in-correct format, details missing to remove flight.'
            });
        }
    }
    catch (e) {
        return res.status(500).send({
            status: "error",
            message: 'Flight data input in-correct format, required text.',
            error: e.message
        });
    }
};
exports.validate_flight_data_remove = validate_flight_data_remove;
const validate_flight_timeframe = (req, res, next) => {
    var _a;
    try {
        const timeframe = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.timeframe;
        const time = (new Date(timeframe)).toString();
        if (timeframe == '' || time == 'Invalid Date') {
            return res.status(500).send({
                status: "error",
                message: 'Flight input time passed is in-correct or wrong format.'
            });
        }
        else {
            next();
        }
    }
    catch (e) {
        return res.status(500).send({
            status: "error",
            message: 'Flight input time passed is in-correct or wrong format.',
            error: e.message
        });
    }
};
exports.validate_flight_timeframe = validate_flight_timeframe;
//# sourceMappingURL=validate.js.map