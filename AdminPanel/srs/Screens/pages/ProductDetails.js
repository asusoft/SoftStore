import React from 'react';
import { View, Image, Text, Pressable, StyleSheet, Button, FlatList } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import icons from '../../../assets/constants/icons';
import { NavLink, Outlet } from 'react-router-dom';
import { COLORS } from '../../../assets/constants/theme';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';

const ProductDetails = () => {
    const db = getFirestore();
    const { brandName, productID, productName } = useParams();
    const [brand, setBrandDetails] = React.useState(null);

    const [products, setProducts] = React.useState([]);

    const navigate = useNavigate();

    const goBack = () => {
        navigate("/brands");
    }

    async function fetchProductsByBrand(brandID) {
        const db = getFirestore();
        const productsCollection = collection(db, 'Products');
        const q = query(productsCollection, where('brandID', '==', brandID));

        try {
            const querySnapshot = await getDocs(q);
            const products = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,        // Add the document ID
                    ...doc.data()      // Spread the rest of the document data
                };
            });
            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    React.useEffect(() => {
        const fetchBrandDetails = async () => {
            try {
                const brandsCollection = collection(db, 'Brands');
                const q = query(brandsCollection, where('name', '==', brandName));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    const brandData = {
                        id: doc.id,
                        ...doc.data()
                    };
                    setBrandDetails(brandData);

                    const products = await fetchProductsByBrand(brandData.id);
                    setProducts(products);

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
                    <Image source={{ uri: brand?.icon }} resizeMode='contain' style={{ height: "100%", width: "100%" }} />
                </View>
                <View style={{ marginLeft: 220, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', marginEnd: 20 }}>
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: '600' }}>{productName}</Text>
                        <Text style={{ fontSize: 18, marginTop: 8 }}>{products.length} items</Text>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 8, backgroundColor: COLORS.darkPrimary, borderRadius: 6, height: 40 }}>
                        <Text style={{ fontSize: 16, color: COLORS.white, marginLeft: 4 }}>Make Unavailable</Text>
                    </View>
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


export default ProductDetails;