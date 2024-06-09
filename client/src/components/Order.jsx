

import React, { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useSelector } from "react-redux";
import { BASE_URL } from "../url";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function Order() {
  const userId = useSelector((state)=> state.user.currentUser._id)
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const getAllCartsData = async () => {
      try {
        const res = await publicRequest.get(`${BASE_URL}/orders/find/${userId}`);
        // const res = await publicRequest.get(`http://localhost:5000/api/orders/find/${userId}`);
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    getAllCartsData();
  }, [userId]);

  return (
   <>
    <div 
    style={{
      background: 'white',
      }}>
    {orders.length > 0 ? (
      orders.map((order, orderIndex) => (
    <Paper
      key={orderIndex}
      sx={{
        p: 2,
        margin: 'auto',
        marginTop: '10px',
        maxWidth: '100%',
        flexGrow: 1,
        background: 'rgba(155,155,255,0.2)'
      }}
    >
      <Grid container spacing={2}>
      {order.products &&
        order.products.map((product, index) => (
          <Grid
            key={index}
            item
            container
            xs={12}
            md={8}
            spacing={2}
            direction='row'
          >
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="img" src={product.product.img} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom style={{fontWeight:'bold',color:'blue'}}>
                    {product.product.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Quantity: {product.quantity}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Language: {product.product.language}
                  </Typography> 
                  <Typography variant="body2" color="text.secondary">
                    Description: {product.product.desc}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" component="div">
                    Price: Rs {product.product.price}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" component="div">
            <b>Address:</b> {order.address.name} {order.address.address} {order.address.zipCode} {order.address.city} {order.address.state} {order.address.country}
          </Typography>
          <Typography sx={{ cursor: 'pointer' }} >
            <b>Total: Rs {order.total}</b>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
      ))
    ):(
      <h2>No orders yet</h2>
    )}
  </div>
  
</>
  );
}
