import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import colors from '../../../../common/colors'
import icons from '../../../../common/icons'
import { capitalizeFirstLetter, getHeightPixel, getWidthPixel } from '../../../../common/helper'

const CheckBox = (props) => {
    return (
        <View
            key={props.index}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                ...props.boxStyle
            }}>
            <TouchableOpacity onPress={() => props.onPress()}>
                <View style={{
                    height: 20,
                    width: 20,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: colors.accentGray,
                    backgroundColor: props.value ? '#8ec6f1' : 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} >
                    {
                        props.value &&
                        <Image source={icons.iconsMini.SingleCheck} style={{
                            height: 10,
                            width: 10,
                        }} />
                    }
                </View>
            </TouchableOpacity>
            <Text style={{
                fontFamily: 'Segoe UI',
                fontSize: getHeightPixel(16),
                color: colors.mineShaft,
                marginLeft: getWidthPixel(10)
            }}>{capitalizeFirstLetter(props.title)}</Text>
        </View>
    )
}
export default CheckBox