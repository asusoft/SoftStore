//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import Featured from '../../components/Featured';
import SoftTrade from '../../components/SoftTrade';

import dummyData from '../../../assets/constants/dummyData';
import Item from '../../components/Item';
// create a component
const ProductScreen = ({ route }) => {
    const { product } = route.params

    const items = dummyData.Items
    const itemImages = dummyData.Images

    const productIdToFilter = product?.id
    const filteredItems = items.filter(item => item.productID == productIdToFilter);


    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
                <>
                    <View style={{ marginTop: 30, marginBottom: 10 }}>
                        <Featured />
                    </View>
                    <View style={{ height: 80, marginTop: 10, borderBottomWidth: 1, borderTopWidth: 1, borderBottomColor: COLORS.lightGray, borderTopColor: COLORS.lightGray, marginHorizontal: 25, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Free delivery on some selected items</Text>
                        <Text style={{ fontSize: 14, marginTop: 7 }}>Or pick up available items at the SoftStore</Text>
                    </View>
                    <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 50, paddingVertical: 20, paddingBottom: 20 }}>
                        <FlatList
                            data={filteredItems}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <Item item={item} />
                                );
                            }}
                        />
                    </View>
                    <SoftTrade />
                </>
            )}
        />
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
});

//make this component available to the app
export default ProductScreen;
