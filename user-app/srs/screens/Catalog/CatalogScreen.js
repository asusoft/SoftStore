//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Pressable, FlatList } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import icons from '../../../assets/constants/icons';
import dummyData from '../../../assets/constants/dummyData';
import Brand from '../../components/Brand';
import Category from '../../components/Category';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


// create a component
const CatalogScreen = () => {
    const navigation = useNavigation()

    const db = firestore();
    const [brands, setBrands] = useState([]);

    React.useEffect(() => {

        db.collection("Brands")
            .onSnapshot((querySnapshot) => {
                const fetchedBrands = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Sort brands based on the createdAt timestamp
                const reversedBrands = fetchedBrands.reverse();

                setBrands(reversedBrands);
            });
    }, []);

    const goToBrand = ({ item }) => {
        navigation.navigate('BrandScreen')
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <>
                        <Pressable style={styles.SearchBar}>
                            <Image source={icons.search} style={{ height: 25, width: 25 }} />
                            <Text style={{ marginStart: 10, fontSize: 16 }}>Search</Text>
                        </Pressable>
                        <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
                            <FlatList
                                data={brands}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        <Brand brand={item} />
                                    );
                                }}
                            />
                        </View>
                    </>
                )}
            />
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    }, SearchBar: {
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        height: 45,
        borderRadius: 15,
        backgroundColor: COLORS.white,
    },
});

//make this component available to the app
export default CatalogScreen;
