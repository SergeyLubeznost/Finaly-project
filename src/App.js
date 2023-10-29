import React from "react";
import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import ReactRouterRoute from './header/header';
import Footer from './footer/footer'






function App() {

  return (
 <Router>
    <AuthProvider>
        <><ReactRouterRoute />
        <Footer /></>
  </AuthProvider>
  </Router>
  );
}

export default App;
