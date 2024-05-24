"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env/env");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = env_1.env.PORT;
const flight_events_route_1 = __importDefault(require("./routes/flight_events_route"));
const mongoose_1 = __importDefault(require("mongoose"));
app.use(express_1.default.json());
app.use(express_1.default.text());
mongoose_1.default.connect("mongodb://localhost:27017/flight_controles", { retryWrites: true, w: 'majority' })
    .then(() => {
    console.log("connected mdb...");
})
    .catch((err) => {
    console.log("connection mdb failed...");
});
app.get('/', (req, res) => {
    res.send('Welcome to Flight Controle Tower!');
});
app.use('/api', flight_events_route_1.default);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map