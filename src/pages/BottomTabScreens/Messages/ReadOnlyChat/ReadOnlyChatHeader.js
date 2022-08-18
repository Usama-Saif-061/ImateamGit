import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { getHeightPixel, getWidthPixel } from '../../../../common/helper'
import icons from '../../../../common/icons'

const ReadOnlyChatHeader = (props) => {
    return (
        <View style={styles.mainContainer}>
            {/* <View /> */}
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image source={icons.Back} />
            </TouchableOpacity>
            <Text style={styles.title}>Bill Geivett</Text>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => props.navigation.navigate('ReadOnlyChat')}>
                    <Image source={icons.iconsMini.GrayBin} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <Image style={{ marginLeft: getWidthPixel(10) }} source={icons.iconsMini.GrayPlus} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ReadOnlyChatHeader

const styles = StyleSheet.create({
    mainContainer: {
        height: getHeightPixel(60),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: getWidthPixel(15),
        backgroundColor: 'white',
    },
    title: {
        color: '#222222',
        fontFamily: 'Segoe UI',
        fontSize: getHeightPixel(16),
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})