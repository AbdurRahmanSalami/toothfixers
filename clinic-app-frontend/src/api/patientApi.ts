import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Create a new patient
export const createPatient = async (patientData: any) => {
  const response = await axios.post(`${API_BASE_URL}/biodata-of-patients`, patientData);
  return response.data;
};

// Get all patients
export const getPatients = async () => {
    const response = await axios.get(`${API_BASE_URL}/biodata-of-patients`);
    return response.data;
  };

// Get a patient by ID
export const getPatient = async (patientId: string) => {
  const response = await axios.get(`${API_BASE_URL}/biodata-of-patients/${patientId}`);
  return response.data;
};

// Update a patient by ID
export const updatePatient = async (patientId: string, updatedData: any) => {
  const response = await axios.put(`${API_BASE_URL}/biodata-of-patients/${patientId}`, updatedData);
  return response.data;
};

// Delete a patient by ID
export const deletePatient = async (patientId: string) => {
  const response = await axios.delete(`${API_BASE_URL}/biodata-of-patients/${patientId}`);
  return response.data;
};