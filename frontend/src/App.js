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
import OrderScreen from "./screen/OrdersScreen";
import UserListScreen from "./screen/UserListScreen";
import UserEditScreen from "./screen/UserEditScreen";
import ProductListScreen from "./screen/ProductList";
import CreateProductScreen from "./screen/CreateProductScreen";
import ProductEditScreen from "./screen/productEditScreen";
import OrderListScreen from "./screen/orderListScreen";
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
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="products/:id" element={<ProductScreen />} />
            <Route path="cart/:id" element={<CartScreen />} />
            <Route path="cart" element={<CartScreen />} />
            <Route path="signIn" element={<LoginScreen />} />
            <Route path="register" element={<RegisterScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="shipping" element={<ShippingAddress />} />
            <Route path="payment" element={<PaymentScreen />} />
            <Route path="placeOrder" element={<PlaceOrderScreen />} />
            <Route path="orders/:id" element={<OrderScreen />} />
            <Route path="admin/userlist" element={<UserListScreen />} />
            <Route path="admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="admin/productlist" element={<ProductListScreen />} />
            <Route
              path="admin/product/:id/edit"
              element={<ProductEditScreen />}
            />

            <Route
              path="admin/createProduct"
              element={<CreateProductScreen />}
            />

            <Route path="admin/orderlist" element={<OrderListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
