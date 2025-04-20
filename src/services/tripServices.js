// src/services/tripService.js
import api from './api';

export const previewTrip = (tripData) => api.post('/trips/preview', tripData);
export const confirmTrip = (paymentData) => api.post('/trips/confirm', paymentData);
