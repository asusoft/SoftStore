import React from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import images from '../../../assets/constants/images';
import { COLORS } from '../../../assets/constants/theme';

const Dashboard = () => {
    return (
        <View style={styles.container}>
            <Text>DashBoard</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25
    },
});


export default Dashboard;