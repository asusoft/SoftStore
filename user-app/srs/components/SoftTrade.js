//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { COLORS } from '../../assets/constants/theme';

// create a component
const SoftTrade = () => {
    return (
        <View style={{ marginVertical: 40, paddingHorizontal: 25 }}>
            <View style={{ flexDirection: 'row' }}>

                <Image source={{ uri: "/Users/softsavvy/Desktop/SoftStore/user-app/assets/icon.png" }} style={{ height: 25, width: 25 }} resizeMode='contain' />

                <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 15 }}>Soft Trade</Text>

            </View>
            <View style={{ width: '70%' }}>
                <Text style={{ fontSize: 26, fontWeight: '700', marginBottom: 15 }}>Where Old Meets New Potential.</Text>

            </View>
            <Text style={{ fontSize: 16 }}>Your current device holds the key. Unveil its trade-in value and pick: a shiny upgrade or a pocketful of cash.</Text>
            <Pressable>
                <Text style={{ fontSize: 16, color: COLORS.primary, marginTop: 15 }}>Learn more</Text>
            </Pressable>
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
    },
});

//make this component available to the app
export default SoftTrade;
