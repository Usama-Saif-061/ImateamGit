import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../../../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../../../common/helper'

const SingleMessage = (props) => {
    return (
        <View style={styles.main}>
            <Text style={styles.chatLabel}>{`${props.obj.name} | 11/5/2021, 10:01:25 am`}</Text>
            <View style={{
                backgroundColor: props.obj.type == 'sender' ? '#E1F0FF' : 'white',
                ...styles.msgBox
            }}>
                <Text style={styles.msgText}>{props.obj.lastMessage}</Text>
            </View>
        </View>
    )
}

export default SingleMessage

const styles = StyleSheet.create({
    main: {
        marginVertical: getHeightPixel(5)
    },
    chatLabel: {
        fontFamily: 'Segoe UI',
        fontSize: getHeightPixel(12),
        color: colors.accentGray
    },
    msgBox: {
        padding: getWidthPixel(10),
        borderRadius: 10,
        borderTopLeftRadius: 0,
        alignSelf: 'flex-start',
    },
    msgText: {
        color: '#58595B',
        fontFamily: 'Poppins-Regular',
        fontSize: getHeightPixel(14)
    }
})