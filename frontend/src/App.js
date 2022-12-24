import { useEffect } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Header from "./../src/component/header";
import Footer from "./../src/component/footer";
import HomeScreen from "./screen/HomeProduct";
import ProductScreen from "./screen/ProductScreen";
import { Routes, Route } from "react-router-dom";
import CartScreen from "./screen/CartScreen";
import LoginScreen from "./screen/LoginScreen";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "./store/userAction";
import RegisterScreen from "./screen/registerScreen";
import ProfileScreen from "./screen/ProfileScreen";
import ShippingAddress from "./screen/ShippingScreen";
import PaymentScreen from "./screen/PaymentScreen";
import PlaceOrderScreen from "./screen/PlaceOrder";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isLoggedIn());
  }, [dispatch]);
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="products/:id" element={<ProductScreen />} />
            <Route path="cart/:id" element={<CartScreen />} />
            <Route path="cart" element={<CartScreen />} />
            <Route path="signIn" element={<LoginScreen />} />
            <Route path="register" element={<RegisterScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="shipping" element={<ShippingAddress />} />
            <Route path="payment" element={<PaymentScreen />} />
            <Route path="placeOrder" element={<PlaceOrderScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
