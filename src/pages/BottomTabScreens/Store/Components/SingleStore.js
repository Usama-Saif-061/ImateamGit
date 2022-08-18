import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import colors from '../../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../../common/helper'
import icons from '../../../../common/icons'
import Swipeable from 'react-native-gesture-handler/Swipeable';


const SingleStore = ({ item, rightActionSwipe, leftActionSwipe, onPress }) => {
    return (
        <Swipeable renderRightActions={rightActionSwipe} renderLeftActions={leftActionSwipe}>
            <TouchableWithoutFeedback
                onPress={() => {
                    onPress()
                }}
            >
                <View style={{
                    height: getHeightPixel(65),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: getWidthPixel(15),
                    borderTopColor: colors.accentGray,
                    borderTopWidth: 0.2,
                    backgroundColor: 'white'
                }}>
                    <Text style={{
                        fontFamily: 'Segoe UI',
                        fontSize: getHeightPixel(16),
                        fontWeight: 'bold'
                    }}>{item.name}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Image source={icons.ArrowForward} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Swipeable>
    )
}

export default SingleStore