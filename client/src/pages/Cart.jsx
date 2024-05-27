import React, { useState } from "react";
import { Add, Remove } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { NavLink } from "react-router-dom";
import { removeProduct } from "../redux/cartRedux";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
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
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductTypeOfBook = styled.div``;
const ProductLanguage = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = ({ inc, dec }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };


  return (
    <>
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <NavLink to="/">
              <TopButton>CONTINUE SHOPPING</TopButton>
            </NavLink>
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </Top>
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product key={product.id}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Books:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductTypeOfBook>
                        <b>Type of book:</b>{product.typeOfBook}
                      </ProductTypeOfBook>
                      <ProductLanguage>
                        <b>Language:</b> {product.language}
                      </ProductLanguage>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Remove onClick={() => dec(product.id)} />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Add onClick={() => inc(product.id)} />
                    </ProductAmountContainer>
                    <ProductPrice>
                      Rs {product.price * product.quantity}
                    </ProductPrice>
                    <Button onClick={() => handleRemoveProduct(product.id)}>
                      REMOVE FROM CART
                    </Button>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>Rs {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>Rs 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>Rs -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>Rs {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <NavLink to="/payment">
              <Button>ORDER NOW</Button>
              </NavLink>
            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
      
    </>
  );
};

export default Cart;


/////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { Add, Remove } from "@material-ui/icons";
// import { useSelector } from "react-redux";
// import styled from "styled-components";
// import Announcement from "../components/Announcement";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import { mobile } from "../responsive";
// // import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
// import { NavLink } from "react-router-dom";
// import {
//   removeProduct,
// } from "../redux/cartRedux";
// import { useDispatch } from "react-redux";
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Typography from '@mui/material/Typography';


// const Container = styled.div``;

// const Wrapper = styled.div`
//   padding: 20px;
//   ${mobile({ padding: "10px" })}
// `;

// const Title = styled.h1`
//   font-weight: 300;
//   text-align: center;
// `;

// const Top = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 20px;
// `;

// const TopButton = styled.button`
//   padding: 10px;
//   font-weight: 600;
//   cursor: pointer;
//   border: ${(props) => props.type === "filled" && "none"};
//   background-color: ${(props) =>
//     props.type === "filled" ? "black" : "transparent"};
//   color: ${(props) => props.type === "filled" && "white"};
// `;



// const Bottom = styled.div`
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ flexDirection: "column" })}
// `;

// const Info = styled.div`
//   flex: 3;
// `;

// const Product = styled.div`
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ flexDirection: "column" })}
// `;

// const ProductDetail = styled.div`
//   flex: 2;
//   display: flex;
// `;

// const Image = styled.img`
//   width: 200px;
// `;

// const Details = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
// `;

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// const ProductName = styled.span``;

// const ProductId = styled.span``;

// const ProductTypeOfBook = styled.div``;

// const ProductLanguage = styled.span``;

// const PriceDetail = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const ProductAmountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const ProductAmount = styled.div`
//   font-size: 24px;
//   margin: 5px;
//   ${mobile({ margin: "5px 15px" })}
// `;

// const ProductPrice = styled.div`
//   font-size: 30px;
//   font-weight: 200;
//   ${mobile({ marginBottom: "20px" })}
// `;

// const Hr = styled.hr`
//   background-color: #eee;
//   border: none;
//   height: 1px;
// `;

// const Summary = styled.div`
//   flex: 1;
//   border: 0.5px solid lightgray;
//   border-radius: 10px;
//   padding: 20px;
//   height: 50vh;
// `;

// const SummaryTitle = styled.h1`
//   font-weight: 200;
// `;

// const SummaryItem = styled.div`
//   margin: 30px 0px;
//   display: flex;
//   justify-content: space-between;
//   font-weight: ${(props) => props.type === "total" && "500"};
//   font-size: ${(props) => props.type === "total" && "24px"};
// `;

// const SummaryItemText = styled.span``;

// const SummaryItemPrice = styled.span``;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: black;
//   color: white;
//   font-weight: 600;
// `;

// const Cart = ({inc,dec}) => {
//   const cart = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
//   const handleClose = () => setOpen(false); 


    

// const handleRemoveProduct = (productId) => {
//   dispatch(removeProduct(productId));
// };

// const postDataToServer = async () => {
  
