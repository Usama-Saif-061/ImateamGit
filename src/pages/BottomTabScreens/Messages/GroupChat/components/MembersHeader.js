import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../../../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../../../common/helper'
import icons from '../../../../../common/icons'

const MembersHeader = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ padding: 10 }} onPress={() => props.navigation.goBack()}>
                <Image source={icons.Back} style={{ tintColor: colors.accentGray }} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Members</Text>
            <TouchableOpacity onPress={props.addMember}>
                <Image source={icons.iconsMini.MembersChat} />
            </TouchableOpacity>
        </View>
    )
}

export default MembersHeader

const styles = StyleSheet.create({
    container: {
        height: getHeightPixel(60),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: getWidthPixel(15),
        backgroundColor: 'white'
    },
    headerTitle: {
        color: '#222222',
        fontFamily: 'Segoe UI',
        fontSize: getHeightPixel(16),
        fontWeight: 'bold'
    }
})