import React, { useEffect, useState } from 'react'
import { View, Text, Image, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native'
import colors from '../../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../../common/helper'
import icons from '../../../../common/icons'

export default ProductDropDown = (props) => {
    const [showPopup, setShowPopup] = useState(false)
    useEffect(() => {
        if (props.popupOpen) {
            props.popupOpen(showPopup)
        }
    }, [showPopup])

    const RenderSingleListItem = (item, i) => {
        return (
            <TouchableWithoutFeedback key={i} onPress={() => {
                props.onSelect(item);
                if (!props.pressDisabled)
                    setShowPopup(false)
            }}>
                <Text style={styles.label}>{item}</Text>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <View style={{ width: '90%', marginTop: getHeightPixel(15), ...props.style }}>
            {
                !props.noTitle ?
                    <Text style={{ fontFamily: 'Segoe UI', fontSize: getHeightPixel(16), fontWeight: '700', color: colors.mineShaft }}>{props.title}</Text> :
                    null
            }
            <View style={{ zIndex: 1, marginTop: getHeightPixel(5), width: '100%' }}>
                <TouchableWithoutFeedback onPress={() => setShowPopup(!showPopup)}>
                    <View style={{ ...styles.formatToggle, ...props.style }}>
                        <Text style={{ fontFamily: 'Segoe UI', color: colors.mineShaft, fontSize: getHeightPixel(16) }}>{props.item}</Text>
                        <Image source={icons.DropDown} />
                    </View>
                </TouchableWithoutFeedback>
                {
                    showPopup && props.list ?
                        <View style={{ ...styles.listContainer }}>
                            {
                                props.list.map((item, i) => RenderSingleListItem(item, i))
                            }
                        </View> : null
                }
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    formatToggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'flex-end',
        backgroundColor: '#e6f7ff',
        // marginTop: 5,
        width: '100%',
        paddingVertical: getHeightPixel(5),
        paddingHorizontal: 10,
        borderRadius: 5,
        height: getHeightPixel(50),
    },
    listContainer: {
        backgroundColor: '#e6f7ff',
        position: 'absolute',
        right: 0,
        left: 0,
        top: getHeightPixel(50),
        zIndex: 20,
        alignSelf: 'flex-end',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopColor: colors.ironGray,
        borderTopWidth: 1,
    },
    label: {
        color: colors.mineShaft,
        fontSize: getWidthPixel(16),
        marginLeft: getWidthPixel(10),
        paddingVertical: 5,
        fontFamily: 'Segoe UI'
    }
})