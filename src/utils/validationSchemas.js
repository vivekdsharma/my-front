// src/utils/validationSchemas.js
import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const signupSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const hotelSchema = Yup.object({
  hotelName: Yup.string().required('Hotel name is required'),
  location: Yup.string().required('Location is required'),
  availableRooms: Yup.number().positive().integer().required('Number of available rooms is required'),
  roomsNeeded: Yup.number().positive().integer().required('Number of rooms needed is required'),
  checkInDate: Yup.date().required('Check-in date is required').min(new Date(), 'Check-in date cannot be in the past'),
  checkOutDate: Yup.date().required('Check-out date is required').min(Yup.ref('checkInDate'), 'Check-out date cannot be before check-in date'),
  guestName: Yup.string().required('Guest name is required'),
  guestPhone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  guestEmail: Yup.string().email('Invalid email address').required('Email is required'),
});

export const driverSchema = Yup.object({
  name: Yup.string().required('Driver name is required'),
  licenseNumber: Yup.string().required('License number is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  vehicleType: Yup.string().required('Vehicle type is required'),
});
