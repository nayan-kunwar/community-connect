import express from 'express';
import morgan from 'morgan';
import httpLogger from './middlewares/httpLogger.js';

const app = express();

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