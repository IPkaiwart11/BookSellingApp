import React, { useState } from 'react'
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { mobile, tablet } from '../responsive';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const FullBody = styled.div`
margin-top:10px;
display: flex;
flex-direction: row;
${mobile({ flexDirection: "column" })}
${tablet({ flexDirection: "column" })}
`;
const Top = styled.div`
display: flex;
flex:1
`
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Bottom = styled.div`
flex:1
`
const Container = styled.div`
  width: 100%;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80%;
  padding: 10px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
`;
const ProductDetailsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const ProductTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
`;
const Total  = styled.h2``;
const Image = styled.img`
  width:50%;
`




export default function Payment() {
   const cart = useSelector((state) => state.cart)
   const user = useSelector((state) => state.user.currentUser)
   const [open, setOpen] = useState(false);
   const handleClose = () => setOpen(false);
   const [formData, setFormData] = useState({
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const body = {
        userId:user._id,
        userName:user.username ,
        products: cart.products.map((product) => ({
          product,
          productId:product._id,
          quantity: product.quantity,
        })),
        total: cart.total,
        address: formData,
        // status: ,
      }
      try{
        const response = await fetch("https://booksellingapp.onrender.com/api/orders",{
        // const response = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
  
        ////////////////
  const handlePayment = async() => {
    const order = await response.json();
       
        const options = {
          key: 'rzp_test_cLK4B8WKJo7zsZ', 
          amount: order.total*100,
          currency: order.currency,
          name: 'Book Store',
          description: 'Test Transaction',
          order_id: order.id,
          handler: function (response) {
            alert("Payment successful! ID: " + response.razorpay_payment_id);
            setFormData({
              name: "",
              address: "",
              city: "",
              state: "",
              zipCode: "",
              country: "",
            })
            setOpen(true);
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999"
          },
          notes: {
            address: "Book Store Corporate Office"
          },
          theme: {
            color: "#3399cc"
          }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
          
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        rzp1.open();
      }
    ////////////////
        if (response.ok) {
          handlePayment();
          console.log(body);
          console.log("Cart data sent successfully");
          // handlePayment();
        } else {
          console.error("Failed to send cart data");
        }
  
  
  
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };
  return (
    <>
      <FullBody>
         <Top>
         <Container>
         <Wrapper>
            {cart.products.map((product,index) =>(
          <div key={index}>
            <Image src={product.img}/>
         <ProductTitle>{product.title}</ProductTitle>
      <ProductDescription> Description:{product.desc}</ProductDescription>
      <ProductPrice>Price: {product.price}</ProductPrice>
      <ProductPrice> Quantity: {product.quantity}</ProductPrice>
      </div>
   ))}
   </Wrapper>
   </Container>
         </Top>
     
         <Bottom>
         <Container>
      <Wrapper>
        <Title>Delivery Address</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="address"
            placeholder="Address Line"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          
            
           <Total> Total: Rs - {cart.total}</Total>
          
          
          <Button type="submit">Pay</Button>
        </Form>
      </Wrapper>
    </Container>
         </Bottom>

      </FullBody>
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
              Your Order is successfully completed
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              Visit again
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  )
}
