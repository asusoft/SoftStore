import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthContext } from "../contexts/AuthContext";

import HomeScreen from "../Screens/Home";
import SignInScreen from "../Screens/SignIn";
import CreateBrand from "../Screens/pages/CreateBrand";



const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
    const { dbUser, authUser } = useAuthContext();
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {
                authUser ?
                    <RootStack.Screen name="Home" component={HomeStackNavigator} />
                    :
                    (
                        <>
                            <RootStack.Screen name="Sign In" component={HomeStackNavigator} />
                        </>
                    )

            }
        </RootStack.Navigator>
    )
}

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
            <HomeStack.Screen
                name="CreateBrand"
                component={CreateBrand}
            />
        </HomeStack.Navigator>
    );
};

export default RootNavigator