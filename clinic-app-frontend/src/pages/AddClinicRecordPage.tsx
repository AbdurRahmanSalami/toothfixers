import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPatients } from "../api/patientApi"; // Import the API function for fetching patients
import { createClinicRecord } from "../api/clinicRecordApi";

const AddClinicRecordPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clinicDate: "",
    natureOfAilment: "",
    medicinePrescribed: "",
    procedureUndertaken: "",
    dateOfNextAppointment: "",
    biodata: "", // Store the selected patient ID
  });

  const [patients, setPatients] = useState<any[]>([]); // Array to store the fetched patients

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    // Fetch all patients when component mounts
    const fetchPatients = async () => {
      try {
        const patientsData = await getPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
        // Handle error as needed
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, biodata: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createClinicRecord(formData);
      console.log("Clinical record created:", response);

      // Reset form data after successful submission
      setFormData({
        clinicDate: "",
        natureOfAilment: "",
        medicinePrescribed: "",
        procedureUndertaken: "",
        dateOfNextAppointment: "",
        biodata: "",
      });

      // Set success message
      setMessage("Clinical record created successfully!");
      setMessageType("success");

      // Redirect to a different page or handle as needed
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
        navigate("/clinic-records"); // Redirect to clinic records page after success
      }, 3000);
    } catch (error) {
      console.error("Error adding clinical record:", error);

      // Set error message
      setMessage("Error adding clinical record. Please try again.");
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

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <p className="text-2xl font-bold text-green-700 mb-4 text-center">
            Add New Clinical Record
          </p>

          {/* Display Message */}
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
                htmlFor="clinicDate"
                className="block text-sm font-medium text-gray-700"
              >
                Clinic Date
              </label>
              <input
                type="date"
                id="clinicDate"
                name="clinicDate"
                value={formData.clinicDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="natureOfAilment"
                className="block text-sm font-medium text-gray-700"
              >
                Nature of Ailment
              </label>
              <input
                type="text"
                id="natureOfAilment"
                name="natureOfAilment"
                value={formData.natureOfAilment}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="medicinePrescribed"
                className="block text-sm font-medium text-gray-700"
              >
                Medicine Prescribed
              </label>
              <input
                type="text"
                id="medicinePrescribed"
                name="medicinePrescribed"
                value={formData.medicinePrescribed}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="procedureUndertaken"
                className="block text-sm font-medium text-gray-700"
              >
                Procedure Undertaken
              </label>
              <input
                type="text"
                id="procedureUndertaken"
                name="procedureUndertaken"
                value={formData.procedureUndertaken}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="dateOfNextAppointment"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Next Appointment
              </label>
              <input
                type="date"
                id="dateOfNextAppointment"
                name="dateOfNextAppointment"
                value={formData.dateOfNextAppointment}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="biodata"
                className="block text-sm font-medium text-gray-700"
              >
                Patient
              </label>
              <select
                id="biodata"
                name="biodata"
                value={formData.biodata}
                onChange={handlePatientChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
                required
              >
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.surname}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
            >
              Add Clinical Record
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddClinicRecordPage;
