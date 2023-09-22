//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme'

// create a component
const FooterButton = ({
    label,
    onPress,
    disabled,
    footerStyle,
    rightComponent,
    leftComponent
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.Footer, ...footerStyle, }}
        >
            {leftComponent}
            <Text style={{ fontSize: 20, color: COLORS.light, fontWeight: "600" }}>
                {label}
            </Text>
            {rightComponent}
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    Footer: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 10,
        alignItems: "center",
        height: 60,
        borderRadius: 10,
        backgroundColor: COLORS.primary
    },
});

//make this component available to the app
export default FooterButton;
