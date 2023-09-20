//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme';
import dummyData from '../../assets/constants/dummyData';
import images from '../../assets/constants/images';

// create a component
const Story = ({ item, setStory, setModalVisible }) => {

    return (
        <View style={{ margin: 5, width: 100 }}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.container}
            >
                <Image source={{ uri: item.image }} style={{ height: '100%', width: '100%', borderRadius: 8 }} />
                <View style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    alignSelf: 'center',
                    position: 'absolute', color: COLORS.secondary, fontWeight: '700', fontSize: 12, borderRadius: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', paddingHorizontal: 10, paddingVertical: 5
                }} />

                <Text style={{
                    position: 'absolute', color: COLORS.secondary, fontWeight: '600', fontSize: 14, bottom: 5, marginHorizontal: 7
                }}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 1,
        width: 100,
        height: 120,
        borderRadius: 8,
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: COLORS.darkPrimary,
        backgroundColor: COLORS.secondary,
    },
});

//make this component available to the app
export default Story;
