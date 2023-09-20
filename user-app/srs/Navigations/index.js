import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignUp from "../screens/AuthScreens/SignUp";
import SignIn from "../screens/AuthScreens/SignIn";
import OTP from "../screens/AuthScreens/OTP";
import ResetPassword from "../screens/AuthScreens/ResetPassword";
import Onboarding from "../screens/Onboarding/Onboarding";
import TempScreen from "../screens/Temp/TempScreen";
import { useAuthContext } from "../contexts/AuthContext";
import Loading from "../screens/Onboarding/Loading";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import { COLORS } from "../../assets/constants/theme";
import { Image } from "react-native";
import icons from "../../assets/constants/icons";
import { FontAwesome5 } from '@expo/vector-icons';

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
            }}
            tabBarOptions={{
                activeTintColor: COLORS.darkPrimary,
                labelStyle: {
                    fontSize: 14,
                },
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
                name="Catalog"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome5
                            name="list-ul"
                            color={focused ? color : 'gray'}
                            size={20}
                        />
                    ),
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

export default RootNavigator