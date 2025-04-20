// src/services/resourceService.js
import api from './api';

export const getHotels = () => api.get('/hotels');
export const getDrivers = () => api.get('/drivers');
export const getFlights = () => api.get('/flights');
export const getGuides = () => api.get('/guides');