//   const body = {
//     // userId: "your_user_id", // Replace with the actual user ID
//     products: cart.products.map((product) => ({
//       product: {
//         title: product.title,
//         desc: product.desc,
//         img: product.img,
//         categories: product.categories,
//         language: product.language,
//         typeOfBook: product.typeOfBook,
//         price: product.price,
//         inStock: product.inStock,
//       },
//       quantity: product.quantity,
//     })),
//     total: cart.total,
//   };
//   ///////////////////
//   try {
//     // Make a POST request to your backend endpoint
//     // const response = await fetch("https://booksellingapp.onrender.com/api/carts", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },

//     //this is for only running site on local host
//     /////////////////////////////////////////////////////////////////
//     const response = await fetch("http://localhost:5000/api/carts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//    //////////////////////////////////////////////////////////////////   
//       // body: JSON.stringify({ cart }),
//       body: JSON.stringify(body),
//     });

//     if (response.ok) {
//       console.log("Cart data sent successfully");
//       // history.push("/success");
//       setOpen(true);
//     } else {
//       console.error("Failed to send cart data");
//     }
//   } catch (error) {
//     console.error("Error during fetch:", error);
//   }
// };
// /////
// console.log(cart);




//   return (
//     <>
//     <Container>
//       <Navbar />
//       <Announcement />
//       <Wrapper>
//         <Title>YOUR BAG</Title>
//         <Top>
//          <NavLink to="/"> 
//           <TopButton>CONTINUE SHOPPING</TopButton>
//           </NavLink>
//           {/* <TopTexts>
//             <TopText>Shopping Bag(2)</TopText>
//             <TopText>Your Wishlist (0)</TopText>
//           </TopTexts> */}
//           <TopButton type="filled">CHECKOUT NOW</TopButton>
//         </Top>
//         <Bottom>
//           <Info>
//             {cart.products.map((product) => (
//               <Product key={product.id}>
//                 <ProductDetail>
//                   <Image src={product.img} />
//                   <Details>
//                     <ProductName>
//                       <b>Books:</b> {product.title}
//                     </ProductName>
//                     <ProductId>
//                       <b>ID:</b> {product._id}
//                     </ProductId>
//                     <ProductTypeOfBook>
//                       <b>Type of book:</b>{product.typeOfBook}</ProductTypeOfBook> 
//                     <ProductLanguage>
//                       <b>Language:</b> {product.language}
//                     </ProductLanguage>
                   
//                   </Details>
//                 </ProductDetail>
//                 <PriceDetail>
//                   <ProductAmountContainer>
//                   <Remove onClick={()=>dec(product._id)} />
//                     <ProductAmount>{product.quantity}</ProductAmount>
//                     <Add onClick={()=>inc(product._id)} />
//                   </ProductAmountContainer>
//                   <ProductPrice>
//                     Rs {product.price * product.quantity}
//                   </ProductPrice>
//                   <Button onClick={() => handleRemoveProduct(product.id)}>
//             REMOVE FROM CART
//           </Button>
//                 </PriceDetail>
//               </Product>
//             ))}
//             <Hr />
//           </Info>
//           <Summary>
//             <SummaryTitle>ORDER SUMMARY</SummaryTitle>
//             <SummaryItem>
//               <SummaryItemText>Subtotal</SummaryItemText>
//               <SummaryItemPrice>Rs {cart.total}</SummaryItemPrice>
//             </SummaryItem>
//             <SummaryItem>
//               <SummaryItemText>Estimated Shipping</SummaryItemText>
//               <SummaryItemPrice>Rs 5.90</SummaryItemPrice>
//             </SummaryItem>
//             <SummaryItem>
//               <SummaryItemText>Shipping Discount</SummaryItemText>
//               <SummaryItemPrice>Rs -5.90</SummaryItemPrice>
//             </SummaryItem>
//             <SummaryItem type="total">
//               <SummaryItemText>Total</SummaryItemText>
//               <SummaryItemPrice>Rs {cart.total}</SummaryItemPrice>
//             </SummaryItem>
//              <Button onClick={postDataToServer}>ORDER NOW</Button>
//           </Summary>
//         </Bottom>
//       </Wrapper>
//       <Footer />
//     </Container>
//     <div>
    
//       <Modal
//         keepMounted
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="keep-mounted-modal-title"
//         aria-describedby="keep-mounted-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
//              your is Order successfully completed
//           </Typography>
//           <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
//              Visit again 
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//     </>
//   );
// };

// export default Cart;



