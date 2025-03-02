// src/routes.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import AddClinicRecordPage from './pages/AddClinicRecordPage';
import AddPatientPage from './pages/AddPatientPage';
import EditClinicRecordPage from './pages/EditClinicRecordPage';
import EditPatientPage from './pages/EditPatientPage';
import PatientPage from './pages/PatientPage';
import ClinicalRecordPage from './pages/ClinicalRecordPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/add-clinic-record" element={<AddClinicRecordPage />} />
        <Route path="/add-patient" element={<AddPatientPage />} />
        <Route path="/edit-clinic-record/:id" element={<EditClinicRecordPage />} />
        <Route path="/edit-patient/:id" element={<EditPatientPage />} />
        <Route path="/patients" element={<PatientPage />} />
        <Route path="/clinic-records" element={<ClinicalRecordPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
