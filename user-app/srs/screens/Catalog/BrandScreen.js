//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Animated, FlatList, ScrollView } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import Header from '../../components/Header';
import images from '../../../assets/constants/images';
import { SimpleLineIcons } from "@expo/vector-icons";
import icons from '../../../assets/constants/icons';
import dummyData from '../../../assets/constants/dummyData';
import ItemCard from '../../components/ItemCard';

// create a component
const BrandScreen = ({ route }) => {
    const { brand } = route.params;

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
                    backgroundColor: COLORS.white,
                    padding: 15,
                }}
                leftComponent={
                    <View
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
                    </View>
                }
                middleComponent={
                    <View style={{ marginStart: -30, opacity: showStickyHeader ? 1 : 0 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>{brand?.name} Store</Text>
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

            <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
                <Text style={styles.largeTitle}>{brand?.name} Store</Text>
                {/* Your list of chats here */}
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    largeTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 15,
        marginHorizontal: 20
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
    }
});

//make this component available to the app
export default BrandScreen;
