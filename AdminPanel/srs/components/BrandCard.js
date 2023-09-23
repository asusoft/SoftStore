import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../assets/constants/theme';
import { useNavigation } from '@react-navigation/native';

const BrandCard = ({ brand }) => {
    return (
        <View style={{ width: '50%', margin: 5 }}>
            <Pressable style={styles.brand}>
                <View style={{ padding: 5, borderRadius: 5, marginTop: 10 }}>
                    <Text style={{ fontSize: 24 }}>{brand.name}</Text>
                </View>
                <Image source={{ uri: brand.icon }}
                    style={{
                        width: 135,
                        height: 165,
                        resizeMode: 'contain'
                    }} />
            </Pressable>
        </View>
    );
};

export default BrandCard;


const styles = StyleSheet.create({
    brand: {
        paddingHorizontal: 12,
        height: 150,
        flexDirection: 'row',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.lightGray2,
    },
});
