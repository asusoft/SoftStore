import React from 'react';
import { View, Image, Text, Pressable, StyleSheet, Button, FlatList } from 'react-native';
import { getFirestore, collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import icons from '../../../assets/constants/icons';
import { NavLink, Outlet } from 'react-router-dom';
import { COLORS } from '../../../assets/constants/theme';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../../components/ItemCard';

const ProductDetails = () => {
    const db = getFirestore();
    const { brandName, productID, productName } = useParams();
    const [product, setProduct] = React.useState(null);
    const [items, setItems] = React.useState(null);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(`brands/${brandName}`);
    }

    async function fetchItemsByID(product_ID) {
        const itemsCollection = collection(db, 'Items');
        const q = query(itemsCollection, where('productID', '==', product_ID));

        try {
            const querySnapshot = await getDocs(q);
            const items = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            return items;
        } catch (error) {
            console.error('Error fetching items:', error);
            return [];
        }
    }


    React.useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const docRef = doc(db, "Products", productID);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct(docSnap.data());

                    const items = await fetchItemsByID(productID);
                    setItems(items);
                } else {
                    console.error("No such document!");
                }

            } catch (error) {
                console.error('Error fetching brand details:', error);
            }
        };

        fetchProductDetails();
    }, [productName, db]);

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: 220, backgroundColor: COLORS.white, borderRadius: 8 }}>
                <View style={{ height: '50%', width: "100", backgroundColor: COLORS.lightGray, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
                <View style={{ padding: 10, position: 'absolute', top: 25, left: 25, height: 170, borderWidth: 1, borderColor: COLORS.black, backgroundColor: COLORS.white, width: 170, borderRadius: 8 }}>
                    <Image source={{ uri: product?.icon }} resizeMode='contain' style={{ height: "100%", width: "100%" }} />
                </View>
                <View style={{ marginLeft: 220, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', marginEnd: 20 }}>
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: '600' }}>{product?.name}</Text>
                        <Text style={{ fontSize: 18, marginTop: 8 }}>{items?.length} items</Text>
                    </View>
                    <Pressable style={{ flexDirection: 'row', padding: 8, backgroundColor: COLORS.red, borderRadius: 6, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, color: COLORS.white }}>Make Unavailable</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ flex: 1, width: '100%', backgroundColor: COLORS.white, borderRadius: 8, marginTop: 25, paddingTop: 0, paddingRight: 20 }}>
                <View style={{ marginVertical: 20, marginHorizontal: 10, paddingHorizontal: 20 }}>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 24, fontWeight: '600', }}>Items</Text>
                        <NavLink to={`/brands/${brandName}/products/${product?.name}/add-item/${productID}`}>
                            <View style={{ flexDirection: 'row', padding: 8, backgroundColor: COLORS.darkPrimary, borderRadius: 6 }}>
                                <Image source={icons.plus} style={{ height: 20, width: 20, tintColor: COLORS.white }} />
                                <Text style={{ fontSize: 16, color: COLORS.white, marginLeft: 4 }}>Add Item</Text>
                            </View>
                        </NavLink>
                    </View>
                    <FlatList
                        data={items}
                        numColumns={4}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <ItemCard
                                    item={item}
                                />
                            );
                        }}
                    />
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