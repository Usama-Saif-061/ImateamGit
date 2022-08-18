import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../../common/helper'

export default SingleEventDetails = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <View style={styles.container}>
                <View style={styles.timeContainer}>
                    <Text style={{ color: '#115895', fontFamily: 'Poppins-Regular' }}>{props.startTime}</Text>
                    <Text style={{ color: '#115895', fontFamily: 'Poppins-Regular' }}>{props.endTime}</Text>
                </View>
                <View style={{
                    paddingVertical: 5,
                    paddingLeft: getWidthPixel(15),
                    width: '70%'
                }}>
                    <Text style={{ color: 'black', fontFamily: "Segoe UI", fontWeight: 'bold' }}>{props.title}</Text>
                    <Text style={{ color: colors.gray, marginTop: getHeightPixel(5), fontFamily: "Segoe UI" }}>{props.label}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: getHeightPixel(80),
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.ironGray,
        paddingHorizontal: getWidthPixel(10),
        marginTop: getHeightPixel(10),
        marginBottom: getHeightPixel(5)
    },
    timeContainer: {
        borderRightColor: colors.ironGray,
        borderRightWidth: 1,
        paddingVertical: 5,
        paddingRight: getWidthPixel(15),
        marginLeft: getWidthPixel(15)
    }
})