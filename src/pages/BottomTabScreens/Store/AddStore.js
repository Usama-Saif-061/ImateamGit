import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import PlacesInput from "react-native-places-input";
import Geocoder from "react-native-geocoding";
import ProfileHeader from '../../../common/Components/ProfileHeader'
import StoreHeader from './Components/StoreHeader'
import colors from '../../../common/colors'
import { getHeightPixel, getWidthPixel, GOOGLE_API_KEY } from '../../../common/helper'
import RadioButton from './Components/RadioButton';
import CheckBox from './Components/CheckBox';
import { checkBoxList } from './storeConstants';
import ButtonRound from '../../BottomTabScreens/Components/ButtonRound'
import { addStoreApi, updateStoreApi } from './API/storeApi';

const AddStore = ({ navigation, route }) => {
    const storeObj = route.params?.storeObj ? route.params?.storeObj : null;
    const [storeName, setStoreName] = useState(storeObj ? storeObj.name : '')
    const [description, setDescription] = useState(storeObj ? storeObj.payload?.description : '')
    const [location, setLocation] = useState(storeObj?.locations[0] ? storeObj?.locations[0]?.address : '')
    const [placeId, setPlaceId] = useState("");
    const [salesType, setSalesType] = useState(
        storeObj && storeObj.seller?.payload?.salesType == 'onlineOnly' ? 1 : 0
    )
    const [checkedArray, setCheckArray] = useState(storeObj ? storeObj?.payload?.productTypes : [])
    const [loading, setLoading] = useState(false)
    const ref = useRef(null);

    const addStoreFunc = async () => {
        if (storeName == '') {
            Alert.alert('Alert!', 'Store name cannot be empty.')
            return;
        }
        if (location == '') {
            Alert.alert('Alert!', 'Location name cannot be empty.')
            return;
        }
        if (placeId == '' && !storeObj) {
            Alert.alert('PlaceId Empty!', 'Kindly add new location')
            return;
        }
        if (checkedArray.length == 0) {
            Alert.alert('Alert!', 'Atleast, one sold item has to be selected.')
            return;
        }
        if (description == '') {
            Alert.alert('Alert!', 'Description cannot be empty.')
            return;
        }
        let body = {}
        if (storeObj) {
            body["storeId"] = storeObj.id
        }
        body["name"] = storeName
        if (!storeObj) {
            body["location"] = {
                description: location,
                place_id: placeId
            }
        } else {
            body["location"] = storeObj.location
        }
        body["payload"] = {
            salesType: salesType == 0 ? 'retail' : 'onlineOnly',
            productTypes: checkedArray,
            description: description
        }
        try {
            setLoading(true)
            console.log('body -> ', body)
            const res = storeObj ? await updateStoreApi(body) : await addStoreApi(body)
            setLoading(false)
            if (res.resultCode == 200) {
                console.log('update store response here')
                Alert.alert("Success!", `Store ${!storeObj ? 'created' : 'updated'} successfully.`, [
                    { text: "OK", onPress: () => route.params.successFunc() },
                ]);
            } else {
                Alert.alert('Error', res.message?.message ? res.message?.message : 'Error while creating store')
            }
        } catch (e) {
            console.log('Error creating store ', e)
        } finally {
            setLoading(false)
        }
    }
    return (
        <View style={{ flex: 1, zIndex: 0, }}>
            <SafeAreaView />
            <ProfileHeader navigation={navigation} />
            <StoreHeader
                title={storeObj ? 'Edit Store' : 'New Store'}
                noSearch
                onBack={() => navigation.goBack()} />
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior='padding'
            >
                <ScrollView
                    ref={ref}
                    nestedScrollEnabled
                    listViewDisplayed={false}
                    keyboardShouldPersistTaps="always"
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        marginTop: getHeightPixel(12),
                    }}>
                    <InputComponent
                        title="Name *"
                        value={storeName}
                        style={{ marginTop: getHeightPixel(15), height: 80 }}
                        onChangeText={(text) => setStoreName(text)}
                    />

                    {/* {Location starts here} */}
                    <View style={styles.locContainer}>
                        <Text style={styles.locTitle}>Location *</Text>
                        <PlacesInput
                            googleApiKey={GOOGLE_API_KEY}
                            placeHolder="Enter location"
                            // clearQueryOnSelect={true}
                            stylesContainer={styles.placesContainer}
                            textInputProps={
                                location !== ""
                                    ? storeObj
                                        ? {
                                            value: location,
                                            onChangeText: (text) => setLocation(text),
                                        }
                                        : null
                                    : null
                            }
                            stylesList={styles.placesListContainer}
                            stylesInput={styles.placesInputContainer}
                            onSelect={(place) => {
                                setLocation(place.result.formatted_address);
                                Geocoder.from({
                                    lat: place.result.geometry.location.lat,
                                    lng: place.result.geometry.location.lng,
                                }).then((data) => {
                                    setPlaceId(data.results[0].place_id);
                                });
                            }}
                        />
                        <Text style={{
                            fontFamily: "Segoe UI",
                            fontSize: getHeightPixel(14),
                            color: colors.accentGray,
                            marginTop: getHeightPixel(3)
                        }}>Complete mailing address.</Text>
                    </View>
                    <View style={{
                        paddingHorizontal: getWidthPixel(15),
                        marginTop: getHeightPixel(10)
                    }}>
                        <Text style={styles.locTitle}>Sales Type *</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <RadioButton
                                title='Retail & Online'
                                value={salesType == 0}
                                onPress={() => setSalesType(0)}
                            />
                            <RadioButton
                                title='Online Only'
                                value={salesType == 1}
                                onPress={() => setSalesType(1)}
                                boxStyle={{ marginLeft: getWidthPixel(15) }}
                            />
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: getWidthPixel(15),
                        marginTop: getHeightPixel(10)
                    }}>
                        <Text style={[styles.locTitle, { marginBottom: 2 }]}>What is Sold? *</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}>
                            {
                                checkBoxList.map((item, index) => <CheckBox
                                    title={item}
                                    index={index}
                                    value={checkedArray.includes(item)}
                                    onPress={() => {
                                        if (checkedArray.includes(item)) {
                                            let arr = checkedArray.filter((el) => el !== item);
                                            setCheckArray(arr)
                                        } else {
                                            setCheckArray([...checkedArray, item]);
                                        }
                                    }}
                                    boxStyle={{ marginRight: getWidthPixel(15), marginTop: getHeightPixel(5) }}
                                />)
                            }
                        </View>
                    </View>
                    <InputComponent
                        title="Description *"
                        placeholder='Tell us about your Products/Services (include #tags)'
                        large
                        value={description}
                        style={{ marginTop: getHeightPixel(15), height: 150 }}
                        onChangeText={(text) => setDescription(text)}
                        multiline
                        onFocus={() => {
                            if (Platform.OS == 'ios') {
                                setTimeout(() => ref.current.scrollToEnd({ animated: true }), 200)
                            }
                        }}
                    />
                    <ButtonRound
                        title="Submit"
                        loading={loading}
                        onPress={addStoreFunc}
                        style={{
                            paddingHorizontal: getWidthPixel(25),
                            backgroundColor: colors.primary,
                            marginTop: getHeightPixel(25)
                        }}
                        textStyle={{
                            fontFamily: "Segoe UI",
                            fontWeight: "800",
                        }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </View >
    )
}

export default AddStore

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