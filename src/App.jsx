import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Main from "./components/Main";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Main />} />
          </Routes>
          <br />
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
