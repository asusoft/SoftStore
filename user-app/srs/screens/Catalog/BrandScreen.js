//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Animated, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import Header from '../../components/Header';
import images from '../../../assets/constants/images';
import { SimpleLineIcons } from "@expo/vector-icons";
import icons from '../../../assets/constants/icons';
import dummyData from '../../../assets/constants/dummyData';
import ItemCard from '../../components/ItemCard';
import { useNavigation } from '@react-navigation/native';
import Featured from '../../components/Featured';
import SoftTrade from '../../components/SoftTrade';

// create a component
const BrandScreen = ({ route }) => {
    const navigation = useNavigation()
    const { brand } = route.params;
    const products = dummyData.Products

    const [showStickyHeader, setShowStickyHeader] = useState(false);

    const handleScroll = (event) => {
        const yOffset = event.nativeEvent.contentOffset.y;
        if (yOffset > 50) { // Adjust this value as per your large title's height
            setShowStickyHeader(true);
        } else {
            setShowStickyHeader(false);
        }
    };
    return (
        <View style={styles.container}>
            <Header
                headerStyle={{
                    height: 105,
                    margin: 0,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    marginHorizontal: 0,
                    backgroundColor: COLORS.background,
                    padding: 15,
                    borderBottomWidth: showStickyHeader ? 1 : 0, borderBottomColor: COLORS.lightGray
                }}
                leftComponent={
                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Image
                            source={icons.back}
                            style={{
                                width: 30,
                                height: 25,
                                tintColor: COLORS.black
                            }}
                        />
                    </Pressable>
                }
                middleComponent={
                    <View style={{ marginStart: -30, opacity: showStickyHeader ? 1 : 0 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>{brand?.name}</Text>
                    </View>
                }
                rightComponent={
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                    </View>
                }
            />

            <FlatList
                onScroll={handleScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <>
                        <View style={{ marginHorizontal: 20, borderBottomWidth: 0.5, borderBottomColor: COLORS.lightGray }}>
                            <Text style={styles.largeTitle}>{brand?.name}</Text>
                        </View>
                        <View style={{ height: 100, marginTop: 10 }}>

                        </View>

                        <View style={{ marginTop: 10, flex: 1, height: 670, backgroundColor: COLORS.black }}>
                            <View style={{ marginHorizontal: 12, paddingTop: 20, marginRight: 45, marginBottom: 30 }}>
                                <Text style={{ fontSize: 14, color: COLORS.white, opacity: 0.6 }}>New</Text>
                                <Text style={{ marginTop: 8, marginBottom: 10, fontSize: 30, fontWeight: '700', color: COLORS.white }}>iPhone 15 Series</Text>
                                <Text style={{ fontSize: 15, color: COLORS.white }}>Strong, light, all-new titanium design. Apple's most advanced 48MP Main camera for incredible detail. And USB-C. Explore iPhone 15 series.</Text>
                            </View>
                            <Image source={{ uri: "https://static.itavisen.no/wp-content/uploads/2023/09/Screenshot-2023-09-12-at-20.47.01.png" }} style={{ height: 420, width: '100%' }} />

                            <View style={{ backgroundColor: COLORS.lightBlack, height: 70, alignItems: 'center', padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 16, color: COLORS.white, fontWeight: '700' }}>From ₦ 1,200,000</Text>
                                </View>
                                <View style={{ height: 30, width: 140, backgroundColor: COLORS.white, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color: COLORS.darkPrimary, fontWeight: '700' }}>BUY NOW</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 40, marginBottom: 40 }}>
                            <Text style={{ fontSize: 26, fontWeight: '700', marginHorizontal: 25, marginBottom: 15 }}>Featured</Text>
                            <Featured />
                        </View>

                        <View style={{ marginBottom: 40, paddingHorizontal: 25 }}>
                            <Text style={{ fontSize: 26, fontWeight: '700', marginBottom: 15 }}>Shop by product</Text>

                            <FlatList
                                data={products}
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ margin: 5, width: 165 }}>
                                            <Pressable onPress={() => navigation.navigate("ProductScreen", { product: item, title: item.name, back: brand?.name })} style={styles.product}>
                                                <Text style={{ fontSize: 16, marginVertical: 15, fontWeight: '700', marginHorizontal: 5 }}>{item.name}</Text>
                                                <Image source={{ uri: item.image }}
                                                    style={{
                                                        width: "100%",
                                                        height: 165,
                                                        resizeMode: 'contain'
                                                    }} />
                                            </Pressable>
                                        </View>
                                    );
                                }}
                            />
                        </View>

                        <SoftTrade />
                        <Image source={{ uri: "https://www.jumpplus.com/web/image/1247938-75a9817e/Multi-Product_MacBook_Air_M2_chip_iPad_10th-gen_AirPods_3rd-Gen_iPhone_14_Plus_iPhone_14_Apple_Watch_SE_Screen__USEN.png" }} style={{ width: '100%', height: 250 }} resizeMode='contain' />


                    </>
                )}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    largeTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 5
    },
    stickyHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'white',
        zIndex: 100,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
    },
    product: {
        paddingHorizontal: 10,
        width: 165,
        height: 240,
        borderRadius: 18,
        marginRight: 10,
        backgroundColor: COLORS.white,
    },
});

//make this component available to the app
export default BrandScreen;
