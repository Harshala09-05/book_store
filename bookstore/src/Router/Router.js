import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LeftCard from '../Pages/Login/LeftCard';
import SignUp from '../Pages/Login/SignUp';
import Login from '../Pages/Login/Login';
import DashBoard from '../Pages/DashBoard/DashBoard';

export default function Router() {
    const [page, setPage] = useState(false);
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<LeftCard/>} />
        <Route path="/signup" element={<LeftCard page={page} setPage={setPage} />} />
        <Route path="/signin" element={<LeftCard page={page} setPage={setPage} />} />
        <Route path="/dashboard" element={<DashBoard/> } />
        
        </Routes>
    </BrowserRouter>
  )
}
