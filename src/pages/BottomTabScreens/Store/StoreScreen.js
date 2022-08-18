import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, FlatList, Image, Alert, ActivityIndicator, TouchableOpacity } from 'react-native'
import colors from '../../../common/colors'
import ProfileHeader from '../../../common/Components/ProfileHeader'
import { getHeightPixel, getWidthPixel } from '../../../common/helper'
import AddButton from '../Components/AddButton'
import { deleteStoreApi, getAllStores } from './API/storeApi'
import SingleStore from './Components/SingleStore'
import StoreHeader from './Components/StoreHeader'
import Icon from "react-native-vector-icons/AntDesign";
import ModalComponent from '../Messages/Components/ModalComponent'
import moment from 'moment'

const StoreScreen = ({ navigation }) => {
    const [stores, setStores] = useState([])
    const [showPopup, setShowPopup] = useState(false)
    const [delKey, setDelKey] = useState(-1)
    const [loading, setLoading] = useState(false)
    const allStoresRef = useRef([])

    const isFocused = useIsFocused()
    const [isApiCalled, setIsApiCalled] = useState(false)
    useEffect(() => {
        if (!isApiCalled) {
            setIsApiCalled(true)
        }
        getAllStoresFunc()
    }, [isFocused])

    const getAllStoresFunc = async () => {
        try {
            !isApiCalled ? setLoading(true) : null;
            const res = await getAllStores()
            setLoading(false)
            if (res.resultCode == 200) {
                // console.log('getAllStores -> ', JSON.stringify(res))
                console.log('getAllStores response here')
                if (res.data.length > 0) {
                    allStoresRef.current = res.data
                }
                let temp = [...res.data]
                var arr1 = temp.sort((a, b) => moment(b.updated_at) - (moment(a.updated_at)))
                setStores(arr1)
            } else {
                Alert.alert('Error', res.message?.message ? res.message?.message : 'Error while getting All stores')
            }
        } catch (e) {
            console.log('Error getAllStores -> ', e)
        } finally {
            setLoading(false)
        }
    }

    const deleteStore = async () => {
        try {
            setLoading(true)
            const res = await deleteStoreApi(delKey)
            setShowPopup(false)
            setLoading(false)
            if (res.resultCode == 200) {
                console.log('getAllConversations response here')
            } else {
                Alert.alert('Error', res.message?.message ? res.message?.message : 'Error while deleting store')
            }
        } catch (e) {
            console.log('Error in store deletion -> ', e)
        } finally {
            setLoading(false)
            setShowPopup(false)
            getAllStoresFunc()
        }
    }

    const rightActionSwipe = (item) => {
        return (
            <TouchableOpacity style={{
                width: 56.33,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {
                setShowPopup(true);
                setDelKey(item.id)
            }}>
                <View>
                    <Icon size={25} name="delete" color={"white"} />
                </View>
            </TouchableOpacity>
        )
    }

    const leftActionSwipe = (item) => {
        return (
            <TouchableOpacity style={{
                width: 56.33,
                backgroundColor: colors.primary,
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => navigation.navigate('AddStore', {
                storeObj: item,
                successFunc: () => successFunc()
            })} >
                <View>
                    <Icon size={25} name="edit" color={"white"} />
                </View>
            </TouchableOpacity>
        )
    }

    const onFilterList = (txt) => {
        let newList = []
        if (txt == "") {
            setStores(allStoresRef.current)
        }
        for (let i = 0; i < allStoresRef.current.length; i++) {
            let obj = allStoresRef.current[i]
            if (obj.name.toLowerCase().includes(txt.toLowerCase())) {
                newList.push(obj)
            }
        }
        setStores(newList)
    }

    const successFunc = () => {
        navigation.navigate("StoreScreen")
        getAllStoresFunc()
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView />
            <ProfileHeader navigation={navigation} />
            <StoreHeader
                title='Seller Account'
                onSearch={(txt) => onFilterList(txt)}
                onBack={() => navigation.goBack()}
            />
            <View style={{
                flex: 1,
                marginTop: getHeightPixel(12),
            }}>
                {
                    !loading ?
                        <FlatList
                            data={stores}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={() => {
                                return (
                                    <View style={{
                                        height: 500,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: getHeightPixel(16),
                                            textAlign: 'center',
                                            color: colors.mineShaft,
                                            fontFamily: 'Segoe UI',
                                            fontWeight: 'bold'
                                        }}>No stores found</Text>
                                    </View>
                                )
                            }}
                            renderItem={({ item, index }) => <SingleStore
                                item={item}
                                rightActionSwipe={() => rightActionSwipe(item)}
                                leftActionSwipe={() => leftActionSwipe(item)}
                                onPress={() => {
                                    navigation.push("ProductScreen", {
                                        storeId: item.id
                                    })
                                }}
                            />}
                        /> :
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                height: 500
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
                }
                <AddButton onPress={() => navigation.navigate('AddStore', {
                    successFunc: () => successFunc()
                })} />
            </View>
            {/* {Modal content here} */}
            <ModalComponent
                modalHeader='Confirm delete'
                modalContent='You are about to permanently this store from your account. Please confirm by clicking delete.'
                showPopup={showPopup}
                setShowPopup={(value) => setShowPopup(value)}
                loading={loading}
                onConfirm={deleteStore}
            />
        </View>
    )
}
export default StoreScreen