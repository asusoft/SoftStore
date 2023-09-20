import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import dummyData from '../../assets/constants/dummyData';
import { COLORS } from '../../assets/constants/theme';

function Adverts() {
    const bigAdverts = dummyData.BigAdverts;
    const smallAdverts = dummyData.SmallAdverts;

    const [adPosition, setAdPosition] = useState(0);

    // Create an array to hold the combined list with the desired pattern
    const combinedAdverts = [];
    let smallIndex = 0;
    let bigIndex = 0;

    while (smallIndex < smallAdverts.length || bigIndex < bigAdverts.length) {
        // Add two small adverts
        if (smallIndex < smallAdverts.length) {
            combinedAdverts.push({ type: 'small', data: smallAdverts[smallIndex] });
            smallIndex++;
        }
        if (smallIndex < smallAdverts.length) {
            combinedAdverts.push({ type: 'small', data: smallAdverts[smallIndex] });
            smallIndex++;
        }

        // Add one big advert
        if (bigIndex < bigAdverts.length) {
            combinedAdverts.push({ type: 'big', data: bigAdverts[bigIndex] });
            bigIndex++;
        }
    }

    const renderItem = ({ item }) => {
        if (item.type === 'small') {
            // Render small advert with its style
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.smallAdvert}
                >
                    <Image source={{ uri: item.data.image }} style={{ height: '100%', width: '100%', borderRadius: 8, resizeMode: 'stretch' }} />
                </TouchableOpacity>
            );
        } else {
            // Render big advert with its style
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.bigAdvert}
                >
                    <Image source={{ uri: item.data.image }} style={{ height: '100%', width: '100%', borderRadius: 8 }} />
                </TouchableOpacity>
            );
        }
    };

    return (
        <FlatList
            data={combinedAdverts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={adPosition}
        />
    );
}

export default Adverts;

const styles = StyleSheet.create({
    bigAdvert: {
        marginTop: 15,
        marginHorizontal: 15,
        height: 350,
        borderRadius: 8,
        backgroundColor: COLORS.secondary,
    },
    smallAdvert: {
        marginTop: 15,
        marginHorizontal: 15,
        height: 150,
        borderRadius: 8,
        backgroundColor: COLORS.secondary,
    },
});
