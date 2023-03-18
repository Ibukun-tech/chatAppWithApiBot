import { useState } from "react";
import Chat from "@/component/chat/index";
import LogIn from "@/component/login/index";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {
  const [user, setUser] = useState(null);
  const [secret, setSecret] = useState(null);
  const isAuth = Boolean(user) && Boolean(secret);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <Navigate to="/chat" />
              ) : (
                <LogIn setUser={setUser} setSecret={setSecret} />
              )
            }
          />
          <Route
            path="/chat"
            element={
              isAuth ? <Chat user={user} secret={secret} /> : <Navigate to="" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
