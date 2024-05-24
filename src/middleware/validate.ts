import Express from 'express';

const validate_flight_data = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
        let error_satus: boolean = false;
        const data: string = req.body;
        const flight: (string)[] = data.split(' ')
        if(flight.length == 7) {
            flight.map(val => {
                if(val.trim() == '')
                    error_satus = true
            })
            if(error_satus) {
                return res.status(500).send({
                    status: "error",
                    message: 'Flight data input in-correct format, details missing.'
                })
            } else {
                next()
            }
        } else {
            return res.status(500).send({
                status: "error",
                message: 'Flight data input in-correct format, details missing.'
            })
        }
    } catch(e) {
        return res.status(500).send({
            status: "error",
            message: 'Flight data input in-correct format, required text.',
            error: e.message
        })
    }
}

const validate_flight_data_remove = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
        let error_satus: boolean = false;
        const data: string = req.body;
        const flight: (string)[] = data.split(' ')
        if(flight.length == 2) {
            flight.map(val => {
                if(val.trim() == '')
                    error_satus = true
            })
            if(error_satus) {
                return res.status(500).send({
                    status: "error",
                    message: 'Flight data input in-correct format, details missing to remove flight.'
                })
            } else {
                req.body = {
                    plane_id: flight[0].toString(),
                    timeframe: flight[1].toString()
                }
                next()
            }
        } else {
            return res.status(500).send({
                status: "error",
                message: 'Flight data input in-correct format, details missing to remove flight.'
            })
        }
    } catch(e) {
        return res.status(500).send({
            status: "error",
            message: 'Flight data input in-correct format, required text.',
            error: e.message
        })
    }
}

const validate_flight_timeframe_remove = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
        const timeframe = req.body.timeframe;
        const time = (new Date(timeframe)).toString();
        if(timeframe == '' || time == 'Invalid Date') {
            return res.status(500).send({
                status: "error",
                message: 'Flight input time passed to remove flight is in-correct or wrong format.'
            })

        } else {
           next();
        }
    } catch(e) {
        return res.status(500).send({
            status: "error",
            message: 'Flight input time passed to remove flight is in-correct or wrong format.',
            error: e.message
        })
    }
}

const validate_flight_timeframe = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
        const timeframe = req?.params?.timeframe;
        const time = (new Date(timeframe)).toString();
        if(timeframe == '' || time == 'Invalid Date') {
            return res.status(500).send({
                status: "error",
                message: 'Flight input time passed is in-correct or wrong format.'
            })

        } else {
           next();
        }
    } catch(e) {
        return res.status(500).send({
            status: "error",
            message: 'Flight input time passed is in-correct or wrong format.',
            error: e.message
        })
    }
}

export {
    validate_flight_data,
    validate_flight_timeframe,
    validate_flight_data_remove,
    validate_flight_timeframe_remove
}