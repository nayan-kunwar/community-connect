import { app } from "./app.js";
import { config } from "./config/config.js"; //Even though the file is config.ts, TypeScript will resolve it correctly.
import { connectToMongoDB } from "./config/db.js";
import logger from './utils/logger.js';

connectToMongoDB()
    .then(() => {
        app.listen(config.PORT, () => {
            console.log(`Server is running on http://localhost:${config.PORT}`);
        });
    })
    .catch((error) => {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    });
