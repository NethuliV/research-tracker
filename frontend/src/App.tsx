import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './Components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Milestones from './pages/Milestones';
import Documents from './pages/Documents';
import AdminPanel from './pages/AdminPanel';
import RequireAuth from './Components/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protect project and admin routes */}
          <Route path="/projects" element={<RequireAuth><Projects /></RequireAuth>} />
          <Route path="/projects/:id" element={<RequireAuth><ProjectDetails /></RequireAuth>} />
          <Route path="/projects/:id/milestones" element={<RequireAuth><Milestones /></RequireAuth>} />
          <Route path="/projects/:id/documents" element={<RequireAuth><Documents /></RequireAuth>} />
          <Route path="/admin" element={<RequireAuth><AdminPanel /></RequireAuth>} />

          {/* Default: show login first; user must sign in to see projects */}
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;