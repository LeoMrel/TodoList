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
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);
  
  
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
      });
      return () => unsubscribe();
  }, [])


  return (
    <div className="app">
    <AuthContextProvider>
    <Container>
    <Router>
        <Routes>
            <Route path='/' element={user ? <Dashboard /> : <WelcomePage />} />
            <Route path='/signup' element={<SignUpPage />} />
        </Routes>
        </Router>
    </Container>
    </AuthContextProvider>
      </div>
  );
}