import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import CartView from "./views/CartView";
import { ToastContainer } from "react-toastify";
import UserProfileView from "./views/UserProfileView";
import PrivateRoute from "./components/PrivateRoute";
import ShippingScreen from "./views/ShippingView";
import PlaceOrderView from "./views/PlaceOrderView";
import OrderView from "./views/OrderView";
import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer theme="dark" position="bottom-right" />
        <Navbar />
        <Container className="my-5">
          <Routes>
            <Route index={true} path="/" element={<Products />} />
            <Route path="/search/:keyword" element={<Products />} />
            <Route path="/page/:pageNumber" element={<Products />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<Products />}
            />
            <Route path="productdetails/:id" element={<ProductDetails />} />
            <Route path="cart" element={<CartView />} />
            <Route path="" element={<PrivateRoute />}>
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/userprofile" element={<UserProfileView />} />
              <Route path="/placeorder" element={<PlaceOrderView />} />
              <Route path="/orderdetails/:id" element={<OrderView />} />
            </Route>

            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
