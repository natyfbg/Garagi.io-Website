import * as env from 'env-var';

export const API_URL = env.get('REACT_APP_API_URL').required().default('http://localhost:8080/api').asUrlString();
export const MAPS_API_KEY = env.get('REACT_APP_MAPS_KEY').required().asString();
export const GA_TRACK_ID = env.get('REACT_APP_GA_TRACK_ID').required().asString();