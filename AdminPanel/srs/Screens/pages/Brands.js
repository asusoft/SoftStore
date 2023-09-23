import React from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import images from '../../../assets/constants/images';
import { COLORS } from '../../../assets/constants/theme';
import icons from '../../../assets/constants/icons';
import { CollectionReference } from 'firebase/firestore';

const Brands = () => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>Brands</Text>
                <Pressable style={{ flexDirection: 'row', padding: 8, backgroundColor: COLORS.darkPrimary, borderRadius: 6 }}>
                    <Image source={icons.plus} style={{ height: 20, width: 20, tintColor: COLORS.white }} />
                    <Text style={{ fontSize: 16, color: COLORS.white, marginLeft: 4 }}>Create New</Text>
                </Pressable>
            </View>
            <View style={{ flex: 1, width: '100%', backgroundColor: COLORS.white, borderRadius: 8, marginTop: 25, padding: 20 }}>
                <Text>Card</Text>

            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
});


export default Brands;