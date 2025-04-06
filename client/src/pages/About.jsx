import React from 'react'
import Navbar from '../components/NavBar'

const About = () => {
  return (
    <>
    <Navbar />
    <div>
    <div className="min-h-screen bg-gray-100 text-gray-800">

  <div className="bg-gray-600 shadow-lg shadow-black text-white py-16">
    <div className="container mx-auto px-6 md:px-12 text-center">
      <h1 className="text-4xl md:text-6xl font-bold">About Our Online IDE</h1>
      <p className="mt-4 text-lg md:text-xl">
        Empowering developers with a fast, reliable, and collaborative coding experience.
      </p>
    </div>
  </div>


  <div className="container mx-auto px-6 md:px-12 py-12">
    <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">Key Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Real-Time Collaboration</h3>
        <p>Work together with your team in real time with live code sharing and editing.</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Language Support</h3>
        <p>Code in multiple programming languages with syntax highlighting and auto-completion.</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Cloud Storage</h3>
        <p>Access your projects from anywhere with secure cloud-based storage.</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Debugging Tools</h3>
        <p>Identify and fix issues efficiently with our integrated debugging tools.</p>
      </div>
    </div>
  </div>

  
  <div className="bg-gray-800 text-white py-12">
    <div className="container mx-auto px-6 md:px-12 text-center">
      <h2 className="text-2xl md:text-4xl font-bold mb-6">Our Mission</h2>
      <p className="text-lg md:text-xl">
        To create an intuitive and powerful online IDE that bridges the gap between collaboration and productivity,
        enabling developers to achieve their best work seamlessly.
      </p>
    </div>
  </div>

  
  <div className="py-12">
    <div className="container mx-auto px-6 md:px-12 text-center">
      <h3 className="text-xl md:text-2xl font-semibold mb-4">Ready to start coding?</h3>
     
    </div>
  </div>
</div>
  
    </div>

    </>
  )
}

export default About
