//import liraries
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import Header from '../../components/Header';
import { SimpleLineIcons } from "@expo/vector-icons";
import images from '../../../assets/constants/images';

// create a component
const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header
                leftComponent={
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 45,
                            backgroundColor: COLORS.background
                        }}
                    >
                        <Image
                            source={images.logo2}
                            style={{
                                width: 110,
                                height: 40,
                            }}
                        />
                    </View>
                }

                rightComponent={
                    <Pressable style={styles.location}>
                        <Text style={styles.locationText} numberOfLines={1}>
                            Kano
                        </Text>
                        <View style={styles.locationIcon}>
                            <SimpleLineIcons name="location-pin" size={17} color="black" />
                        </View>
                    </Pressable>
                }
            />
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    location: {
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.secondary
    },
    locationIcon: {
        marginLeft: 25
    },
    locationText: {
        color: "gray",
        fontWeight: "500",
        fontSize: 15,
    }
});

//make this component available to the app
export default HomeScreen;
