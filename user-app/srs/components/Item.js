//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import dummyData from '../../assets/constants/dummyData';
import { COLORS } from '../../assets/constants/theme';

// create a component
const Item = ({ item }) => {
    const itemImages = dummyData.Images
    const filteredImage = itemImages.filter(image => image.itemId == item.id);
    const itemImage = filteredImage[0].uri[0];
    return (
        <View style={{ alignItems: 'center', }}>
            <Image source={{ uri: itemImage }} style={{ height: 200, width: "100%", marginTop: 10 }} resizeMode='contain' />
            <Text style={{ marginTop: 30, fontSize: 24, fontWeight: '700', marginHorizontal: 20, textAlign: 'center' }}>{item.name}</Text>
            <Text style={{ marginTop: 10, fontSize: 16, color: COLORS.primary }}>From ₦ 1,200,000</Text>
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
export default Item;
