import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from './Alert'; 

function Read() {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getData();
  }, []); // Call getData when the component mounts

  function getData() {
    axios
      .get('https://6716015e33bc2bfe40bbf242.mockapi.io/crud-operation')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`https://6716015e33bc2bfe40bbf242.mockapi.io/crud-operation/${id}`)
      .then(() => {
        setAlertMessage("Data deleted successfully!");
        setShowAlert(true);
        getData();
      });
  }

  const setToLocalstorage = (id, name, email) => {
    localStorage.setItem('id', id);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
        {showAlert && <Alert message={alertMessage} onClose={closeAlert} />}
        <div className='d-flex justify-content-between m-2'>
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              checked={tabledark} 
              onChange={() => setTableDark(prev => !prev)} 
            />
          </div>
          <h1>Read</h1>
          <Link to="/">
            <button>Create</button>
          </Link>
        </div>

        <table className={`min-w-full border border-gray-200 rounded-md overflow-hidden ${tabledark ? 'table-dark' : ''}`}>
          <thead className={`${tabledark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <tr>
              <th className={`py-3 px-4 border-b text-left ${tabledark ? 'text-white' : 'text-gray-600'}`}>Name</th>
              <th className={`py-3 px-4 border-b text-left ${tabledark ? 'text-white' : 'text-gray-600'}`}>Email</th>
              <th className={`py-3 px-4 border-b text-left ${tabledark ? 'text-white' : 'text-gray-600'}`}>Edit</th>
              <th className={`py-3 px-4 border-b text-left ${tabledark ? 'text-white' : 'text-gray-600'}`}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((eachData) => (
              <tr key={eachData.id} className={`${tabledark ? 'bg-gray-800 text-white' : ''}`}>
                <td className={`py-3 px-4 border-b ${tabledark ? 'text-white' : ''}`}>{eachData.name}</td>
                <td className={`py-3 px-4 border-b ${tabledark ? 'text-white' : ''}`}>{eachData.email}</td>
                <td className={`py-3 px-4 border-b ${tabledark ? 'text-white' : ''}`}>
                  <Link to={`/Update/${eachData.id}`}>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-lg transition duration-200"
                      onClick={() => setToLocalstorage(eachData.id, eachData.name, eachData.email)}
                    >
                      Edit
                    </button>
                  </Link>
                </td>
                <td className={`py-3 px-4 border-b ${tabledark ? 'text-white' : ''}`}>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg transition duration-200"
                    onClick={() => handleDelete(eachData.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Read;
