//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import dummyData from '../../assets/constants/dummyData';
import { COLORS } from '../../assets/constants/theme';
import { useNavigation } from '@react-navigation/native';

// create a component
const Item = ({ item }) => {

    const sizes = item?.sizes;
    const sortedSizes = sizes.slice().sort((a, b) => a.price - b.price);

    const navigation = useNavigation()
    return (
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('ItemInfoScreen', { item: item })} style={{ alignItems: 'center', }}>
            <Image source={{ uri: item.images[0].uri }} style={{ height: 200, width: "100%", marginTop: 10 }} resizeMode='contain' />
            <Text style={{ marginTop: 30, fontSize: 24, fontWeight: '700', marginHorizontal: 20, textAlign: 'center' }}>{item.name}</Text>
            <Text style={{ marginTop: 10, fontSize: 16, color: COLORS.primary }}>
                From ₦ {sortedSizes && sortedSizes.length > 0 && sortedSizes[0]?.price ? sortedSizes[0].price : item?.price}
            </Text>
        </TouchableOpacity>
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
