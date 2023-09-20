//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme';
import icons from '../../assets/constants/icons';

// create a component
const ItemCard = ({ item, onPress }) => {
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: COLORS.darkPrimary, width: '50%', alignItems: 'center', padding: 1 }}>
                <Text style={{ fontSize: 15, color: COLORS.white }}>Delivery</Text>
            </View>
            <Image
                source={{
                    uri: "https://static.iphoned.nl/orca/products/20136/apple-iphone-15-pro.png",
                }}
                style={{ height: 170, width: "80%", alignSelf: 'center', marginTop: 5 }}
                resizeMode='contain'
            />
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginTop: 5, fontSize: 18, fontWeight: '700' }}>₦ 1,200,000</Text>
                <Pressable onPress={() => console.log('Favorite')} style={styles.Like}>
                    <Image source={icons.heart} style={{ ...styles.Like, tintColor: COLORS.red }} />
                </Pressable>
            </View>
            <Text style={{ fontSize: 16, marginTop: 10 }}>Apple iPhone 15 Pro 128Gb {"(\White Titanium\)"}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 5,
        width: 168,
        marginRight: 25,
        marginBottom: 12
    },
    Like: {
        alignSelf: 'flex-end',
        height: 20,
        width: 25,
    },
});

//make this component available to the app
export default ItemCard;
