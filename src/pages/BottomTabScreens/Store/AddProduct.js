import React, { useRef, useState, useEffect } from 'react'
import { View, Alert, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, ImageStore } from 'react-native'
import ProfileHeader from '../../../common/Components/ProfileHeader'
import StoreHeader from './Components/StoreHeader'
import colors from '../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../common/helper'
import ButtonRound from '../../BottomTabScreens/Components/ButtonRound'
import ProductSlider from './Components/ProductSlider'
import { ScreenSize } from '../../../common/helper'
import ProductInfo from './Components/ProductInfo'
import ProductDetails from './Components/ProductDetails'
import ProductAttachments from './Components/ProductAttachments'
import ProductContent from './Components/ProductContent'
import { useIsFocused } from '@react-navigation/native'
import { addProductApi, getAllStores } from './API/storeApi'

const AddProduct = ({ navigation, route }) => {
    let ref = useRef();
    const [type, setType] = useState(0)
    const [loader, setLoader] = useState(false)
    const productObj = route.params?.productObj ? route.params?.productObj : null
    // console.log('productObj -> ', JSON.stringify(productObj))

    // Product Info states
    const categoryList = ['Dues', 'Lessons', 'Charitable Donations', 'Scholarship']
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedTags, setSelectedTags] = useState(productObj ? productObj.product_tags : [])
    const [name, setName] = useState(productObj ? productObj.name : '')
    const [slug, setSlug] = useState(productObj ? productObj.slug : '')
    const [tagItem, setTagItem] = useState('')
    const [storeObj, setStoreObj] = useState()

    // Product Details
    const [visibility, setVisibility] = useState(0)
    const [sku, setSku] = useState(productObj ? productObj.sku : '')
    const [barCode, setbarCode] = useState(productObj ? productObj.payload.barcode : '')
    const [regularPrice, setRegularPrice] = useState(productObj ? productObj.payload.regularPrice : '')
    const [salePrice, setSalePrice] = useState(productObj ? productObj.payload.salePrice : '')
    const [cost, setCost] = useState(productObj ? productObj.payload.cost : '')
    const [inventory, setInventory] = useState(0)
    const [shipping, setShipping] = useState(0)
    const [allowBackOrders, setAllowBackOrders] = useState(!productObj?.payload?.allowBackorder || productObj?.payload?.allowBackorder == '' ? false : true)
    const [currentStock, setCurrentStock] = useState('')
    const [minimumStock, setMinimumStock] = useState('')
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [location, setLocation] = useState('')

    // Product Attachments
    // const [imageArray, setImageArray] = useState(productObj ? productObj.attachments : []);
    const [imageArray, setImageArray] = useState([]);

    // Product Content
    const [sidebar, setSidebar] = useState('')
    const [description, setDescription] = useState('')

    const isFocused = useIsFocused()
    useEffect(() => {
        if (productObj) {
            setEditData()
        }
        getAllStoresFunc()
    }, [isFocused])

    // setData to Edit Product
    const setEditData = () => {
        if (productObj.categories.length !== 0) {
            let tempArray = []
            productObj.categories.map(item => {
                if (item.id == 1) {
                    tempArray.push('Dues')
                } else if (item.id == 2) {
                    tempArray.push('Charitable Donations')
                } else if (item.id == 3) {
                    tempArray.push('Lessons')
                } else {
                    tempArray.push('Scholarship')
                }
            })
            setSelectedCategories(tempArray)
        }
        // setting visibility
        if (productObj.visibility == 'public') {
            setVisibility(0)
        } else if (productObj.visibility == 'private') {
            setVisibility(1)
        } else {
            setVisibility(2)
        }
        // setting Inventory
        if (productObj.payload.inventory == 'none') {
            setInventory(0)
        } else if (productObj.payload.inventory == 'product') {
            setInventory(1)
        } else {
            setInventory(2)
        }
        // setting Shipping
        if (productObj.payload.shipping == 'none') {
            setShipping(0)
        } else if (productObj.payload.shipping == 'download') {
            setShipping(1)
        } else if (productObj.payload.shipping == 'carrier') {
            setShipping(2)
        } else {
            setShipping(3)
        }
        // setting Inventory stocks
        if (productObj.payload.allowBackorder) {
            setCurrentStock(productObj.payload.currentStock)
            setMinimumStock(productObj.payload.minStock)
        }
        // setting shipping dimensions
        if (productObj.payload.shipping == 'carrier') {
            setWidth(productObj.payload.width)
            setHeight(productObj.payload.height)
            setLength(productObj.payload.length)
            setLocation(productObj.payload.location)
        }
        // setting product content, sidebar and description
        if (productObj.payload.sidebar !== '') {
            let str = productObj.payload.sidebar.substring(3, productObj.payload.sidebar.length - 4)
            setSidebar(str)
        }
        if (productObj.payload.description !== '') {
            let str = productObj.payload.description.substring(3, productObj.payload.description.length - 4)
            setDescription(str)
        }
    }

    const getAllStoresFunc = async () => {
        try {
            const res = await getAllStores()
            if (res.resultCode == 200) {
                // console.log('getAllStores -> ', JSON.stringify(res))
                console.log('getAllStores response here')
                let obj = res.data.find(item => item.id == route.params?.storeId)
                setStoreObj(obj)
            } else {
                Alert.alert('Error', res.message?.message ? res.message?.message : 'Error while getting All stores')
            }
        } catch (e) {
            console.log('Error getAllStores -> ', e)
        }
    }

    const scrollPage = (index) => {
        console.log('btnPress');
        let x = 0;
        if (index == 0) {
            x = 0;
        }
        if (index == 1) {
            x = ScreenSize.width;
        }
        if (index == 2) {
            x = ScreenSize.width * 2;
        }
        if (index == 3) {
            x = ScreenSize.width * 3;
        }
        setType(index);
        ref.current?.scrollTo({ x: x, animated: true });
    };

    const onAddProduct = async () => {
        let Obj = {}
        Obj['storeId'] = route.params?.storeId;
        Obj['name'] = name;
        Obj['sku'] = sku;
        Obj['slug'] = slug;
        Obj['tags'] = selectedTags;
        Obj['visibility'] = visibility == 0 ? 'public' : visibility == 1 ? 'private' : 'hidden'
        let tempArr = []
        selectedCategories.map(item => {
            tempArr.push(
                item.toLowerCase() == 'dues' ? 1 :
                    item.toLowerCase() == 'lessons' ? 3 :
                        item.toLowerCase() == 'charitable donations' ? 2 : 4
            )
        })
        Obj['categoryIds'] = tempArr;
        Obj['files'] = imageArray;
        Obj['payload'] = {
            barcode: barCode,
            regularPrice: regularPrice,
            salePrice: salePrice,
            cost: cost,
            inventory: inventory == 0 ? 'none' :
                inventory == 1 ? 'product' : 'time',
            shipping: shipping == 0 ? 'none' :
                shipping == 1 ? 'download' :
                    shipping == 2 ? 'carrier' : 'free',
            allowBackorder: allowBackOrders,
            length: length,
            width: width,
            height: height,
            location: location,
            sidebar: sidebar,
            description: description
        }
        if (allowBackOrders) {
            Obj["payload"]["currentStock"] = currentStock,
                Obj["payload"]["minStock"] = minimumStock
        }
        try {
            setLoader(true)
            const res = await addProductApi(Obj)
            setLoader(false)
            if (res.resultCode == 200) {
                console.log('addProduct response here')
                Alert.alert("Success", "Product added successfully!", [
                    {
                        text: "OK",
                        onPress: () => {
                            route.params.successFunc()
                        },
                    },
                ]);
            } else {
                Alert.alert('Error', res.message?.message ? res.message?.message : 'Error while adding product')
            }
        } catch (e) {
            console.log('Error adding product ', e)
        } finally {
            setLoader(false)
        }
    }
    return (
        <View style={{ flex: 1, zIndex: 0, backgroundColor: 'white' }}>
            <SafeAreaView />
            <ProfileHeader navigation={navigation} />
            <StoreHeader
                title={productObj ? 'Update Product' : 'New Product'}
                noSearch
                onBack={() => navigation.goBack()}
                titleStyle={{ marginRight: 30 }}
            />
            <ProductSlider currentType={type} />
            {loader ?
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            height: 70,
                            width: 70,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "white",
                            borderRadius: 8
                        }}
                    >
                        <ActivityIndicator
                            size={"large"}
                            color={colors.primary}
                        />
                    </View>
                </View> :
                <ScrollView
                    scrollEnabled={false}
                    pagingEnabled={true}
                    scrollEventThrottle={16}
                    ref={ref}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{
                        backgroundColor: 'white',
                        // marginTop: getHeightPixel(12),
                    }}>
                    <ProductInfo
                        store={storeObj?.name ? storeObj?.name : 'Store'}
                        categoryList={categoryList}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={(arr) => setSelectedCategories(arr)}
                        selectedTags={selectedTags}
                        setSelectedTags={(arr) => setSelectedTags(arr)}
                        name={name}
                        setName={(txt) => setName(txt)}
                        slug={slug}
                        setSlug={(txt) => setSlug(txt)}
                        tagItem={tagItem}
                        setTagItem={(txt) => setTagItem(txt)}
                        onNext={() => {
                            scrollPage(1);
                        }}
                    />
                    <ProductDetails
                        visibility={visibility}
                        setVisibility={val => setVisibility(val)}
                        sku={sku}
                        setSku={val => setSku(val)}
                        barCode={barCode}
                        setbarCode={txt => setbarCode(txt)}
                        regularPrice={regularPrice}
                        setRegularPrice={txt => setRegularPrice(txt)}
                        salePrice={salePrice}
                        setSalePrice={txt => setSalePrice(txt)}
                        cost={cost}
                        setCost={txt => setCost(txt)}
                        inventory={inventory}
                        setInventory={txt => setInventory(txt)}
                        shipping={shipping}
                        setShipping={txt => setShipping(txt)}
                        allowBackOrders={allowBackOrders}
                        setAllowBackOrders={txt => setAllowBackOrders(txt)}
                        currentStock={currentStock}
                        setCurrentStock={txt => setCurrentStock(txt)}
                        minimumStock={minimumStock}
                        setMinimumStock={txt => setMinimumStock(txt)}
                        length={length}
                        setLength={txt => setLength(txt)}
                        width={width}
                        setWidth={txt => setWidth(txt)}
                        height={height}
                        setHeight={txt => setHeight(txt)}
                        location={location}
                        setLocation={txt => setLocation(txt)}
                        onBack={() => scrollPage(0)}
                        onNext={() => scrollPage(2)}
                    />
                    <ProductAttachments
                        imageArray={imageArray}
                        setImageArray={arr => setImageArray(arr)}
                        onBack={() => scrollPage(1)}
                        onNext={() => scrollPage(3)}
                    />
                    <ProductContent
                        sidebar={sidebar}
                        setSidebar={txt => setSidebar(txt)}
                        description={description}
                        setDescription={txt => setDescription(txt)}
                        onBack={() => scrollPage(2)}
                        onNext={() => onAddProduct()}
                    />
                </ScrollView>}
        </View >
    )
}

export default AddProduct

const styles = StyleSheet.create({
    locContainer: {
        paddingHorizontal: getWidthPixel(15),
        marginTop: getHeightPixel(10),
    },
    locTitle: {
        fontFamily: "Segoe UI",
        fontSize: getHeightPixel(16),
        fontWeight: "700",
        color: colors.mineShaft,
        marginBottom: getHeightPixel(5),
    },
    placesContainer: {
        position: "relative",
        alignSelf: "stretch",
        margin: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderColor: colors.accentGray,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: "white",
        shadowOpacity: 0,
        overflow: "hidden",
    },
    placesListContainer: {
        borderColor: colors.accentGray,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    placesInputContainer: {
        fontSize: getHeightPixel(16),
        fontFamily: "Segoe UI",
        backgroundColor: "transparent",
    },
})