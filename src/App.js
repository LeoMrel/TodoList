import Container from "./components/Container";
import {React, useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import SignUpPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import { AuthContextProvider } from "./components/Context/UserContext";
import { auth, firestore } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import ResetForm from "./components/ResetForm";

export default function App() {
 const [user, setUser] = useState({});

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      currentUser && localStorage.setItem('qqiud', JSON.stringify(currentUser.refreshToken));
});
  return () => unsubscribe();
}, []);

  return (
    <div className="app">
    <AuthContextProvider>
    <Container>
    <Router>
        <Routes>
            <Route path='/' element={user ? <Dashboard props={user} /> : <WelcomePage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/reset' element={<ResetForm />} />
        </Routes>
        </Router>
    </Container>
    </AuthContextProvider>
      </div>
  );
}