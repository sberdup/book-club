import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './routes/LandingPage'

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/testing" element={<h1>Test/Page Count: {count}</h1>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;