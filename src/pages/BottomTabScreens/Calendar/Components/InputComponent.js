import React from 'react'
import { View, Text, Image, TextInput, StyleSheet, Keyboard, Platform } from 'react-native'
import colors from '../../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../../common/helper'

export default InputComponent = (props) => {
    return (
        <View style={{ marginHorizontal: getWidthPixel(15), marginTop: getHeightPixel(10), ...props.style }}>
            <Text style={{ fontSize: getHeightPixel(16), fontFamily: 'Segoe UI', fontWeight: '700', color: colors.mineShaft }}>{props.title}</Text>
            <View style={{ ...styles.inputContainer, height: props.height ? props.height : Platform.OS == 'ios' ? getHeightPixel(45) : '100%' }}>
                <TextInput
                    defaultValue={props.value ? props.value : ''}
                    keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                    multiline={props.multiline ? true : false}
                    onSubmitEditing={Keyboard.dismiss}
                    style={{ ...styles.input, textAlignVertical: props.large ? 'top' : 'center', marginVertical: Platform.OS == 'ios' ? 5 : 0 }}
                    autoCorrect={false}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    placeholderTextColor={props.placeholderColor ? props.placeholderColor : colors.accentGray}
                    // value={props.value ? props.value : ''}
                    onChangeText={(text) => props.onChangeText(text)}
                    onFocus={props.onFocus}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        borderRadius: 5,
        justifyContent: "center",
        borderColor: colors.accentGray,
        borderWidth: 1,
        marginTop: getWidthPixel(5),
    },
    input: {
        flex: 1,
        paddingHorizontal: getWidthPixel(20),
        color: colors.mineShaft,
        fontFamily: 'Segoe UI'
    },
})
