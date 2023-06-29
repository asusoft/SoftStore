//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import FormInput from "../../components/FormInput";
import Header from "../../components/Header"
import { COLORS } from '../../../assets/constants/theme';
import { validateEmail } from '../../utils/Utils'
import icons from "../../../assets/constants/icons"
import FooterButton from '../../components/FooterButton';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { handleSignInError } from '../../contexts/errorHandler';
import Alert from '../../components/Alert';

// create a component
const SignIn = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { signIn, authUser, signOut } = useAuthContext();

    const [alertVisible, setAlertVisible] = useState(false);

    const hideAlert = () => {
        setAlertVisible(false);
    };

    const handleOnOK = () => {
        navigation.navigate('OTP', { email: email, password: password });
        hideAlert();
    };

    const handleSignIn = async () => {
        try {
            await signIn(email, password);
        } catch (error) {
            const errorMessage = error.message.trim();
            if (errorMessage.includes("Verify your account before signing in")) {
                setAlertVisible(true)
            }
            handleSignInError(error, setPasswordError, setEmailError)
        }
    }

    const isEnableSignUp = () => {
        return (
            email !== '' &&
            password !== '' &&
            emailError === ''
        );
    };

    const handleSignOut = () => {
        signOut()
    }

    function RenderHeader() {
        return (
            <Header
                title="SIGN IN"
                containerStyle={{
                    height: 50,
                    marginHorizontal: 20,
                    marginTop: 10
                }}
                titleStyle={{}}
                leftComponent={<View style={{ width: 40 }} />}
                rightComponent={<View style={{ width: 40 }} />}
            />
        );
    }

    function RenderForm() {
        return (
            <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                <View style={{ marginTop: 20 }}>
                    <FormInput
                        label="Email"
                        keyboardType="email-address"
                        placeholder="email@example.com"
                        inputContainerStyle={{
                            borderColor: email == ''
                                ? COLORS.grey
                                : email != '' && emailError == ''
                                    ? COLORS.grey
                                    : COLORS.red,
                        }}
                        onChange={value => {
                            validateEmail(value, setEmailError);
                            setEmail(value);
                        }}
                        errorMsg={emailError}
                        appendComponent={
                            <View style={styles.appendComponentEmail}>
                                <Image
                                    source={
                                        email == '' || (email != '' && emailError == '')
                                            ? icons.correct
                                            : icons.cancel
                                    }
                                    style={[
                                        styles.imageCorrect,
                                        {
                                            tintColor:
                                                email == ''
                                                    ? COLORS.gray
                                                    : email != '' && emailError == ''
                                                        ? COLORS.green
                                                        : COLORS.red,
                                        },
                                    ]}
                                />
                            </View>
                        }
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <FormInput
                        label="Password"
                        placeholder="Choose Password"
                        inputContainerStyle={{
                            borderColor: password == ''
                                ? COLORS.grey
                                : password != '' && passwordError == ''
                                    ? COLORS.gray
                                    : COLORS.red,
                        }}
                        onChange={value => {
                            setPasswordError('')
                            setPassword(value);
                        }}
                        secureTextEntry={!showPassword}
                        errorMsg={passwordError}
                        appendComponent={
                            <TouchableOpacity
                                style={styles.appendComponentPassword}
                                onPress={() => setShowPassword(!showPassword)}>
                                <Image
                                    source={showPassword ? icons.eye_close : icons.eye}
                                    style={{
                                        height: 20, width: 20, tintColor: COLORS.gray,
                                        tintColor: COLORS.gray
                                    }}
                                />
                            </TouchableOpacity>
                        }
                    />
                </View>

            </View>
        );
    }

    function RenderFooter() {
        return (
            <FooterButton
                disabled={isEnableSignUp() ? false : true}
                label="Sign In"
                footerStyle={{
                    position: "absolute",
                    bottom: 50,
                    right: 10,
                    left: 10,
                }}
                onPress={() => handleSignIn()}
            />
        );
    }

    const buttons = [
        { text: 'OK', style: { borderWidth: 0.5, borderColor: COLORS.white, borderEndColor: COLORS.lightGray }, onPress: handleOnOK },
        { text: 'Cancel', color: '#e74c3c', onPress: hideAlert },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}
            {RenderForm()}
            {RenderFooter()}
            <View
                style={{ marginHorizontal: 20, flexDirection: "row", marginTop: 25, alignSelf: 'flex-end' }}
            >
                <Pressable onPress={() => handleSignOut()}>
                    <Text style={{ fontSize: 16, color: COLORS.primary }}>
                        Forgot Password?
                    </Text>
                </Pressable>
            </View>
            <View
                style={{ marginHorizontal: 20, flexDirection: "row", marginTop: 25, alignSelf: 'center' }}
            >
                <Text style={{ fontSize: 16 }}>Don't have an account? </Text>
                <Pressable onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{ fontSize: 16, color: COLORS.primary }}>
                        Sign Up
                    </Text>
                </Pressable>
            </View>
            <Text style={{ fontSize: 16, color: COLORS.primary }}>
                {authUser?.email}
            </Text>
            <Alert visible={alertVisible} message="Verify your account before signing in" buttons={buttons} />
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    appendComponentEmail: {
        justifyContent: 'center',
    },
    appendComponentPassword: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageCorrect: {
        height: 20,
        width: 20,
    }
});

//make this component available to the app
export default SignIn;
