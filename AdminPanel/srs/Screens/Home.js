import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Dashboard from './pages/Dashboard.js';
import Brands from './pages/Brands.js';

const HomeScreen = () => {
    return (
        <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/brands" element={<Brands />} />
                </Routes>
            </Sidebar>
        </BrowserRouter>
    );
};

export default HomeScreen;