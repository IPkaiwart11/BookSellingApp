
// import React, { useEffect, useState } from "react";
// import { publicRequest } from "../requestMethods";
// import { useLocation } from "react-router-dom";

// function Myorder() {
//   const location = useLocation();
//   const id = location.pathname.split("/")[2];
//   const [cart, setCart] = useState({});

//   useEffect(() => {
//     const getCartData = async () => {
//       try {
//         const res = await publicRequest.get("/carts/find/"+id);
//         setCart(res.data);
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//     };
//     getCartData();
//   }, [id]);

//   return (
//     <div>
//       <h1>Your Order Details</h1>
//       <p>Total: Rs {cart.total}</p>
//       <ul>
//         {cart.products &&
//           cart.products.map((product, index) => (
//             <li key={index}>
//               <h3>{product.product.title}</h3>
//               <p>Description: {product.product.desc}</p>
//               <p>Quantity: {product.quantity}</p>
//               <p>Price: Rs {product.product.price}</p>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }

// export default Myorder;
// //////////////////////////
import React, { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import styled from "styled-components";
// import { useLocation } from "react-router-dom";

const Container = styled.div`
background-color:#d2f9fc;
margin-top:0px;
padding-top:0px;
color:#202626;
font-size:larger;
`

const Title = styled.h1`
padding:20px;
  color:blue;
`;

const Total = styled.p`
color:green;
font-size:25px;
`
const SingleCart = styled.div`
padding: 5px 50px 5px 50px;
border:2px-solid-gray;
background-color:#e8fdff;
margin-top:2px;
border-bottom:2px solid gray;
`



function Myorder() {
  const [carts, setCarts] = useState([]);
  
  useEffect(() => {
    const getAllCartsData = async () => {
      try {
        const res = await publicRequest.get("https://booksellingapp.onrender.com/api/carts");
        setCarts(res.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    getAllCartsData();
  }, []);

  return (
    <Container>
      <Title>Your Order Details</Title>
      {carts.length > 0 ? (
        carts.map((cart, cartIndex) => (
          <SingleCart key={cartIndex}>
            <Total>Total: Rs {cart.total}</Total>
            <ul>
              {cart.products &&
                cart.products.map((product, index) => (
                  <li key={index}>
                    <h3>{product.product.title}</h3>
                    <p>Description: {product.product.desc}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: Rs {product.product.price}</p>
                  </li>
                  
                ))}
            </ul>
          </SingleCart>
        ))
      ) : (
        <p>No order details found.</p>
      )}
    </Container>
  );
}

export default Myorder;
