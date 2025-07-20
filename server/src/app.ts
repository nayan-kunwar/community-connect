import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import httpLogger from './middlewares/httpLogger.js';

const app = express();


app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Specify allowed HTTP methods
  credentials: true, // if you're using cookies or headers
}));
// app.options('*', cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001'],
//   credentials: true,
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(httpLogger);

// Importing routes
import routes from './routes/index.js';

app.get("/", (req, res) => {
  res.status(200).send("APIs are working...");
});

app.use('/api', routes);

export { app };