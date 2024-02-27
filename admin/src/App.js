// import Sidebar from "./components/sidebar/Sidebar";
// import Topbar from "./components/topbar/Topbar";
// import "./App.css";
// import Home from "./pages/home/Home";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";
// import UserList from "./pages/userList/UserList";
// import User from "./pages/user/User";
// import NewUser from "./pages/newUser/NewUser";
// import ProductList from "./pages/productList/ProductList";
// import Product from "./pages/product/Product";
// import NewProduct from "./pages/newProduct/NewProduct";
// import Login from "./pages/login/Login";
// import { useSelector } from "react-redux";

// function App() {
//   // const user = useSelector((state) => state.user || null) ;
//   const admin = useSelector((state) => state.user?.currentUser.isAdmin);
//   // const admin = useSelector((state) => state.user.isAdmin);
 

//   return (
//     <Router>
//      {/* <Switch>  */}
//         {/* <Route path="/login">
//           <Login />
//         </Route> */}
//         {/* <Route path="/login">{admin ? <Redirect to="/" /> : <Login />}
//              </Route> */}
//         {/* {admin && ( */}
//         { !admin ?
//          <Route path="/">
//          <Login />
//        </Route>
//   : 
//             <>  
//             <Topbar />
//             <div className="container">
//               <Sidebar />
//               <Route exact path="/">
//                 <Home />
//               </Route>
//               <Route path="/users">
//                 <UserList />
//               </Route>
//               <Route path="/user/:userId">
//                 <User />
//               </Route>
//               {/* <Route path="/newUser"> */}
//               <Route path="/register">
//                 <NewUser />
//               </Route>
//               <Route path="/products">
//                 <ProductList />
//               </Route>
//               <Route path="/product/:productId">
//                 <Product />
//               </Route>
//               <Route path="/newproduct">
//                 <NewProduct />
//               </Route>
//             </div>
//           </> 
// }
//            {/* )}   */}
//        {/* </Switch>  */}
//     </Router>
//   );
// }

// export default App;


import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser); // Add null check
  
  // Check if currentUser exists and isAdmin is true
  const isAdmin = currentUser && currentUser.isAdmin;

  return (
    <Router>
      {isAdmin ? (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/register">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
            </Switch>
          </div>
        </>
      ) : (
        <Route path="/">
          <Login />
        </Route>
      )}
    </Router>
  );
}

export default App;
