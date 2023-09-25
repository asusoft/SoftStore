import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../assets/constants/theme';
import { useNavigation } from '@react-navigation/native';

import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
    return (
        <View style={styles.item}>
            <Image source={{ uri: item.icon }}
                style={{
                    width: '80%', // or a fixed size that fits your design
                    height: '80%', // adjust based on your needs
                    resizeMode: 'contain',
                }} />
            <View style={{ padding: 5, borderRadius: 5, marginBottom: 10 }}>
                <Text style={{ fontSize: 24 }}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                <Pressable style={{ borderWidth: 0.7, borderRadius: 6, paddingHorizontal: 8, backgroundColor: COLORS.white, marginRight: 8 }}>Edit</Pressable>
                <Pressable style={{ borderWidth: 0.7, borderRadius: 6, paddingHorizontal: 8, backgroundColor: COLORS.white, marginRight: 8 }}>Hide</Pressable>
                <Pressable style={{ borderWidth: 0.7, borderRadius: 6, paddingHorizontal: 8, backgroundColor: COLORS.white }}>Delete</Pressable>
            </View>
        </View>

    );
};

export default ItemCard;


const styles = StyleSheet.create({
    item: {
        padding: 20,
        height: 300,
        margin: 5,
        width: "24%",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightGray2,
    },
    itemHovered: {
        backgroundColor: COLORS.lightGray, // or any other styling changes for hover
    },
});
