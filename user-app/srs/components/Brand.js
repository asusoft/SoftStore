import { Image, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../assets/constants/theme';
import { useNavigation } from '@react-navigation/native';

const Brand = ({ brand }) => {
    const navigation = useNavigation();

    return (
        <View style={{ margin: 5 }}>
            <Pressable onPress={() => navigation.navigate('BrandScreen', { brand: brand })} style={styles.brand}>
                <View style={{ padding: 5, borderRadius: 5, marginTop: 10 }}>
                    <Text style={{ fontSize: 20 }}>{brand.name}</Text>
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

export default Brand;


const styles = StyleSheet.create({
    brand: {
        paddingHorizontal: 12,
        height: 150,
        flexDirection: 'row',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
    },
});
