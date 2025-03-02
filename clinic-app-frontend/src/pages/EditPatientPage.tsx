import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPatient, updatePatient } from "../api/patientApi"; // Import the API functions

const EditPatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    middleName: "",
    dateOfBirth: "",
    homeAddress: "",
    dateOfRegistration: "",
    _matriculationNumber: false,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await getPatient(id);
        setFormData({
          firstName: patient.firstName,
          surname: patient.surname,
          middleName: patient.middleName || "",
          dateOfBirth: patient.dateOfBirth ? new Date(patient.dateOfBirth).toISOString().substr(0, 10) : "",
          homeAddress: patient.homeAddress,
          dateOfRegistration: patient.dateOfRegistration ? new Date(patient.dateOfRegistration).toISOString().substr(0, 10) : "",
          _matriculationNumber: patient._matriculationNumber,
        });
      } catch (error) {
        console.error("Error fetching patient:", error);
        setMessage("Error fetching patient data.");
        setMessageType("error");
      }
    };

    fetchPatient();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updatePatient(id, formData);
      setMessage("Patient updated successfully!");
      setMessageType("success");

      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
        navigate("/patients"); // Redirect to patients list after success
      }, 3000);
    } catch (error) {
      console.error("Error updating patient:", error);
      setMessage("Error updating patient. Please try again.");
      setMessageType("error");

      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <p className="text-2xl font-bold text-green-700 mb-4 text-center">
            Edit Patient
          </p>

          {message && (
            <div
              className={`mb-4 p-4 rounded ${
                messageType === "success"
                  ? "bg-green-100 text-green-700 border border-green-400"
                  : "bg-red-100 text-red-700 border border-red-400"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="surname"
                className="block text-sm font-medium text-gray-700"
              >
                Surname
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="middleName"
                className="block text-sm font-medium text-gray-700"
              >
                Middle Name
              </label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="homeAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Home Address
              </label>
              <input
                id="homeAddress"
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="dateOfRegistration"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Registration
              </label>
              <input
                type="date"
                id="dateOfRegistration"
                name="dateOfRegistration"
                value={formData.dateOfRegistration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Matriculation Number
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="_matriculationNumber"
                  name="_matriculationNumber"
                  checked={formData._matriculationNumber}
                  onChange={handleChange}
                  className="mr-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                />
                <label
                  htmlFor="_matriculationNumber"
                  className="text-sm text-gray-700"
                >
                  _23120111057
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
            >
              Update Patient
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditPatientPage;
