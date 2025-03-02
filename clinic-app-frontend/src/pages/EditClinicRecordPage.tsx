import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPatients } from "../api/patientApi";
import { getClinicRecord, updateClinicRecord } from "../api/clinicRecordApi";

const EditClinicRecordPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    clinicDate: "",
    natureOfAilment: "",
    medicinePrescribed: "",
    procedureUndertaken: "",
    dateOfNextAppointment: "",
    biodata: "",
  });

  const [patients, setPatients] = useState<any[]>([]);

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await getPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    const fetchClinicRecord = async () => {
      try {
        const recordData = await getClinicRecord(id!);
        setFormData({
          clinicDate: recordData.clinicDate,
          natureOfAilment: recordData.natureOfAilment,
          medicinePrescribed: recordData.medicinePrescribed,
          procedureUndertaken: recordData.procedureUndertaken,
          dateOfNextAppointment: recordData.dateOfNextAppointment,
          biodata: recordData.biodata,
        });
      } catch (error) {
        console.error("Error fetching clinic record:", error);
      }
    };

    fetchPatients();
    fetchClinicRecord();
  }, [id]);

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
      const response = await updateClinicRecord(id!, formData);
      console.log("Clinical record updated:", response);

      setMessage("Clinical record updated successfully!");
      setMessageType("success");

      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
        navigate("/clinic-records");
      }, 3000);
    } catch (error) {
      console.error("Error updating clinical record:", error);

      setMessage("Error updating clinical record. Please try again.");
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
            Edit Clinical Record
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
              Update Clinical Record
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditClinicRecordPage;
