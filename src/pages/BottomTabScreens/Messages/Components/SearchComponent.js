import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native'
import colors from '../../../../common/colors'
import { font, getHeightPixel, getWidthPixel } from '../../../../common/helper'
import icons from '../../../../common/icons'
import Icon from "react-native-vector-icons/AntDesign";

const SearchComponent = (props) => {
    const [showList, setShowList] = useState(false)
    const [list, setList] = useState(props.list)
    const [selectedItems, setSelectedItems] = useState([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        if (searchText.length > 0) {
            let arr = list.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
            setList(arr)
        } else {
            setList(props.list)
        }
    }, [searchText, props.list])

    const itemPressed = (item) => {
        if (selectedItems.includes(item)) {
            let arr = selectedItems.filter((el) => {
                return el.id !== item.id
            })
            setSelectedItems(arr)
        } else {
            setSelectedItems([...selectedItems, item])
        }
    }

    useEffect(() => {
        props.onItemSelect(selectedItems)
    }, [selectedItems])

    return (
        <KeyboardAvoidingView keyboardShouldPersistTaps="handled">
            <View>
                <View style={{
                    ...styles.mainContainer,
                    borderBottomRightRadius: showList ? 0 : 10,
                    borderBottomLeftRadius: showList ? 0 : 10
                }}>
                    {
                        showList ?
                            <TextInput
                                placeholder="Search for users, fans"
                                placeholderTextColor='#4d5966'
                                value={searchText}
                                style={styles.inputStyle}
                                onChangeText={(e) => setSearchText(e)}
                                onSubmitEditing={() => setShowList(false)}
                            /> : <TouchableOpacity style={{ flex: 8, alignItems: 'center' }} onPress={() => setShowList(true)}>
                                <Text style={styles.fontStyle}>Search for users, fans</Text>
                            </TouchableOpacity>
                    }
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => setShowList(!showList)}>
                        {
                            showList ?
                                <Icon name='caretup' /> :
                                <Image source={icons.iconsMini.SearchDark} resizeMode='contain' />
                        }
                    </TouchableOpacity>
                </View>
                {
                    showList &&
                    <View style={styles.listContainer}>
                        <FlatList
                            data={list}
                            renderItem={({ item }) => <TouchableOpacity onPress={() => itemPressed(item)}>
                                <Text style={{ ...styles.fontStyle, color: selectedItems.includes(item) ? '#106ebf' : '#4d5966' }}>{item.name}</Text>
                            </TouchableOpacity>}
                        />
                    </View>
                }
                {
                    selectedItems.length > 0 &&
                    <View style={styles.tagsContainer}>
                        {selectedItems.map((item, index) => {
                            return (
                                <View key={index} style={styles.tagsList}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {/* <Image source={item.picture} /> */}
                                        <View style={styles.tagImg}>
                                            <Text style={{ ...styles.tagItem, marginHorizontal: 0 }}>{item.name.charAt(0).toUpperCase()}</Text>
                                        </View>
                                        <Text style={styles.tagItem}>{item.name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => itemPressed(item)} style={{ marginHorizontal: getWidthPixel(5) }}>
                                        <Icon name="close" color='white' />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                }
            </View>
        </KeyboardAvoidingView>
    )
}

export default SearchComponent

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        backgroundColor: colors.searchBlue,
        height: getHeightPixel(45),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
    },
    inputStyle: {
        flex: 8,
        width: '100%',
        height: '100%',
        ...font(14),
        color: '#4d5966',
        textAlign: "center",
    },
    fontStyle: {
        ...font(14),
        color: '#4d5966',
        textAlign: "center",
        marginVertical: getHeightPixel(10)
    },
    listContainer: {
        backgroundColor: colors.searchBlue,
        borderTopWidth: 0.5,
        borderTopColor: '#b8dbf9',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    tagsContainer: {
        marginTop: getHeightPixel(10),
        flexDirection: 'row',
        flexWrap: 'wrap',
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