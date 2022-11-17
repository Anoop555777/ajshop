import "./App.css";
import { Container } from "react-bootstrap";
import Header from "./../src/component/header";
import Footer from "./../src/component/footer";
import HomeScreen from "./screen/HomeProduct";
import ProductScreen from "./screen/ProductScreen";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="products/:id" element={<ProductScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
