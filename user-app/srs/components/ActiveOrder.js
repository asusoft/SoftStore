//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { COLORS, SIZES } from '../../assets/constants/theme';
import icons from '../../assets/constants/icons';

// create a component
const ActiveOrder = () => {
    return (
        <Pressable style={styles.activeOrder}>
            <View style={{
                flex: 1.5,
            }}>
                <Text style={{ fontSize: 18, color: COLORS.primary, fontWeight: '600' }}>Order QR-code</Text>
                <Text style={{ fontSize: 16, marginTop: 8, color: COLORS.oldPrimary, }}>Active</Text>
                <Text style={{ fontSize: 16, marginTop: 8, opacity: 0.5 }}>Show th QR code to an employee to get your order</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{
                    height: 65,
                    width: 65,
                    backgroundColor: COLORS.white,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 8
                }}>
                    <Image source={icons.qrcode} style={styles.qrCode} />
                </View>
                <Text style={{ fontSize: 16, fontWeight: 700 }}>code: 75824</Text>
            </View>
        </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
    activeOrder: {
        marginHorizontal: SIZES.padding + 5,
        height: 125,
        padding: 20,
        paddingHorizontal: 10,
        borderRadius: SIZES.radius,
        margin: 18,
        resizeMode: 'contain',
        backgroundColor: COLORS.secondary,
        flexDirection: 'row'
    },
    qrCode: {
        height: 50,
        width: 60,
        resizeMode: 'contain'
    }
});

//make this component available to the app
export default ActiveOrder;
