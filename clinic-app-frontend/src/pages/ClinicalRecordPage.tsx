import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getClinicRecords, deleteClinicRecord } from '../api/clinicRecordApi';
import { getPatients } from '../api/patientApi';
import { Link } from 'react-router-dom';

const ClinicRecordPage: React.FC = () => {
  const [clinicRecords, setClinicRecords] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const fetchClinicRecords = async () => {
      try {
        const data = await getClinicRecords();
        setClinicRecords(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching clinic records:', error);
        setMessage('Error fetching clinic records.');
        setMessageType('error');
        setLoading(false);
      }
    };

    const fetchPatients = async () => {
      try {
        const patientsData = await getPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchClinicRecords();
    fetchPatients();
  }, []);

  const getPatientName = (patientId: string) => {
    const patient = patients.find(patient => patient.id === patientId);
    return patient ? `${patient.firstName} ${patient.surname}` : 'N/A';
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteClinicRecord(id);
      setClinicRecords(clinicRecords.filter(record => record.id !== id));
      setMessage('Clinic record deleted successfully.');
      setMessageType('success');
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } catch (error) {
      console.error('Error deleting clinic record:', error);
      setMessage('Error deleting clinic record.');
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
          <h1 className="text-2xl font-bold text-black">Clinic Records</h1>
          <Link to="/add-clinic-record" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200">
            Add Clinic Record
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
                <tr className="bg-gray-100 text-black">
                  <th className="py-3 px-4 border-b-2 border-gray-400">Patient Name</th>
                  <th className="py-3 px-4 border-b-2 border-gray-400">Clinic Date</th>
                  <th className="py-3 px-4 border-b-2 border-gray-400">Nature of Ailment</th>
                  <th className="py-3 px-4 border-b-2 border-gray-400">Medicine Prescribed</th>
                  <th className="py-3 px-4 border-b-2 border-gray-400">Procedure Undertaken</th>
                  <th className="py-3 px-4 border-b-2 border-gray-400">Date of Next Appointment</th>
                  <th className="py-3 px-4 border-b-2 border-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clinicRecords.map(record => (
                  <tr key={record.id} className="even:bg-gray-100 hover:bg-gray-200">
                    <td className="py-3 px-4 border-b border-gray-300">
                      {getPatientName(record.biodata)}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-300">{record.clinicDate}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{record.natureOfAilment}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{record.medicinePrescribed}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{record.procedureUndertaken}</td>
                    <td className="py-3 px-4 border-b border-gray-300">{record.dateOfNextAppointment}</td>
                    <td className="py-3 px-4 border-b border-gray-300">
                      <Link to={`/edit-clinic-record/${record.id}`} className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition duration-200 mr-2">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(record.id)} className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700 transition duration-200">
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

export default ClinicRecordPage;
