import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import icons from '../../../assets/constants/icons';
import { NavLink, Outlet } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Card from '../../components/Card';


const Categories = () => {
    const db = getFirestore();
    const [categories, setCategories] = useState([]);

    React.useEffect(() => {
        const fetchBrands = async () => {
            const categoriesCollection = collection(db, 'Categories');
            const categorySnapshot = await getDocs(categoriesCollection);
            const fetchedCategories = categorySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCategories(fetchedCategories);
        };

        fetchBrands();
    }, []);

    return (
        <div>
            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 24, fontWeight: '600' }}>Categories</Text>

                                <NavLink to='add category'>
                                    <View style={{ flexDirection: 'row', padding: 8, backgroundColor: COLORS.darkPrimary, borderRadius: 6 }}>
                                        <Image source={icons.plus} style={{ height: 20, width: 20, tintColor: COLORS.white }} />
                                        <Text style={{ fontSize: 16, color: COLORS.white, marginLeft: 4 }}>Create New</Text>
                                    </View>
                                </NavLink>

                            </View>
                            <View style={{ flex: 1, width: '100%', backgroundColor: COLORS.white, borderRadius: 8, marginTop: 25, paddingTop: 0, paddingRight: 20 }}>
                                <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
                                    <FlatList
                                        data={categories}
                                        numColumns={2}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item }) => {
                                            return (
                                                <Card parent="categories" item={item} />
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


export default Categories;