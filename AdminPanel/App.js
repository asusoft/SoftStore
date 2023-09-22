import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider from './srs/contexts/AuthContext';
import RootNavigator from './srs/naviagtion';
import HomeScreen from './srs/Screens/Home';
import SignInScreen from './srs/Screens/SignIn';

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <RootNavigator />
      </AuthContextProvider>
    </NavigationContainer>
  );
}

