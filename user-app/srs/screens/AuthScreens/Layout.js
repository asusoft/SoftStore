//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS, SIZES } from '../../../assets/constants/theme';
import images from '../../../assets/constants/images';

// create a component
const Layout = ({
    title,
    subtitle,
    titleContainerStyle,
    children,
}) => {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                scrollEnabled={true}
                style={{
                    flex: 1,
                    marginTop: 20,
                    backgroundColor: COLORS.background,
                }}
                enableAutomaticScroll={true}
                keyboardDismissMode="on-drag"
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding,
                }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={images.logo2}
                        resizeMode="contain"
                        style={styles.logo}
                    />
                </View>
                {/* Title & Subtitle */}
                <View style={{ ...titleContainerStyle }}>
                    <Text style={{ textAlign: 'center', color: COLORS.black, fontSize: 20, fontWeight: '700' }}>
                        {title}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLORS.black,
                            marginTop: SIZES.base,
                            fontSize: 14
                        }}>
                        {subtitle}
                    </Text>
                </View>
                {/* Content / Children */}
                {children}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    logo: {
        height: 80,
        width: 110,
    },
});

//make this component available to the app
export default Layout;
