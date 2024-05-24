import Express from 'express';
import { formatFlightData } from '../utils/helper';
import { iFlights } from '../interface/resource';

const covert = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
        const flight: iFlights = await formatFlightData(req.body);
        if(flight != null) {
            req.body = flight;
            next();
        } else {
            return res.status(500).send({
                status: "error",
                message: 'Flight data formating failed'
            })
        }
    } catch(e) {
        return res.status(500).send({
            status: "error",
            message: 'Flight data formating failed',
            error: e.message
        })
    }
}

export default covert