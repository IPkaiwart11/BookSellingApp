import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../url';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const TrackingForm = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const navigate = useNavigate();

console.log(orderId);
  const [formData, setFormData] = useState({
    status: '',
    location:'',
  });
  
  const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormData({...formData,
      [name]: value,
    });
  }
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/orders/update-tracking/${orderId}`, formData);
      console.log('Tracking updated:', response.data);
    } catch (error) {
      console.error('Error updating tracking:', error);
    }
  };

  if (!orderId) {
    return (
      <div>
        Order ID is not available. Please navigate through the correct link.
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div style={{height:'50vh', marginTop:'10%', marginLeft:'5%'}}>
   
    <form onSubmit={handleUpdate}>
      <input type="text" name='status' onChange={handleChange} placeholder="Status" required />
      <input type="text" name='location' onChange={handleChange} placeholder="Location" required />
      <button type="submit">Update Tracking</button>
    </form>
    <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
    <Footer/>
    </>
  );
};

export default TrackingForm;
