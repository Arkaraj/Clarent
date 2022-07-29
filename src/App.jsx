import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Main from "./Components/Main";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import PublicRoute from "./Hocs/PublicRoutes";
import PrivateRoutes from "./Hocs/PrivateRoutes";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Products from "./Components/Products";
import ProductPage from "./Components/ProductPage";
import CartPage from "./Components/CartPage";
import SearchProducts from "./Components/SearchProducts";
// import TestLogin from "./Components/TestLogin";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoutes>
                  <Profile />
                </PrivateRoutes>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoutes>
                  <Products />
                </PrivateRoutes>
              }
            />
            <Route
              path="/product/:id"
              exact
              element={
                <PrivateRoutes>
                  <ProductPage />
                </PrivateRoutes>
              }
            />
            <Route
              path="/cart"
              exact
              element={
                <PrivateRoutes>
                  <CartPage />
                </PrivateRoutes>
              }
            />
            <Route
              path="/search/:productName"
              exact
              element={
                <PrivateRoutes>
                  <SearchProducts />
                </PrivateRoutes>
              }
            />
          </Routes>
          <br />
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
