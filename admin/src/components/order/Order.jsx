

import React, { useEffect, useState } from "react";
// import { publicRequest } from "../requestMethods";
// import { styled } from '@mui/material/styles';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import ButtonBase from '@mui/material/ButtonBase';



// const Img = styled('img')({
//   margin: 'auto',
//   display: 'block',
//   maxWidth: '100%',
//   maxHeight: '100%',
// });



export default function Order() {
//   const [carts, setCarts] = useState([]);
  
  
//   useEffect(() => {
//     const getAllCartsData = async () => {
//       try {
//         // const res = await publicRequest.get("https://booksellingapp.onrender.com/api/carts");
//         const res = await publicRequest.get("http://localhost:5000/api/carts");
//         setCarts(res.data);
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//     };
//     getAllCartsData();
//   }, []);

  return (
   <>
   <h1>hi</h1>
    {/* <div 
    style={{
      background:'#cdfaf6',
      }}>
    {carts.length > 0 ? (
      carts.map((cart, cartIndex) => (
    <Paper
      key ={cartIndex}
      sx={{
        p: 2,
        margin: 'auto',
        marginTop: '10px',
        maxWidth: 600,
        flexGrow: 1,
        background:'rgba(253,187,45,1)'
      }}
    >
      {cart.products &&
                 cart.products.map((product, index) => (
      <Grid
      key={index}
      container spacing={2}
      >
      
        <Grid
        item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="img" src={product.product.img} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {product.product.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
               Quantity:  {product.quantity}
              </Typography>
              <Typography variant="body2" gutterBottom>
               Language:  {product.product.language}
              </Typography>
              <Typography variant="body2" color="text.secondary">
               Description : {product.product.desc}
              </Typography>
            </Grid>
            
          <Grid item>
            <Typography variant="subtitle1" component="div">
            Price: Rs  {product.product.price}
            </Typography>
          </Grid>
        </Grid>
          </Grid>
      </Grid>
                 ))}
    <Grid item sx={{width:'100%',display:'flex', justifyContent:'end' }}>
      <Typography sx={{ cursor: 'pointer'}} >
       <b>Total: Rs {cart.total}</b>
      </Typography>
    </Grid>
    </Paper>
      ))
    ):(
      <h2>this is Empty Order</h2>
    )}
  </div> */}
  
</>
  );
}

