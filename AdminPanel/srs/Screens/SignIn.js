//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { COLORS } from '../../assets/constants/theme';
import FormInput from '../components/FormInput';
import FooterButton from '../components/FooterButton';
import { useAuthContext } from '../contexts/AuthContext';


// create a component
const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, dbUser, authUser, user, signUserOut } = useAuthContext();


    const handleSignIn = async () => {
        try {
            await signIn(email, password);
        } catch (error) {
            console.log(error)
        }
    }

    function RenderForm() {
        return (
            <View>
                <View style={{ marginTop: 20 }}>
                    <FormInput
                        keyboardType="email-address"
                        placeholder="Your email address"
                        onChange={value => {
                            setEmail(value);
                        }}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <FormInput
                        placeholder="Password"
                        onChange={value => {
                            setPassword(value);
                        }}
                    />
                </View>
            </View>
        );
    }

    function RenderFooter() {
        return (
            <FooterButton
                label="Log in"
                footerStyle={{
                    marginTop: 22,
                    height: 50,
                    marginHorizontal: 0
                }}
                onPress={() => handleSignIn()}
            />
        );
    }
    return (
        <View style={styles.container}>
            {RenderForm()}

            {RenderFooter()}

            <Text>{authUser?.email}</Text>
            <Pressable onPress={() => signUserOut()}>
                <Text>Sign Out</Text>
            </Pressable>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        backgroundColor: COLORS.background,
    },
});

//make this component available to the app
export default SignInScreen;
