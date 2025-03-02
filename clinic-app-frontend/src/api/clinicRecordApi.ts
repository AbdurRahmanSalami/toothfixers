import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

// Create a new clinic record
export const createClinicRecord = async (clinicRecordData: any) => {
  const response = await axios.post(`${API_BASE_URL}/clinical-records`, clinicRecordData);
  return response.data;
};

// Get a clinic record by ID
export const getClinicRecord = async (recordId: string) => {
    const response = await axios.get(`${API_BASE_URL}/clinical-records/${recordId}`);
    return response.data;
  };

// Get all clinic records
export const getClinicRecords = async () => {
  const response = await axios.get(`${API_BASE_URL}/clinical-records`);
  return response.data;
};

// Update a clinic record by ID
export const updateClinicRecord = async (recordId: string, updatedData: any) => {
  const response = await axios.put(`${API_BASE_URL}/clinical-records/${recordId}`, updatedData);
  return response.data;
};

// Delete a clinic record by ID
export const deleteClinicRecord = async (recordId: string) => {
  const response = await axios.delete(`${API_BASE_URL}/clinical-records/${recordId}`);
  return response.data;
};
