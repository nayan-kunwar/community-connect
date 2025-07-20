import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import httpLogger from './middlewares/httpLogger.js';

const app = express();


app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? [
          "http://localhost:3000",
          "http://localhost:3002",
          "http://localhost:3001",
        ]
        : [
          "https://community-connect-frontend.vercel.app",

        ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    credentials: true,
  })
);

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