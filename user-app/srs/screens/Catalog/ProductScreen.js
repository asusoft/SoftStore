//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import Featured from '../../components/Featured';
import SoftTrade from '../../components/SoftTrade';

// create a component
const ProductScreen = ({ route }) => {
    const { product } = route.params
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
                        <View style={{ alignItems: 'center', }}>
                            <Image source={{ uri: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1693086290312" }} style={{ height: 200, width: "100%", marginTop: 10 }} resizeMode='contain' />
                            <Text style={{ marginTop: 30, fontSize: 24, fontWeight: '700', marginHorizontal: 20, textAlign: 'center' }}>iPhone 15 Pro & iPhone 15 Pro Max </Text>
                            <Text style={{ marginTop: 10, fontSize: 16, color: COLORS.primary }}>From ₦ 1,200,000</Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Image source={{ uri: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1693086290312" }} style={{ height: 200, width: "100%", marginTop: 10 }} resizeMode='contain' />
                            <Text style={{ marginTop: 30, fontSize: 24, fontWeight: '700', marginHorizontal: 20, textAlign: 'center' }}>iPhone 15 Pro & iPhone 15 Pro Max </Text>
                            <Text style={{ marginTop: 10, fontSize: 16, color: COLORS.primary }}>From ₦ 1,200,000</Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Image source={{ uri: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1693086290312" }} style={{ height: 200, width: "100%", marginTop: 10 }} resizeMode='contain' />
                            <Text style={{ marginTop: 30, fontSize: 24, fontWeight: '700', marginHorizontal: 20, textAlign: 'center' }}>iPhone 15 Pro & iPhone 15 Pro Max </Text>
                            <Text style={{ marginTop: 10, fontSize: 16, color: COLORS.primary }}>From ₦ 1,200,000</Text>
                        </View>
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
