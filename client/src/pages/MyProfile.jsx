import React, { useEffect, useState } from 'react';
import { Container, Paper, Avatar, Typography, Grid, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.8)',
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(14),
  height: theme.spacing(14),
  margin: 'auto',
  marginBottom: theme.spacing(2),
}));

const EditButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const MyProfile = () => {
  
  const user = useSelector((state)=> state.user.currentUser);
  const [getUser, setGetUser] = useState({});

  // console.log(user)
 
useEffect(()=>{
   setGetUser(user);
  },[user]);

  return (
   <>
   <Navbar/>
    <Container maxWidth="md" style={{height:'100vh'}}>



      <StyledPaper elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} align="center">
            <LargeAvatar alt="Profile Picture" src="https://via.placeholder.com/150" />
            <Typography variant="h6">{getUser.firstName} {getUser.lastName}</Typography>
            <Typography variant="body2" color="textSecondary">
              {getUser.email}
            </Typography>
            <EditButton startIcon={<EditIcon />}>Edit Profile</EditButton>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Divider />
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Full Name:</strong></Typography>
                <Typography variant="body2">{getUser.firstName} {getUser.lastName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Username:</strong></Typography>
                <Typography variant="body2">{getUser.username}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Phone:</strong></Typography>
                <Typography variant="body2">{getUser.phoneNumber}</Typography>
              </Grid>
              {/* <Grid item xs={6}>
                <Typography variant="body1"><strong>Address:</strong></Typography>
                <Typography variant="body2">123 Main St, Anytown, USA</Typography>
              </Grid> */}
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Date of Birth:</strong></Typography>
                <Typography variant="body2">{getUser.dateOfBirth}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Gender:</strong></Typography>
                <Typography variant="body2">{getUser.gender}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
    <Footer/>
    </>
  );
};

export default MyProfile;
