import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createPatient } from "../api/patientApi";

const AddPatientPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    middleName: "",
    dateOfBirth: "",
    homeAddress: "",
    dateOfRegistration: "",
    _matriculationNumber: false,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createPatient(formData);
      console.log("Patient created:", response);

      // Reset form data after successful submission
      setFormData({
        firstName: "",
        surName: "",
        middleName: "",
        dateOfBirth: "",
        homeAddress: "",
        dateOfRegistration: "",
        _matriculationNumber: false,
      });

      // Set success message
      setMessage("Patient created successfully!");
      setMessageType("success");

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);

    } catch (error) {
      console.error("Error adding patient:", error);

      // Set error message
      setMessage("Error adding patient. Please try again.");
      setMessageType("error");

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-16 flex flex-col items-center justify-center text-center">
        <p className="text-3xl font-bold text-green-800 mb-4">Add Patient</p>
        {message && (
          <div className={`mb-4 p-4 rounded ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="surName">Surname</label>
            <input
              type="text"
              id="surName"
              name="surName"
              value={formData.surName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="middleName">Middle Name</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="homeAddress">Home Address</label>
            <input
              id="homeAddress"
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="dateOfRegistration">Date of Registration</label>
            <input
              type="date"
              id="dateOfRegistration"
              name="dateOfRegistration"
              value={formData.dateOfRegistration}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="_matriculationNumber"
              name="_matriculationNumber"
              checked={formData._matriculationNumber}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            <label className="text-gray-700" htmlFor="_matriculationNumber">Matriculation number: _23120111057</label>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200 w-full"
            >
              Add Patient
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default AddPatientPage;
