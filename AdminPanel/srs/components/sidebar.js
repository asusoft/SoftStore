import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaBeer,
    FaThList
} from "react-icons/fa";

import { TbCategory2 } from "react-icons/tb"
import { Image, Pressable, View } from 'react-native';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import { COLORS } from '../../assets/constants/theme';
import images from '../../assets/constants/images'
import icons from '../../assets/constants/icons'


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/brands",
            name: "Brands",
            icon: <FaThList />
        },
        ,
        {
            path: "/categories",
            name: "Categories",
            icon: <TbCategory2 />
        }
    ]
    return (
        <div className="container">
            <div style={{ width: isOpen ? "300px" : "50px", borderLeftWidth: 2, borderLeftColor: COLORS.lightGray, }} className="sidebar">
                <View style={{ width: '100%', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray, flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between' }}>
                    <Image source={images.logo2} style={{ height: 60, width: 120, display: isOpen ? "block" : "none" }} resizeMode='contain' />
                    <Pressable onPress={toggle} style={{ alignItems: 'center', justifyContent: 'center', marginLeft: isOpen ? "80px" : "0px", display: "flex", marginVertical: isOpen ? "0px" : "20px" }} className="bars">
                        <Image source={icons.menu} style={{ height: 20, width: 20, tintColor: COLORS.black }} />
                    </Pressable>

                </View>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} style={{ marginRight: isOpen ? "20px" : "0px", marginLeft: isOpen ? "20px" : "0px", borderRadius: isOpen ? 8 : 0 }} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>
                <div className="header">
                    <Header />
                </div>
                <div className="scrollable-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Sidebar;