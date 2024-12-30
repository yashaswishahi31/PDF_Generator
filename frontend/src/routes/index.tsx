import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from '../pages/SignUp';
import Login from '../pages/Login';
import AddProduct from '../pages/AddProducts';
import InvoicePage from '../pages/InvoicePage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;