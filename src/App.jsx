import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Main from "./Components/Main";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Login from "./Components/Login";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <br />
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
