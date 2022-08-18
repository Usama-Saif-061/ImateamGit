import React, { useEffect, useRef, useState } from "react"
import { ActivityIndicator, Alert, FlatList, SafeAreaView, View, Text } from "react-native"
import colors from "../../../common/colors"
import ProfileHeader from "../../../common/Components/ProfileHeader"
import AddButton from "../Components/AddButton"
import ModalComponent from "../Messages/Components/ModalComponent"
import StoreHeader from "../Store/Components/StoreHeader"
import { getAllProduct } from "./Api/ProductApi"
import SingleProduct from "./Components/SingleProduct"
const ProductScreen = ({ navigation, route }) => {
    const [products, setProducts] = useState([])
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [delProduct, setDelProduct] = useState()
    var storeRef = useRef("")
    var allProductRef = useRef([])
    useEffect(() => {
        console.log(route.params)
        if (route.params && route.params.storeId) {
            storeRef.current = route.params.storeId
        }
        getAllProductList()
    }, [])
    const getAllProductList = async () => {
        setLoader(true)
        try {
            const res = await getAllProduct()
            if (res.resultCode == 200) {
                var list = []
                for (let i = 0; i < res.data.length; i++) {
                    let obj = res.data[i]
                    if (storeRef.current == obj.store.id) {
                        list.push(obj)
                    }
                }
                allProductRef.current = list
                setProducts(list)
            } else {
                Alert.alert('Error', res.message?.message ? res.message?.message : 'Error while getting All stores')
            }
            setLoader(false)
        } catch (e) {
            console.log('Error getAllStores -> ', e)
            setLoader(false)
        }
    }
    const onFilterList = (txt) => {
        let newList = []
        if (txt == "") {
            setProducts(allProductRef.current)
        }
        for (let i = 0; i < allProductRef.current.length; i++) {
            let obj = allProductRef.current[i]
            if (obj.name.toLowerCase().includes(txt.toLowerCase())) {
                newList.push(obj)
            }
        }
        setProducts(newList)
    }
    const successFunc = () => {
        navigation.navigate("ProductScreen", {
            storeId: route?.params?.storeId
        })
        getAllProductList()
    }
    const deletePressed = () => {
        setShowPopup(false)
        console.log(`Delete Product ${delProduct.name}`)
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white"
            }}
        >
            <SafeAreaView />
            <ProfileHeader navigation={navigation} />
            <StoreHeader
                title='Services'
                onSearch={(txt) => onFilterList(txt)}
                onBack={() => navigation.goBack()}
            />
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#E5E5E5",
                    paddingHorizontal: 15
                }}
            >{
                    loader ?
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
                        </View>
                        :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            columnWrapperStyle={{
                                justifyContent: "space-between"
                            }}
                            ListEmptyComponent={() => {
                                return (
                                    <View
                                        style={{
                                            height: 500,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: "600",
                                                fontSize: 18,
                                                color: colors.mineShaft
                                            }}
                                        >
                                            No Product Found!
                                        </Text>
                                    </View>
                                )
                            }}
                            data={products}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ item }) => {
                                return (
                                    <SingleProduct
                                        product={item}
                                        onEdit={() => navigation.navigate('AddProduct', {
                                            productObj: item,
                                            storeId: route?.params?.storeId,
                                            successFunc: () => successFunc()
                                        })}
                                        onDelete={() => {
                                            setDelProduct(item);
                                            setShowPopup(true)
                                        }}
                                    />
                                )
                            }}
                        />
                }
            </View>
            <AddButton onPress={() => navigation.navigate('AddProduct', {
                storeId: route?.params?.storeId,
                successFunc: () => successFunc()
            })} />
            {/* {Modal content here} */}
            <ModalComponent
                modalHeader='Confirm delete'
                modalContent='You are about to permanently this product from your account. Please confirm by clicking delete.'
                showPopup={showPopup}
                setShowPopup={(value) => setShowPopup(value)}
                // loading={loading}
                onConfirm={() => deletePressed()}
            />
        </View>
    )
}
export default ProductScreen