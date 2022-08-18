import React from 'react'
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import colors from '../../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../../common/helper'
import icons from '../../../../common/icons'

const FullScreenModalHeader = (props) => {
    return (
        <View style={{
            backgroundColor: 'white',
            height: getHeightPixel(60),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: getWidthPixel(15),
            borderTopColor: colors.lightGray,
            borderTopWidth: 0.5,
            borderBottomColor: colors.lightGray,
            borderBottomWidth: 0.5
        }}>
            <TouchableWithoutFeedback onPress={() => props.setVisible(false)}>
                <View style={{
                    height: getHeightPixel(40),
                    width: getHeightPixel(40),
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    left: getWidthPixel(15),
                    top: getWidthPixel(10),
                    bottom: getWidthPixel(10)
                }}>
                    <Image source={icons.Cross} />
                </View>
            </TouchableWithoutFeedback>
            <Text
                numberOfLines={1}
                style={{
                    color: colors.mineShaft,
                    fontFamily: 'Segoe UI',
                    fontSize: getHeightPixel(16),
                    fontWeight: 'bold',
                    maxWidth: '70%',
                }}>{props.title}</Text>
        </View>
    )
}

export default FullScreenModalHeader