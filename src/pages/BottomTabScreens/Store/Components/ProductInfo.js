import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native'
import { ScreenSize, getHeightPixel, getWidthPixel, convertToSlug } from '../../../../common/helper'
import colors from '../../../../common/colors'
import ProductDropDown from './ProductDropDown'
import Icon from "react-native-vector-icons/AntDesign";
import InputComponent from '../../Calendar/Components/InputComponent'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import icons from '../../../../common/icons'

const ProductInfo = (props) => {

    const itemPressed = (item) => {
        if (props.selectedCategories.includes(item)) {
            let arr = props.selectedCategories.filter((el) => {
                return el !== item
            })
            props.setSelectedCategories(arr)
        } else {
            props.setSelectedCategories([...props.selectedCategories, item])
        }
    }

    const nextPressed = () => {
        if (props.name == '') {
            Alert.alert('Alert!', 'Name cannot be empty.')
            return;
        }
        if (props.slug == '') {
            Alert.alert('Alert!', 'Slug cannot be empty.')
            return;
        }
        if (props.selectedCategories.length == 0) {
            Alert.alert('Alert!', 'Kindly select at least one category.')
            return;
        }
        props.onNext()
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={{
            // flex: 1,
            width: ScreenSize.width,
            alignItems: 'center',
            paddingTop: getHeightPixel(10),
        }}>
            <Text style={{
                fontFamily: 'Segoe UI',
                color: colors.mineShaft,
                fontSize: getHeightPixel(16),
                fontWeight: 'bold',
            }}>Product Info</Text>
            <Text style={{ marginTop: getHeightPixel(10), paddingHorizontal: getWidthPixel(15), alignSelf: 'flex-start', fontFamily: 'Segoe UI', fontSize: getHeightPixel(16), fontWeight: '700', color: colors.mineShaft }}>Store *</Text>
            <View style={{
                justifyContent: 'center',
                backgroundColor: '#e6f7ff',
                width: '90%',
                paddingHorizontal: getWidthPixel(10),
                borderRadius: 5,
                height: getHeightPixel(50),
                marginTop: getHeightPixel(5),
            }}>
                <Text style={{ fontFamily: 'Segoe UI', color: colors.mineShaft, fontSize: getHeightPixel(16) }}>{props.store}</Text>
            </View>
            <Text style={{ paddingHorizontal: getWidthPixel(15), marginTop: getHeightPixel(10), alignSelf: 'flex-start', fontFamily: 'Segoe UI', fontSize: getHeightPixel(16), fontWeight: '700', color: colors.mineShaft }}>Categories *</Text>
            {
                props.selectedCategories.length > 0 &&
                <View style={styles.tagsContainer}>
                    {props.selectedCategories.map((item, index) => {
                        return (
                            <View key={index} style={styles.tagsList}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/* <Image source={item.picture} /> */}
                                    <View style={styles.tagImg}>
                                        <Text style={{ ...styles.tagItem, marginHorizontal: 0 }}>{item.charAt(0).toUpperCase()}</Text>
                                    </View>
                                    <Text style={styles.tagItem}>{item}</Text>
                                </View>
                                <TouchableOpacity onPress={() => itemPressed(item)} style={{ marginHorizontal: getWidthPixel(5) }}>
                                    <Icon name="close" color='white' />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            }
            <ProductDropDown
                noTitle
                pressDisabled
                item={'Search...'}
                list={props.categoryList}
                onSelect={(item) => itemPressed(item)}
                style={{ zIndex: 4, marginTop: 0 }}
            />
            <InputComponent
                title="Name *"
                value={props.name}
                style={{ marginTop: getHeightPixel(10), height: 80, width: '90%' }}
                onChangeText={(text) => {
                    props.setName(text)
                    props.setSlug(convertToSlug(text))
                }}
            />
            <InputComponent
                title="Slug *"
                value={props.slug}
                style={{ marginTop: getHeightPixel(10), height: 80, width: '90%' }}
                onChangeText={(text) => props.setSlug(text)}
            />
            <Text style={{ paddingHorizontal: getWidthPixel(15), marginTop: getHeightPixel(10), alignSelf: 'flex-start', fontFamily: 'Segoe UI', fontSize: getHeightPixel(16), fontWeight: '700', color: colors.mineShaft }}>Tags</Text>
            {
                props.selectedTags.length > 0 &&
                <View style={styles.tagsContainer}>
                    {props.selectedTags.map((item, index) => {
                        return (
                            <View key={index} style={styles.tagsList}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={styles.tagImg}>
                                        <Text style={{ ...styles.tagItem, marginHorizontal: 0 }}>{item.charAt(0).toUpperCase()}</Text>
                                    </View>
                                    <Text style={styles.tagItem}>{item}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    let arr = props.selectedTags.filter((el) => el !== item)
                                    props.setSelectedTags(arr)
                                }} style={{ marginHorizontal: getWidthPixel(5) }}>
                                    <Icon name="close" color='white' />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            }
            <View style={{
                width: '90%',
                borderRadius: 5,
                borderColor: colors.accentGray,
                borderWidth: 1,
                marginTop: getWidthPixel(5),
                height: 50,
                marginHorizontal: getWidthPixel(15),
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TextInput
                    style={{
                        paddingHorizontal: getWidthPixel(20),
                        color: colors.mineShaft,
                        fontFamily: 'Segoe UI',
                        flex: 1,
                        height: '100%',
                    }}
                    value={props.tagItem}
                    onChangeText={(txt) => props.setTagItem(txt)}
                />
                <TouchableOpacity onPress={() => {
                    if (props.tagItem !== '') {
                        props.selectedTags.push(props.tagItem)
                    }
                    props.setTagItem('')
                }}>
                    <View style={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: getWidthPixel(40)
                    }}>
                        <Image source={icons.Plus} style={{
                            height: 20,
                            width: 20
                        }} />
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => nextPressed()} style={{
                marginBottom: getHeightPixel(40)
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.searchBlue,
                    marginTop: getHeightPixel(10),
                    padding: 10,
                    borderRadius: 20,
                    width: getWidthPixel(100),
                    backgroundColor: colors.primary,
                }}>
                    <Text style={{
                        fontSize: getHeightPixel(16),
                        fontFamily: 'Segoe UI',
                        color: colors.mineShaft,
                        color: 'white'
                    }}>Next</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
}
export default ProductInfo

const styles = StyleSheet.create({
    tagsContainer: {
        paddingHorizontal: getWidthPixel(20),
        marginTop: getHeightPixel(10),
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start'
    },
    tagsList: {
        marginRight: getWidthPixel(10),
        backgroundColor: colors.accentGray,
        padding: getWidthPixel(5),
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: getHeightPixel(4)
    },
    tagImg: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.primary2
    },
    tagItem: {
        color: 'white',
        marginHorizontal: getWidthPixel(10),
        fontFamily: 'Segoe UI',
        fontSize: getHeightPixel(12),
        fontWeight: 'bold'
    }
})