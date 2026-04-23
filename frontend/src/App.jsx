import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/Products/ProductDetail';
import Cart from './pages/Cart/Cart';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Contact from './pages/Contact/Contact';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Dashboard from './pages/Dashboard/Dashboard';
import Feedback from './pages/Feedback/Feedback';

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 3000 }} containerStyle={{ top: 80 }} limit={1} />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
