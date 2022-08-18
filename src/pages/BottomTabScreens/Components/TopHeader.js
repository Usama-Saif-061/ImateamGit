import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import colors from '../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../common/helper'
import icons from '../../../common/icons'

export default TopHeader = (props) => {
    return (
        <View style={styles.container}>

            <View
            style = {{
                flexDirection : "row",
                alignItems : "center"
            }}
            >
                {
                   props.isTeam &&
                   <TouchableOpacity onPress={() => props.onBackPress()}>
                   <View style={{ padding: 8 }}>
                       <Image source={icons.Back} />
                   </View>
               </TouchableOpacity> 
                }
                <TouchableOpacity onPress={() => props.onPress()}>
                    <View style={{ padding: 8 }}>
                        <Image source={props.isBack ? icons.Back : props.isCross ? icons.Cross : icons.LinesIcon} />
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={{
                fontSize: getHeightPixel(18),
                fontWeight: 'bold',
                color: colors.black,
                fontFamily: 'Segoe UI',
            }}>{props.title}</Text>
            <TouchableOpacity disabled={props.loading ? true : false} onPress={() => props.onUpdate()}>
                {
                    props.loading ? <ActivityIndicator color={colors.primary} /> : props.isEdit ?
                        <Text style={{ color: colors.inputBlue, fontFamily: 'Segoe UI', fontWeight: '700' }}>Edit</Text> :
                        props.isSubmit ? <Text style={{ color: colors.inputBlue, fontFamily: 'Segoe UI', fontWeight: '700' }}>Submit</Text> :
                            props.noSubmit ? <View /> : <Image source={icons.Plus} />
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: getHeightPixel(60),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: getWidthPixel(15),
        backgroundColor: "#fff",
    }
})