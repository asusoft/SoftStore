//import liraries
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

// create a component
const Header = ({
    leftComponent,
    middleComponent,
    rightComponent,
    headerStyle
}) => {
    return (
        <View>
            <View style={{ ...styles.top, ...headerStyle }}>
                {leftComponent}
                {middleComponent}
                {rightComponent}
                <StatusBar style="auto" />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    top: {
        margin: 5,
        marginHorizontal: 15,
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    }
});

//make this component available to the app
export default Header;
