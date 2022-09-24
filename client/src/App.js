import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './routes/LandingPage'
import ContextLayout from "./context/ContextLayout";
import UserPage from "./routes/UserPage";
import ClubPage from "./routes/ClubPage";
import BookPage from "./routes/BookPage";

function App() {
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<ContextLayout values={[user, setUser]} />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/user/:userId" element={<UserPage />} />
            <Route path="/club/:clubId" element={<ClubPage />} />
            <Route path="/book/:bookId" element={<BookPage />} />
          </Route>
          <Route path="/testing" element={<h1>Test/Page Count: {count}</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;