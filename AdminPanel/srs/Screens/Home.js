import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Dashboard from './pages/Dashboard.js';
import Brands from './pages/Brands.js';
import CreateBrand from './pages/CreateBrand.js';
import Categories from './pages/Categories';

const HomeScreen = () => {
    return (
        <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/brands/createbrand" element={<CreateBrand />} />
                    <Route path="/brands" element={<Brands />} />
                    <Route path="/categories/add category" element={<CreateBrand />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
            </Sidebar>
        </BrowserRouter>
    );
};

export default HomeScreen;