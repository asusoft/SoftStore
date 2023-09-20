import { Image, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../assets/constants/theme';

const Category = ({ category }) => {
    const onPress = () => {
        console.warn('Category Pressed')
    }

    return (
        <View style={{ margin: 5, width: 140 }}>
            <Pressable style={styles.category}>
                <Image source={{ uri: category.icon }}
                    style={{
                        width: 130,
                        height: 135,
                        resizeMode: 'contain'
                    }} />
                <View style={{ padding: 5, borderRadius: 5, marginTop: 10 }}>
                    <Text style={{ fontSize: 18 }}>{category.name}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default Category;


const styles = StyleSheet.create({
    category: {
        width: 140,
        height: 220,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: COLORS.white,
        shadowOpacity: 0.1
    },
});
