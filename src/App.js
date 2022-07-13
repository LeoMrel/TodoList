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
import ResetForm from "./components/ResetForm";

export default function App() {
 const [user, setUser] = useState(null);
 const [isDarkTheme, setIsDarkTheme] = useState(false); 

 useEffect(() => {
  const storedPreference = eval(localStorage.getItem('prefersDarkMode'));
  if (storedPreference) setIsDarkTheme(JSON.parse(storedPreference));
}, []);
  
useEffect(() => {
  const html = document.getElementsByTagName('html').item(0)
  if (isDarkTheme) {
    localStorage.setItem('prefersDarkMode', 'true');
    html.classList.add('dark');
  }
  else {
    localStorage.setItem('prefersDarkMode', 'false');
    html.classList.remove('dark');
  }
}, [isDarkTheme]);


  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
      });

      return () => unsubscribe();
  }, []);

  const handleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <div className="app">
    <AuthContextProvider>
    <Container props={handleTheme}>
    <Router>
        <Routes>
            <Route path='/' element={user ? <Dashboard /> : <WelcomePage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/reset' element={<ResetForm />} />
        </Routes>
        </Router>
    </Container>
    </AuthContextProvider>
      </div>
  );
}