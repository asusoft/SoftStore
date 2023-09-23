import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../assets/constants/theme';
import { useNavigation } from '@react-navigation/native';

import { Link } from 'react-router-dom';

const Card = ({ item, parent }) => {
    return (
        <Link to={`/${parent}/${item.name}`} style={{ width: '50%', margin: 5 }}>
            <Pressable style={({ hovered }) => [
                styles.item,
                hovered ? styles.itemHovered : null
            ]}>
                <View style={{ padding: 5, borderRadius: 5, marginTop: 10 }}>
                    <Text style={{ fontSize: 24 }}>{item.name}</Text>
                </View>
                <Image source={{ uri: item.icon }}
                    style={{
                        width: '40%', // or a fixed size that fits your design
                        height: '80%', // adjust based on your needs
                        resizeMode: 'contain',
                    }} />
            </Pressable>
        </Link>
    );
};

export default Card;


const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 12,
        height: 150,
        flexDirection: 'row',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.lightGray2,
    },
    itemHovered: {
        backgroundColor: COLORS.lightGray, // or any other styling changes for hover
    },
});
