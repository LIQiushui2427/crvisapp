import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About, Services, Contact, LoginRegisterPage, Home, TableauVizPage } from './pages';
function App() {
  return (
    <div>
      <h1>Singapore Weather Index</h1>
    <Router basename={process.env.PUBLIC_URL || "/"}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Viz" element={<TableauVizPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/loginRegister" element={<LoginRegisterPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
