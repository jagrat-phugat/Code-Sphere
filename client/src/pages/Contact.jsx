import React from 'react';
import Navbar from '../components/NavBar';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <div className="bg-gray-600 mb-4 shadow-lg shadow-black text-white py-16">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Contact Us</h1>
            <p className="mt-4 text-lg md:text-xl">
              Have questions? We'd love to hear from you. Get in touch with us!
            </p>
          </div>
        </div>

        <div className="bg-gray-800 mt-4 shadow-lg shadow-black text-white py-12">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Our Location</h2>
            <p className="text-lg md:text-xl mb-4">
              Indian Institute of Technology, Ropar (IITRPR)
            </p>
            <p className="text-lg md:text-xl">E-mail: jagratphugat111@gmail.com | Phone: +91 9719210059</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact
