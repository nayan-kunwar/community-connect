import logger from '../config/logger.js';

export const logInfo = (message: string, meta?: any) => {
    logger.info(message, meta);
};

export const logError = (message: string, meta?: any) => {
    logger.error(message, meta);
};

export default logger;
