import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Dashboard from './pages/Dashboard.js';
import Brands from './pages/Brands.js';
import CreateBrand from './pages/CreateBrand.js';
import Categories from './pages/Categories';
import AddCategory from './pages/AddCategory';
import BrandDetails from './pages/BrandDetails';
import AddProduct from './pages/AddProduct';
import ProductDetails from './pages/ProductDetails';
import AddItem from './pages/AddItem';

const HomeScreen = () => {
    return (
        <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/brands/createbrand" element={<CreateBrand />} />
                    <Route path="/brands/:brandName/add-product/:brandID" element={<AddProduct />} />
                    <Route path="/brands/:brandName/products/:productName/add-item/:productID" element={<AddItem />} />
                    <Route path="/brands/:brandName/products/:productID/:productName" element={<ProductDetails />} />
                    <Route path="/brands/:brandName" element={<BrandDetails />} />
                    <Route path="/brands" element={<Brands />} />
                    <Route path="/categories/add category" element={<AddCategory />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
            </Sidebar>
        </BrowserRouter>
    );
};

export default HomeScreen;