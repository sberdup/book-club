import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './routes/LandingPage'
import ContextLayout from "./context/ContextLayout";
import UserPage from "./routes/UserPage";
import ClubPage from "./routes/ClubPage";
import BookPage from "./routes/BookPage";
import NavBar from "./components/NavBar";
import './App.css'

function App() {
  const [user, setUser] = useState({id:false});
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  useEffect(() => {
    getUser()
  }, [])
  async function getUser() {
    const resp = await fetch('/me')
    const data = await resp.json()
    if (resp.ok) {
      setUser(data)
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* ContextLayout is encapsulating below routes to provide context */}
          <Route element={<ContextLayout values={{ user, setUser }} />}>
            <Route path="/" element={<LandingPage />} />
            <Route element={<NavBar />}>
              <Route path="/users/:userId" element={<UserPage />} />
              <Route path="/clubs/:clubId" element={<ClubPage />} />
              <Route path="/books/:bookId" element={<BookPage />} />
            </Route>
          </Route>
          <Route path="/testing" element={<h1>Test/Page Count: {count}</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;