import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LandingPage from './routes/LandingPage';
import ContextLayout from "./context/ContextLayout";
import UserPage from "./routes/UserPage";
import ClubPage from "./routes/ClubPage";
import BookPage from "./routes/BookPage";
import NavBar from "./components/NavBar";
import ClubGrid from "./components/ClubGrid";
import BookGrid from "./components/BookGrid";
import { Grommet } from 'grommet'
import { theme } from "./theme/theme.js"
import UserGrid from "./components/UserGrid";
import NewClubUser from "./components/NewClubUser";

function App() {
  const [user, setUser] = useState({ id: false })
  const [club, setClub] = useState({ id: false })
  const [book, setBook] = useState({ id: false })
  const [clubUser, setClubUser] = useState({ id: false })

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
      <Grommet className='App' theme={theme}>
        <Routes>
          <Route element={<ContextLayout values={{ user, setUser, club, setClub, book, setBook, clubUser, setClubUser }} />}>
            {/* ContextLayout is encapsulating below routes to provide context */}
            <Route path="/" element={<LandingPage />} />

            <Route element={<NavBar />}>
              {/* NavBar wraps around site after a user is logged in */}
              <Route path="homepage" element={<UserPage />}>
                {/* homepage for user should contain user's books and clubs */}
                <Route path="clubs" element={<ClubGrid />} />
                <Route path="books" element={<BookGrid source={'user'} />} />
              </Route>

              <Route path="/clubs/:clubId" element={<ClubPage />}>
                <Route path="books" element={<BookGrid source={'club'} />} />
                <Route path="users" element={<>
                  <NewClubUser />
                  <UserGrid source={'club'} />
                </>} />
              </Route>

              <Route path="/books/:bookId" element={<BookPage />} />

            </Route>

          </Route>
        </Routes>
      </Grommet>
    </BrowserRouter>
  );
}

export default App;