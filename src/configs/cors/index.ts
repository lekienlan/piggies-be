import type cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import ApiError from 'middlewares/error/ApiError';

export const WHITE_LISTS = [
  'http://localhost:3001',
  'http://192.168.1.5:3001',
  'https://piggies-400707.web.app'
];

export const CORS_OPTION: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (WHITE_LISTS.indexOf(origin || '') !== -1 || !origin) {
      callback(null, true); // Allow the request if it's in the whitelist
      return;
    }

    callback(new ApiError(StatusCodes.BAD_GATEWAY, 'CORS is not allowed')); // Block the request if it's not in the whitelist
  }
};
