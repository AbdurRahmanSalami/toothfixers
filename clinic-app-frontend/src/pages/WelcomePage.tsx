// src/pages/WelcomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Navbar';
import Footer from '../components/Footer';

const WelcomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-green-800 mb-4">Welcome to Toothfixers</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
        Your all-in-one solution for managing dental records
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Link
            to="/patients"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            Patients
          </Link>
          <Link
            to="/clinic-records"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            Clinic Records
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WelcomePage;
