// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-800">Toothfixers</div>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-green-800 px-3 py-2">
            Home
          </Link>
          <Link to="/patients" className="text-gray-600 hover:text-green-800 px-3 py-2">
            Patients
          </Link>
          <Link to="/clinic-records" className="text-gray-600 hover:text-green-800 px-3 py-2">
            Clinic Records
          </Link>
          <Link to="/add-patient" className="text-gray-600 hover:text-green-800 px-3 py-2">
            Add Patient
          </Link>
          <Link to="/add-clinic-record" className="text-gray-600 hover:text-green-800 px-3 py-2">
            Add Clinic Record
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
