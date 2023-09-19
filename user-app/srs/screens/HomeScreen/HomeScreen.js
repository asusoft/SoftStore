//import liraries
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, SIZES } from '../../../assets/constants/theme';
import Header from '../../components/Header';
import { SimpleLineIcons } from "@expo/vector-icons";
import images from '../../../assets/constants/images';
import { useAuthContext } from '../../contexts/AuthContext';
import icons from '../../../assets/constants/icons';
import ActiveOrder from '../../components/ActiveOrder';
import dummyData from '../../../assets/constants/dummyData';
import Story from '../../components/Story';

// create a component
const HomeScreen = () => {
    const { dbUser } = useAuthContext();
    const Storie = dummyData.Stories;
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
                                width: 105,
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
            <View style={styles.greetings}>
                <Text style={styles.greetingsText}>{dbUser?.name.split(' ')[0]}, nice to see you again!</Text>
            </View>
            {/*<ActiveOrder />*/}

            <View style={{ marginTop: 5, marginHorizontal: 10 }}>
                <FlatList
                    data={Storie}
                    horizontal
                    scrollEventThrottle={32}
                    pagingEnabled
                    snapToAlignment={'center'}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Story item={item} />
                        )
                    }}
                />
            </View>

            <TouchableOpacity
                style={styles.dayProduct}
            >
                <Image source={images.restaurant} style={{ height: '100%', width: '100%', borderRadius: 8 }} />
                <View style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    alignSelf: 'center',
                    position: 'absolute', color: COLORS.secondary, fontWeight: '700', fontSize: 12, borderRadius: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', paddingHorizontal: 10, paddingVertical: 5
                }} />
            </TouchableOpacity>

        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    dayProduct: {
        marginTop: 15,
        marginHorizontal: 15,
        height: 150,
        borderRadius: 8,
        backgroundColor: COLORS.secondary,
    },
    greetings: {
        marginHorizontal: 15,
        marginTop: 10
    },
    greetingsText: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20
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
        fontWeight: "500",
        fontSize: 15,
    },
    storyContainer: {
        padding: 1,
        width: 100,
        height: 120,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.darkPrimary,
        backgroundColor: COLORS.secondary,
    }
});

//make this component available to the app
export default HomeScreen;