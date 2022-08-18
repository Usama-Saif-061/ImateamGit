import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import colors from '../../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../../common/helper'
import icons from '../../../../common/icons'

const StoreHeader = (props) => {
    const [showSearch, setShowSearch] = useState(false)
    return (
        <View style={styles.mainContainer}>
            {
                props.onBack ?
                    <TouchableOpacity style={styles.img} onPress={() => props.onBack()}>
                        <Image source={icons.Back} style={{ tintColor: colors.accentGray }} />
                    </TouchableOpacity> : <View />
            }
            {
                !showSearch ?
                    <Text style={[styles.heading, props.titleStyle]}>{props.title}</Text> :
                    <View style={{
                        height: '90%',
                        backgroundColor: colors.searchBlue,
                        width: '70%',
                        borderRadius: 5
                    }}>
                        <TextInput
                            placeholder='Search here...'
                            placeholderTextColor={colors.gray}
                            style={{
                                fontSize: getHeightPixel(12),
                                color: colors.mineShaft,
                                flex: 1,
                                paddingHorizontal: getWidthPixel(10)
                            }}
                            onChangeText={(txt) => props.onSearch(txt)}
                        />
                    </View>
            }
            {
                !props.noSearch ?
                    <TouchableOpacity style={styles.img} onPress={() => setShowSearch(!showSearch)}>
                        <Image source={icons.iconsMini.SearchDark} />
                    </TouchableOpacity>
                    : <View />
            }
        </View>
    )
}

export default StoreHeader

const styles = StyleSheet.create({
    mainContainer: {
        height: getHeightPixel(45),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: getWidthPixel(10),
        backgroundColor: 'white'
    },
    heading: {
        fontFamily: 'Segoe UI',
        color: colors.mineShaft,
        fontSize: getHeightPixel(16),
        fontWeight: 'bold'
    },
    img: {
        height: '100%',
        width: getWidthPixel(35),
        justifyContent: 'center',
        alignItems: 'center'
    }
})