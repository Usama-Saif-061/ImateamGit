import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import colors from '../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../common/helper'

export default ButtonRound = ({ title, onPress, loading, style, textStyle }) => {
    return (
        <TouchableOpacity disabled={loading ? true : false} onPress={() => onPress()}>
            <View style={{
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: getWidthPixel(15),
                borderRadius: 25,
                height: getHeightPixel(50),
                ...style
            }}>
                {
                    loading ? <ActivityIndicator /> :
                        <Text style={{ color: '#fff', ...textStyle }}>{title}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}
