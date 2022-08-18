import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import colors from '../colors'
import { getHeightPixel, getWidthPixel } from '../helper'
import icons from '../icons'
import Icon from "react-native-vector-icons/AntDesign";

const TagsComponent = (props) => {
    const [tagItem, setTagItem] = useState('')
    return (
        <View>
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
                borderRadius: 5,
                borderColor: colors.accentGray,
                borderWidth: 0.6,
                marginTop: getWidthPixel(5),
                height: 50,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TextInput
                    style={{
                        paddingHorizontal: getWidthPixel(10),
                        color: colors.mineShaft,
                        fontFamily: 'Segoe UI',
                        flex: 1,
                        height: '100%',
                    }}
                    value={tagItem}
                    onChangeText={(txt) => setTagItem(txt)}
                    placeholder='Search Tags here'
                    placeholderTextColor={colors.accentGray}
                />
                <TouchableOpacity onPress={() => {
                    if (tagItem !== '') {
                        // props.selectedTags.push(tagItem)
                        props.setSelectedTags([...props.selectedTags, tagItem])
                    }
                    setTagItem('')
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
        </View>
    )
}

export default TagsComponent

const styles = StyleSheet.create({
    tagsContainer: {
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