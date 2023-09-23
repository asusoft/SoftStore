import React, { useState } from 'react';
import { View, Image, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import images from '../../../assets/constants/images';
import { COLORS } from '../../../assets/constants/theme';
import icons from '../../../assets/constants/icons';
import { NavLink, Outlet } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




const Brands = () => {
    const db = getFirestore();
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchBrands = async () => {
            const brandsCollection = collection(db, 'Brands');
            const brandSnapshot = await getDocs(brandsCollection);
            const fetchedBrands = brandSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBrands(fetchedBrands);
        };

        fetchBrands();
    }, []);

    const goToDetails = ({ name }) => {
        navigate(`/brands/${name}`);
    }

    return (
        <div>


            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 24, fontWeight: '600' }}>Brands</Text>

                                <NavLink to='createbrand'>
                                    <View style={{ flexDirection: 'row', padding: 8, backgroundColor: COLORS.darkPrimary, borderRadius: 6 }}>
                                        <Image source={icons.plus} style={{ height: 20, width: 20, tintColor: COLORS.white }} />
                                        <Text style={{ fontSize: 16, color: COLORS.white, marginLeft: 4 }}>Create New</Text>
                                    </View>
                                </NavLink>

                            </View>
                            <View style={{ flex: 1, width: '100%', backgroundColor: COLORS.white, borderRadius: 8, marginTop: 25, paddingTop: 0, paddingRight: 20 }}>
                                <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
                                    <FlatList
                                        data={brands}
                                        numColumns={2}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item }) => {
                                            return (
                                                <Card
                                                    item={item}
                                                    parent="brands"
                                                />
                                            );
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                    </>
                )}
            />
            <Outlet /> {/* This will act as a placeholder for nested routes */}
        </div>
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