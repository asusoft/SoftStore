import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthContext } from "../contexts/AuthContext";

import HomeScreen from "../Screens/Home";
import SignInScreen from "../Screens/SignIn";



const RootStack = createNativeStackNavigator();


const RootNavigator = () => {
    const { dbUser, authUser } = useAuthContext();
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {
                authUser ?
                    <RootStack.Screen name="Home" component={HomeScreen} />
                    :
                    (
                        <>
                            <RootStack.Screen name="Sign In" component={SignInScreen} />
                        </>
                    )

            }
        </RootStack.Navigator>
    )
}

export default RootNavigator