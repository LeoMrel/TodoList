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
import ResetForm from "./components/ResetForm";
import { AuthContextProvider } from "./components/Context/UserContext";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
 const [user, setUser] = useState(null);

useEffect(() => {
  const token = localStorage.getItem('qqiud');
  if(token) setUser(JSON.parse(token))
 }, []);

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      currentUser && localStorage.setItem('qqiud', JSON.stringify(currentUser.uid));
});
  return () => unsubscribe();
}, []);

  return (
    <div className="app">
    <AuthContextProvider>
    <Container>
    <Router>
        <Routes>
            <Route path='/' element={user ? <Dashboard user={user} /> : <WelcomePage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/reset' element={<ResetForm />} />
        </Routes>
        </Router>
    </Container>
    </AuthContextProvider>
      </div>
  );
}