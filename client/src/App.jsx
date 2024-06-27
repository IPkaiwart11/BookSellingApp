import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Myorder from "./pages/Myorder";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';

import Success from "./pages/Success";
import { useSelector } from "react-redux";
import PaymentPage from "./pages/PaymentPage";
import MyProfile from "./pages/MyProfile";
import TrackingForm from "./components/TrackingForm";
import TrackingInfo from "./components/TrackingInfo";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<PaymentPage/>} />
          <Route path="/success" element={<Success />} />
          <Route path="/myorder" element={<Myorder />} />
          <Route path="/myprofile" element={<MyProfile/>} />
          <Route path="/update-tracking/:id" element={<TrackingForm/>} />
          <Route path="/tracking/:id" element={<TrackingInfo/>} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
    </Routes>
  </Router>
  
  );
};

export default App;
