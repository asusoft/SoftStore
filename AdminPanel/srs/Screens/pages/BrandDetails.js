import React from 'react';
import { View, Image, Text, Pressable, StyleSheet, Button } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import images from '../../../assets/constants/images';
import { COLORS } from '../../../assets/constants/theme';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const BrandDetails = () => {
    const db = getFirestore();
    const { brandName } = useParams();
    const [brandDetails, setBrandDetails] = React.useState(null);

    const navigate = useNavigate();

    const goBack = () => {
        navigate("/brands");
    }

    React.useEffect(() => {
        const fetchBrandDetails = async () => {
            try {
                const brandsCollection = collection(db, 'Brands');
                const q = query(brandsCollection, where('name', '==', brandName));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const brandData = querySnapshot.docs[0].data();
                    setBrandDetails(brandData);
                } else {
                    console.error('No brand found with the given name');
                }
            } catch (error) {
                console.error('Error fetching brand details:', error);
            }
        };

        fetchBrandDetails();
    }, [brandName, db]);

    return (
        <View style={styles.container}>
            <Text>{brandDetails?.name}</Text>
            <Image source={{ uri: brandDetails?.icon }} resizeMode='contain' style={{ height: 100, width: 300 }} />

            <Button onPress={() => goBack()} style={{ height: 30, width: 30, }} />
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


export default BrandDetails;