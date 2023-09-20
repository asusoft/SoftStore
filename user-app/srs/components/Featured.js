import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import dummyData from '../../assets/constants/dummyData';
import { COLORS } from '../../assets/constants/theme';

const Featured = () => {

    const featuredData = dummyData.featuredData

    const renderItem = ({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: item.backgroundColor }]}>
            <View style={{ marginHorizontal: 12, paddingTop: 20, marginRight: 45, marginBottom: 30, marginStart: 20 }}>
                <Text style={{ fontSize: 14, color: item.backgroundColor === 'black' ? COLORS.white : COLORS.black, opacity: 0.6 }}>New</Text>
                <Text style={{ marginTop: 8, marginBottom: 10, fontSize: 30, fontWeight: '700', color: item.backgroundColor === 'black' ? COLORS.white : COLORS.black }}>{item.title}</Text>
                <Text style={{ fontSize: 15, color: item.backgroundColor === 'black' ? COLORS.white : COLORS.black, }}>{item.description}</Text>
            </View>

            <Image source={{ uri: item.image }} resizeMode='contain' style={{ height: 250, width: '100%', alignSelf: 'center' }} />


            <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: item.backgroundColor === 'black' ? COLORS.lightBlack : COLORS.lightGray2, height: 70, alignItems: 'center', padding: 20, flexDirection: 'row', justifyContent: 'space-between', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                <View>
                    <Text style={{ fontSize: 14, color: item.backgroundColor === 'black' ? COLORS.white : COLORS.black, fontWeight: '600' }}>From ₦ {item.price}</Text>
                </View>
                <View style={{ height: 24, width: 120, backgroundColor: item.backgroundColor === 'black' ? COLORS.white : COLORS.lightGray, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, color: COLORS.darkPrimary, fontWeight: '600' }}>BUY NOW</Text>
                </View>
            </View>
        </View>
    );

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={featuredData}
            pagingEnabled={true}
            decelerationRate={'fast'}
            snapToAlignment={'center'}
            snapToInterval={340}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatlistContent}
        />
    );
};

const styles = StyleSheet.create({
    flatlistContent: {
        paddingHorizontal: 25
    },
    itemContainer: {
        width: 320,
        height: 520,
        marginRight: 15,
        marginBottom: 40,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 20,  // Increase this for a more pronounced bottom shadow.
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,  // Adjust this to control the blur/spread of the shadow.
        elevation: 5
    },
    itemImage: {
        width: '100%',
        height: 400,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 10
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    itemDescription: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '500'
    }
});

export default Featured;
