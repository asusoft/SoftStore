import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image } from "react-native";


import Loading from "../screens/Onboarding/Loading";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SignUp from "../screens/AuthScreens/SignUp";
import SignIn from "../screens/AuthScreens/SignIn";
import OTP from "../screens/AuthScreens/OTP";
import ResetPassword from "../screens/AuthScreens/ResetPassword";
import Onboarding from "../screens/Onboarding/Onboarding";
import CatalogScreen from "../screens/Catalog/CatalogScreen";
import BrandScreen from "../screens/Catalog/BrandScreen";

import { useAuthContext } from "../contexts/AuthContext";

import { COLORS } from "../../assets/constants/theme";
import icons from "../../assets/constants/icons";


const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
    const { dbUser } = useAuthContext();
    const [loading, setLoading] = useState(true)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Cleanup the timer when the component unmounts or the dependency changes
        return () => clearTimeout(timer);
    })

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {
                    dbUser ?
                        <RootStack.Screen name="Tab" component={ButtomTabNavigator} />
                        :
                        (
                            <>
                                <RootStack.Screen name="Onboard" component={Onboarding} />
                                <RootStack.Screen name="Auth" component={AuthStackNavigator} />
                            </>
                        )

                }
            </RootStack.Navigator>
        )
    }
}

const ButtomTab = createBottomTabNavigator();

const ButtomTabNavigator = () => {
    return (
        <ButtomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarLabelStyle: {
                    "fontSize": 12
                },
                tabBarStyle: [
                    {
                        "display": "flex"
                    },
                    null
                ]
            }}
            initialRouteName="Home"
        >
            <ButtomTab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome5
                            name="home"
                            color={focused ? color : 'gray'}
                            size={20}
                        />
                    ),
                }}
            />
            <ButtomTab.Screen
                name="CatalogStack"
                component={CatalogStackNavigator}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome5
                            name="list-ul"
                            color={focused ? color : 'gray'}
                            size={20}
                        />
                    ),
                    tabBarLabel: 'Catalog',
                }}
            />
            <ButtomTab.Screen
                name="Bag"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome5
                            name="shopping-bag"
                            color={focused ? color : 'gray'}
                            size={20}
                        />
                    ),
                }}
            />
            <ButtomTab.Screen
                name="Favorites"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome5
                            name="heart"
                            color={focused ? color : 'gray'}
                            size={20}
                        />
                    ),
                }}
            />
            <ButtomTab.Screen
                name="Profile"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome5
                            name="user"
                            color={focused ? color : 'gray'}
                            size={20}
                        />
                    ),
                }}
            />
        </ButtomTab.Navigator>
    );
};


const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="SignUp"
        >
            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
            />
            <AuthStack.Screen
                name="SignIn"
                component={SignIn}
            />
            <AuthStack.Screen
                name="OTP"
                component={OTP}
            />
            <AuthStack.Screen
                name="Reset"
                component={ResetPassword}
            />
        </AuthStack.Navigator>
    );
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="HomeScreen"
        >
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
            />
        </HomeStack.Navigator>
    );
};

const CatalogStack = createNativeStackNavigator();

const CatalogStackNavigator = () => {
    return (
        <CatalogStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="CatalogScreen"
        >
            <CatalogStack.Screen
                name="Catalog"
                options={{
                    headerShown: true,
                }}
                component={CatalogScreen}
            />
            <CatalogStack.Screen
                name="BrandScreen"
                component={BrandScreen}
            />
        </CatalogStack.Navigator>
    );
};

export default RootNavigator