

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { BASE_URL } from '../url';
import { useLocation, useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const Status = styled.p`
  font-size: 1.25rem;
  color: #555;
`;

const UpdatesList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const UpdateItem = styled.li`
  background: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  & > span {
    font-size: 0.9rem;
    color: #888;
  }
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const TrackingInfo = () => {
  const [tracking, setTracking] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders/tracking/${orderId}`);
        setTracking(response.data);
      } catch (error) {
        console.error('Error fetching tracking:', error);
      }
    };

    fetchTracking();
  }, [orderId]);

  if (!tracking) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Container>
        <Heading>Tracking Information</Heading>
        <Status>Status: {tracking.status}</Status>
        <UpdatesList>
          {tracking.updates.map((update, index) => (
            <UpdateItem key={index}>
              <span>{new Date(update.timestamps).toLocaleString()}</span>
              <div>{update.location} - {update.status}</div>
            </UpdateItem>
          ))}
        </UpdatesList>
        <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
      </Container>
      <Footer />
    </>
  );
};

export default TrackingInfo;
