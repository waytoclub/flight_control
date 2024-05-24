import { env } from './env/env'
import express from 'express';
const app = express();
const port = env.PORT;
import flight_event_routes from './routes/flight_events_route';
import mongoose from 'mongoose';

app.use(express.json())
app.use(express.text())

mongoose.connect("mongodb://localhost:27017/flight_controles", { retryWrites: true, w: 'majority' })
.then(() => {
  console.log("connected mdb...")
})
.catch((err) => {
  console.log("connection mdb failed...")
})

app.get('/', (req, res) => {
  res.send('Welcome to Flight Controle Tower!');
});

app.use('/api', flight_event_routes)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
