
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";



/* Components */
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import Books from "./Components/Books";
import About from "./Components/About";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <header>
            <nav>
              <Link to="/bookstore">Home</Link>
              <Link to="/books/">Books</Link>
              <Link to="/about/">About</Link>
            </nav>
          </header>
          <Routes>
            <Route path="/bookstore" element={<Home />}></Route>
            <Route path="/books" element={<Books />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
