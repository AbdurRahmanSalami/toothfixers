import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getPatients, deletePatient } from '../api/patientApi';
import { Link } from 'react-router-dom';

const PatientPage: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setMessage('Error fetching patients.');
        setMessageType('error');
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deletePatient(id);
      setPatients(patients.filter(patient => patient.id !== id));
      setMessage('Patient deleted successfully.');
      setMessageType('success');
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } catch (error) {
      console.error('Error deleting patient:', error);
      setMessage('Error deleting patient.');
      setMessageType('error');
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl text-black">Patients</h1>
          <Link to="/add-patient" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200">
            Add Patient
          </Link>
        </div>
        {message && (
          <div className={`mb-4 p-4 rounded ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-3xl">
              <thead>
                <tr className="bg-gray-100 text-gray-1000">
                  <th className="py-3 px-4 border-b-2 border-gray-400">First Name</th>
                  <th className="py-3 px-4 border-b-2 border-gray-400">Surname</th>
                  <th className="py-3 px-4 border-b-2 border-gray-400">Middle Name</th>
                  <th className="py-3 px-4 border-b-2 border-gray-400">Date of Birth</th>
                  <th className="py-3 px-4 border-b-2 border-gray-400">Home Address</th>
                  <th className="py-3 px-4 border-b-2 border-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(patient => (
                  <tr key={patient._id} className="even:bg-gray-100 hover:bg-gray-200">
                    <td className="py-3 px-4 border-b border-gray-300">{patient.firstName}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{patient.surName}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{patient.middleName}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{patient.dateOfBirth}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{patient.homeAddress}</td>
                    <td className="py-3 px-4 border-b border-gray-300">
                      <Link to={`/edit-patient/${patient.id}`} className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition duration-200 mr-2">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(patient.id)} className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700 transition duration-200">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PatientPage;
