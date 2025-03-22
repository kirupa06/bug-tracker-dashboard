import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BugDashBoard from './components/BugDashboard';
import BugStatusUpdate from './components/BugStatusUpdate';
import CreateBug from './components/CreateBug';
import Navbar from './NavBar';
import { Analytics } from "@vercel/analytics/react";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={< BugDashBoard />} />
        <Route path="/bugStatusUpdate/:bugID" element={< BugStatusUpdate />} />
        <Route path="/createBug" element={< CreateBug />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
