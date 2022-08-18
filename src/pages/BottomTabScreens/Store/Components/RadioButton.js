import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import colors from '../../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../../common/helper'

const RadioButton = (props) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            ...props.boxStyle
        }}>
            <TouchableOpacity onPress={() => props.onPress()}>
                <View style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.accentGray,
                    backgroundColor: props.value ? '#8ec6f1' : 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} >
                    {
                        props.value &&
                        <View style={{
                            height: 8,
                            width: 8,
                            borderRadius: 4,
                            backgroundColor: colors.primary
                        }} />
                    }
                </View>
            </TouchableOpacity>
            <Text style={{
                fontFamily: 'Segoe UI',
                fontSize: getHeightPixel(16),
                color: colors.mineShaft,
                marginLeft: getWidthPixel(10)
            }}>{props.title}</Text>
        </View>
    )
}
export default RadioButton