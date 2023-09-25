import React from 'react';
import { View, Image, Text, Pressable, StyleSheet, Button } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import images from '../../../assets/constants/images';
import icons from '../../../assets/constants/icons';
import { NavLink, Outlet } from 'react-router-dom';
import { COLORS } from '../../../assets/constants/theme';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const BrandDetails = () => {
    const db = getFirestore();
    const { brandName } = useParams();
    const [brand, setBrandDetails] = React.useState(null);

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
            <View style={{ width: '100%', height: 220, backgroundColor: COLORS.white, borderRadius: 8 }}>
                <View style={{ height: '50%', width: "100", backgroundColor: COLORS.lightGray, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
                <View style={{ padding: 10, position: 'absolute', top: 25, left: 25, height: 170, borderWidth: 1, borderColor: COLORS.black, backgroundColor: COLORS.white, width: 170, borderRadius: 8 }}>
                    <Image source={{ uri: brand?.icon }} style={{ height: "100%", width: "100%" }} />
                </View>

                <View style={{ marginLeft: 220, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', marginEnd: 20 }}>
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: '600' }}>{brand?.name}</Text>
                        <Text style={{ fontSize: 18, marginTop: 8 }}>6 Products</Text>
                    </View>
                    <NavLink to='createbrand'>
                        <View style={{ flexDirection: 'row', padding: 8, backgroundColor: COLORS.darkPrimary, borderRadius: 6 }}>
                            <Image source={icons.plus} style={{ height: 20, width: 20, tintColor: COLORS.white }} />
                            <Text style={{ fontSize: 16, color: COLORS.white, marginLeft: 4 }}>Add Product</Text>
                        </View>
                    </NavLink>
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
});


export default BrandDetails;