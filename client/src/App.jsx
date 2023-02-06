import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import CreatePostPage from "./pages/CreatePostPage";

import Navbar from './components/Navbar'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useMemo, useState } from "react";
import { getTokenFromCookies } from "./helpers/cookies";
import { fetchValidate } from "./helpers/fetchValidate";

export const UserContext = createContext({
  user: {},
  setUser: () => { }
});

function App() {
  const [user, setUser] = useState();
  const value = useMemo(
    () => ({ user, setUser }),
    [user]
  );

  useEffect(() => {
    const token = getTokenFromCookies()

    if (token) {
      fetchValidate(token)
        .then(data => data.json())
        .then(data => {
          if (data.success) {
            setUser(data.data.user);
          }
        })
    }
  }, [])

  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<IndexPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route exact path="post/new" element={<CreatePostPage />} />
          <Route path="post/:post_id" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
