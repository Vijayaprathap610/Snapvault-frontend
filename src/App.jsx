import React from 'react'
import { AuthProvider } from './Context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Components/Register';
import Login from './Components/Login'
import PhotosManagement from './Components/PhotosManagement';
import VideosManagement from './Components/VideosManagement';
import Footer from './Components/Footer';
import PrivateRoute from './Routes/PrivateRoute';
import AppNavbar from './Components/AppNavbar';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/photos" element={<PrivateRoute><PhotosManagement /></PrivateRoute>} />
          <Route path="/videos" element={<PrivateRoute><VideosManagement /></PrivateRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App