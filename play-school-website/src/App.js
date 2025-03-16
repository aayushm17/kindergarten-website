import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactUsPage';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Admin dashboard
import PrivateRoute from "./components/PrivateRoute";
import GalleryAdmin from "./components/GalleryAdmin";
import AboutAdmin from "./components/AboutAdmin";
import NewsAdmin from "./components/NewsAdmin";
import FaqAdmin from './components/FaqAdmin';
import HomeAdmin from './components/HomeAdmin';
import ContactAdmin from './components/ContactAdmin';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <PrivateRoute>
              <GalleryAdmin />
            </PrivateRoute>
  }

/>
<Route
          path="/admin/about"
          element={
            <PrivateRoute>
              <AboutAdmin />
            </PrivateRoute>
  }/>
  <Route
          path="/admin/news"
          element={
            <PrivateRoute>
              <NewsAdmin />
            </PrivateRoute>
  }/>
  <Route
          path="/admin/faqs"
          element={
            <PrivateRoute>
              <FaqAdmin />
            </PrivateRoute>
  }/>
  <Route
          path="/admin/home"
          element={
            <PrivateRoute>
              <HomeAdmin />
            </PrivateRoute>
  }/>
  <Route
          path="/admin/contact"
          element={
            <PrivateRoute>
              <ContactAdmin />
            </PrivateRoute>
  }/>
  
      </Routes>
      
    </Router>
  );
};

export default App;
