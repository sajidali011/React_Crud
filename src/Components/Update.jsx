import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import Alert from './Alert';
function Update() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing data
    axios.get(`https://6716015e33bc2bfe40bbf242.mockapi.io/crud-operation/${id}`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://6716015e33bc2bfe40bbf242.mockapi.io/crud-operation/${id}`, { name, email })
      .then(() => {
        alert("Data updated successfully!");
        navigate("/read"); // Redirect to Create page
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating data!");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-96" onSubmit={handleUpdate}>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update</h2>
        
        <input 
          type="text" 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500" 
          required 
        />
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500" 
          required 
        />

        <button 
          type="submit" 
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default Update;
