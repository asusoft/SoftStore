//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, FlatList, Dimensions, Image, Pressable } from 'react-native';
import { COLORS } from '../../../assets/constants/theme';
import icons from '../../../assets/constants/icons';
import ItemCard from '../../components/ItemCard';
import FooterButton from '../../components/FooterButton';

// create a component
const ItemInfoScreen = ({ route }) => {
    const item = route.params;
    const itemImagesArray = item?.item.images;
    const itemColors = item?.item.colors;
    const sizes = item?.item.sizes;
    const itemSizes = sizes.slice().sort((a, b) => a.price - b.price);
    const boxItems = item?.item.boxItems;

    const [selectedSize, setSelectedSize] = useState(-1);
    const [selectedColor, setSelectedColor] = useState(-1);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(-1);

    const [showPreview, setShowPreview] = useState(false)

    const { width, height } = Dimensions.get('screen');
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const isEnableAddToBag = () => {
        if (item?.item.hasSizes && item?.item.hasColors) {
            return (
                selectedSize !== -1 &&
                selectedColor !== -1 &&
                selectedPaymentMethod !== -1
            );
        } else {
            return selectedPaymentMethod !== -1
        }

    };

    const handlePress = () => {
        if (showPreview) {
            console.log("Adding to bag");
        } else {
            setShowPreview(true);
        }
    };

    function RenderImages() {
        return (
            <FlatList
                data={itemImagesArray}
                horizontal
                pagingEnabled={true}
                decelerationRate={'fast'}
                snapToAlignment={'center'}
                snapToInterval={400}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item.uri }} resizeMode='contain' style={{ height: 300, width: "100%", alignSelf: 'center' }} />
                        </View>
                    );
                }}
            />
        )
    }

    const Indicator = ({ scrollX }) => {
        return (
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                {
                    itemImagesArray.map((_, i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.6, 1, 0.6],
                            extrapolate: 'clamp'
                        })
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.8, 1, 0.8],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={`indicator=${i}`}
                                style={{
                                    height: 10,
                                    width: 10,
                                    borderRadius: 5,
                                    backgroundColor: COLORS.primary,
                                    opacity,
                                    margin: 5,
                                    transform: [{
                                        scale
                                    }]
                                }}
                            />
                        )
                    })
                }
            </View>
        )
    }

    const ColorPicker = () => {
        return (
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={itemColors}
                    numColumns={2}
                    renderItem={({ item, index }) => (
                        <View
                        >
                            <Pressable
                                onPress={() => { setSelectedColor(index) }}
                                style={{
                                    marginTop: 20,
                                    marginRight: 30,
                                    height: 70,
                                    width: 150,
                                    backgroundColor: COLORS.lightGray,
                                    borderRadius: 12,
                                    borderWidth: 2,
                                    borderColor: selectedColor === index
                                        ? COLORS.darkPrimary : COLORS.lightGray,
                                    padding: 5,
                                    opacity: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <View style={{ height: 25, width: 25, borderRadius: 15, backgroundColor: item.value, opacity: selectedColor === index ? 1 : 0.3 }} />

                                <Text style={{ marginTop: 5, fontSize: 16, opacity: selectedColor === index ? 1 : 0.3 }}>{item.name}</Text>

                            </Pressable>
                        </View>
                    )}
                />
            </View>
        )
    };

    const StoragePicker = () => {
        return (
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={itemSizes}
                    numColumns={2}
                    renderItem={({ item, index }) => (
                        <View
                        >
                            <Pressable
                                onPress={() => { setSelectedSize(index) }}
                                style={{
                                    marginTop: 20,
                                    marginRight: 30,
                                    height: 70,
                                    width: 150,
                                    backgroundColor: COLORS.lightGray,
                                    borderRadius: 12,
                                    borderWidth: 2,
                                    borderColor: selectedSize === index
                                        ? COLORS.darkPrimary : COLORS.lightGray,
                                    padding: 5,
                                    opacity: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style={{ marginTop: 5, fontSize: 16, opacity: selectedSize === index ? 1 : 0.3 }}>{item.value}</Text>
                                <Text style={{ marginTop: 5, fontSize: 16, opacity: selectedSize === index ? 1 : 0.3 }}>₦ {item.price}</Text>
                            </Pressable>
                        </View>
                    )}
                />
            </View>
        )
    };

    function RenderPaymentMethod() {
        return (
            <View style={{ paddingHorizontal: 30, marginBottom: 20, marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 10 }}>How Would You Like to Proceed?</Text>
                <Pressable
                    onPress={() => { setSelectedPaymentMethod(0) }}
                    style={{
                        opacity: 1,
                        backgroundColor: COLORS.lightGray,
                        borderWidth: 2,
                        borderColor: selectedPaymentMethod === 0
                            ? COLORS.darkPrimary : COLORS.lightGray,
                        ...styles.paymentMethod
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: "/Users/softsavvy/Desktop/SoftStore/user-app/assets/icon.png" }} style={{ height: 25, width: 25 }} resizeMode='contain' />
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>SoftTrade</Text>
                    </View>
                </Pressable>

                <Pressable
                    onPress={() => { setSelectedPaymentMethod(1) }}
                    style={{
                        opacity: 1,
                        backgroundColor: COLORS.lightGray,
                        borderColor: selectedPaymentMethod === 1
                            ? COLORS.darkPrimary : COLORS.lightGray,
                        ...styles.paymentMethod
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Pay Cash</Text>
                    </View>
                </Pressable>
            </View>
        )
    }

    const RenderInBox = () => {
        const scrollBOX = React.useRef(new Animated.Value(0)).current;

        const Indicater = ({ scrollBOX }) => {
            return (
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    {
                        boxItems.map((_, i) => {
                            const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                            const scale = scrollBOX.interpolate({
                                inputRange,
                                outputRange: [0.6, 1, 0.6],
                                extrapolate: 'clamp'
                            })
                            const opacity = scrollBOX.interpolate({
                                inputRange,
                                outputRange: [0.6, 1, 0.6],
                                extrapolate: 'clamp'
                            })
                            return (
                                <Animated.View
                                    key={`indicater=${i}`}
                                    style={{
                                        height: 3,
                                        width: 60,
                                        borderRadius: 5,
                                        backgroundColor: COLORS.transparent,
                                        opacity,
                                        marginTop: 5,
                                        transform: [{
                                            scale
                                        }]
                                    }}
                                />
                            )
                        })
                    }
                </View>
            )
        }
        return (
            <View style={{ marginBottom: 15 }}>
                <Text style={{ marginHorizontal: 25, fontSize: 20, fontWeight: '600', marginTop: 45 }}>In Your Box</Text>
                <FlatList
                    data={boxItems}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    decelerationRate={'fast'}
                    snapToAlignment={'center'}
                    snapToInterval={390}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollBOX } } }],
                        { useNativeDriver: false }
                    )}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <View
                                    style={styles.inBox}
                                >
                                    <Image source={{ uri: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-blacktitanium-witb-202309?wid=346&hei=784&fmt=jpeg&qlt=90&.v=1692829510589" }} resizeMode='contain' style={{ height: '100%', width: '100%', borderRadius: 8 }} />
                                </View>
                                <Text style={{ alignSelf: 'center', fontSize: 20, marginTop: 25, fontWeight: '600' }}>{item?.name}</Text>
                            </View>
                        );
                    }}
                />
                <View style={{ marginVertical: 20, alignItems: 'center' }}>
                    <Indicater scrollBOX={scrollBOX} />
                </View>
            </View>
        )
    }

    function RenderFooter() {
        return (
            <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: COLORS.lightGray2, padding: 10 }}>
                {
                    showPreview ? (
                        <View style={{ flexDirection: 'row', marginBottom: 10, }}>
                            <Image source={{ uri: itemImagesArray.length > 1 ? itemImagesArray[1].uri : itemImagesArray[0].uri }} resizeMode='contain' style={{ height: 70, width: 70 }} />
                            <View style={{ marginLeft: 30 }}>
                                <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: '600' }}>{item.item.name}</Text>
                                {item?.item.hasColors && <Text style={{ fontSize: 18, marginBottom: 5 }}>{itemColors[selectedColor].name}</Text>}
                                {item?.item.hasSizes && <Text style={{ fontSize: 16, marginBottom: 5 }}>{itemSizes[selectedSize].value}</Text>}
                                <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: '700' }}>₦ {item?.item.hasSizes ? itemSizes[selectedSize].price : item?.item.price}</Text>
                                <Text style={{ fontSize: 16, marginBottom: 5 }}>{selectedPaymentMethod === 0 ? 'SoftTrade' : 'Cash Payment'}</Text>
                            </View>
                            <Pressable onPress={() => setShowPreview(false)} style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 20 }}>
                                <Image source={icons.cross} style={{ height: 25, width: 25 }} />
                            </Pressable>
                        </View>
                    ) : []
                }
                <FooterButton
                    disabled={false}
                    label={showPreview ? "Add to Bag" : "Preview Your Choise"}
                    labelStyle={{
                        fontWeight: '500',
                        fontSize: 18
                    }}
                    footerStyle={{
                        marginTop: 2,
                        height: 45,
                        marginHorizontal: 0,
                        borderRadius: 8,
                        backgroundColor: COLORS.darkPrimary
                    }}
                    onPress={handlePress}
                />
            </View>
        )
    }

    return (
        <>
            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <>
                        <View style={{
                            height: 350,
                            backgroundColor: COLORS.white,
                            alignItems: 'center',
                        }}>
                            {RenderImages()}
                            {
                                itemImagesArray.length > 1 ? <Indicator scrollX={scrollX} /> : []
                            }
                        </View>
                        <View style={{ backgroundColor: COLORS.lightGray2, paddingVertical: 25, width: '100%', paddingHorizontal: 30, alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, fontWeight: '600' }}>Buy {item.item.name}</Text>
                            {
                                itemSizes && itemSizes.length > 0 && itemSizes[0]?.price ?
                                    <Text style={{ fontSize: 16, marginTop: 5 }}>Starts from ₦ {itemSizes[0].price}</Text>
                                    :
                                    <Text style={{ fontSize: 16, marginTop: 5 }}>At ₦ {item?.item.price} </Text>
                            }
                        </View>
                        <View style={{ paddingHorizontal: 30, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.lightGray, borderBottomColor: COLORS.lightGray, borderBottomWidth: 1 }}>
                            <Pressable style={{ height: 60, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Know the Specs</Text>
                                <Image source={icons.forward} style={{ height: 20, width: 20 }} />
                            </Pressable>
                        </View>

                        {
                            item?.item.hasColors && (
                                <View style={{ alignSelf: 'baseline', paddingHorizontal: 30, marginBottom: 20 }}>
                                    <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 10 }}>Paint Your Preference.</Text>
                                    <ColorPicker />
                                </View>
                            )
                        }
                        {
                            item?.item.hasSizes && (
                                <View style={{ alignSelf: 'baseline', paddingHorizontal: 30, marginBottom: 20 }}>
                                    <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 10 }}>Storage Solutions: Which Fits You Best?</Text>
                                    <StoragePicker />
                                </View>
                            )
                        }
                        {boxItems != null && <RenderInBox />}
                        <View style={{ backgroundColor: COLORS.white, paddingVertical: 25, width: '100%', paddingHorizontal: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Complete Your Setup</Text>
                            <View style={{ marginVertical: 20 }}>
                                <FlatList
                                    data={itemImagesArray}
                                    showsVerticalScrollIndicator={false}
                                    pagingEnabled={true}
                                    decelerationRate={'fast'}
                                    snapToAlignment={'center'}
                                    snapToInterval={180}
                                    renderItem={({ item }) => {
                                        return (
                                            <ItemCard />
                                        );
                                    }}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </View>
                        {RenderPaymentMethod()}
                        <View style={{ backgroundColor: COLORS.white, paddingVertical: 25, width: '100%', paddingHorizontal: 30, alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '600' }}>Can't decide Your choice?</Text>
                            <Text style={{ fontSize: 16, marginTop: 5 }}>Talk to our specialist</Text>
                        </View>

                        <View style={{ paddingHorizontal: 30, backgroundColor: COLORS.lightGray2, borderTopWidth: 1, borderTopColor: COLORS.lightGray, borderBottomColor: COLORS.lightGray, borderBottomWidth: 1 }}>
                            <Pressable style={{ height: 60, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.primary }}>Compare & Decide </Text>
                                <Image source={icons.forward} style={{ height: 20, width: 20, tintColor: COLORS.primary }} />
                            </Pressable>
                        </View>

                        <View style={{ paddingHorizontal: 30, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.lightGray, borderBottomColor: COLORS.lightGray, borderBottomWidth: 1, paddingTop: 30 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 15 }}>Delivery Information</Text>
                            <Pressable style={{ height: 60, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: COLORS.lightGray, }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Get It in Kano</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 16, marginEnd: 10 }}>Other</Text>
                                    <Image source={icons.forward} style={{ height: 20, width: 20 }} />
                                </View>
                            </Pressable>
                            <Pressable style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: COLORS.lightGray, paddingVertical: 20 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={icons.pickUp} style={{ height: 30, width: 30, alignSelf: 'center', marginEnd: 8 }} />
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 6 }}>Self Pick-Up in Kano</Text>
                                        <Text>from 1 to 3 days</Text>
                                    </View>
                                </View>
                                <Text style={{ fontSize: 16, marginEnd: 10 }}>Free</Text>
                            </Pressable>
                            <Pressable style={{ paddingVertical: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: COLORS.lightGray, marginBottom: isEnableAddToBag() ? 55 : 0 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={icons.delivery} style={{ height: 30, width: 30, alignSelf: 'center', marginEnd: 8 }} />
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 6 }}>Delivery across Kano</Text>
                                        <Text>from 1 to 3 days</Text>
                                    </View>
                                </View>
                                <Text style={{ fontSize: 16, marginEnd: 10 }}>₦ 1500</Text>
                            </Pressable>
                        </View>
                    </>
                )}
            />
            {
                isEnableAddToBag() && RenderFooter()
            }
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center'
    },
    imageContainer: {
        width: 400,
        backgroundColor: COLORS.white,
        height: 340,
        marginBottom: 20
    },
    paymentMethod: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        height: 70,
        borderRadius: 12,
        borderWidth: 2,
    },
    inBox: {
        marginTop: 25,
        height: 310,
        width: 340,
        marginHorizontal: 25,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: COLORS.white,
    },
});

//make this component available to the app
export default ItemInfoScreen;
