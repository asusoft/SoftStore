//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants/theme';

// create a component
const Header = () => {
    return (
        <View style={{ height: 61, width: '100%', borderBottomWidth: 1, borderBottomColor: COLORS.lightGray, flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between', backgroundColor: COLORS.white }}>


        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        position: 'absolute',
        top: 0
    },
});

//make this component available to the app
export default Header;
