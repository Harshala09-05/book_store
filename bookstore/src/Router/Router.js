import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LeftCard from '../Pages/Login/LeftCard';
import SignUp from '../Pages/Login/SignUp';
import Login from '../Pages/Login/Login';
import DashBoard from '../Pages/DashBoard/DashBoard';
import BookDetails from '../Component/BookDetails';
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';
import MyCart from '../Component/MyCart';

export default function Router() {
    const [page, setPage] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthRoute><LeftCard /></AuthRoute>} />
                <Route path="/signup" element={<AuthRoute><LeftCard page={page} setPage={setPage} /></AuthRoute>} />
                <Route path="/login" element={<AuthRoute><LeftCard page={page} setPage={setPage} /></AuthRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} >
                    
                    <Route path="bookDetails/:id" element={<BookDetails />} />
                    <Route path="cart" element={<MyCart />} />
                </Route>
                

                  {/* <Route path="/dashboard" element={<DashBoard />}>sss
                      </Route> */}
                   
               
                    {/* <Route path="bookDetails/:id" element={<ProtectedRoute><BookDetails /></ProtectedRoute>} />
                    <Route path="cart" element={<MyCart />} /> */}
                {/* </Route> */}
                {/* <Route path="bookDetails/:id" element={<ProtectedRoute><BookDetails /></ProtectedRoute>} */}
                     {/* <Route path="bookDetails/:id" element={<BookDetails />}/> */}
                    {/* <Route path="cart" element={<MyCart />} /> */}
            </Routes>
        </BrowserRouter>
    );
}
