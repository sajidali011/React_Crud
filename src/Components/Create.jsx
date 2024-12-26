import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import Alert from './Alert'; // Alert component ko import karein

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://6716015e33bc2bfe40bbf242.mockapi.io/crud-operation', { name, email })
      .then(() => { 
        setAlertMessage("Data created successfully!");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/read");
        }, 2000); // Alert dikhane ke baad 2 seconds wait karein
      })
      .catch(() => {
        setAlertMessage("Error creating data!");
        setShowAlert(true);
      });
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {showAlert && <Alert message={alertMessage} onClose={closeAlert} />}
      <form className="bg-white p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
        <div className='d-flex justify-content-between m-2'>
          <h1>Create</h1>
          <Link to="/read">
            <button>Show Data</button>
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create</h2>
        
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500" 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <button 
          type="submit" 
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
