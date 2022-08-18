import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getHeightPixel, getWidthPixel, ScreenSize } from '../../../../common/helper'
import colors from '../../../../common/colors'
import InputComponent from '../../Calendar/Components/InputComponent'

const ProductContent = (props) => {

    const nextPressed = () => {
        props.onNext()
    }

    return (
        <View style={{
            flex: 1,
            width: ScreenSize.width
        }}>
            <Text style={{
                fontFamily: 'Segoe UI',
                color: colors.mineShaft,
                fontSize: getHeightPixel(16),
                fontWeight: 'bold',
                alignSelf: 'center'
            }}>Product Content</Text>
            <View style={{
                paddingHorizontal: getWidthPixel(15),
                flex: 1
            }}>
                <InputComponent
                    title="Sidebar"
                    value={props.sidebar}
                    style={{ marginTop: getHeightPixel(15), height: 80 }}
                    onChangeText={(text) => props.setSidebar(text)}
                />
                <InputComponent
                    title="Description"
                    value={props.description}
                    style={{ marginTop: getHeightPixel(15), height: 80 }}
                    onChangeText={(text) => props.setDescription(text)}
                />
            </View>

            {/* {End Buttons} */}
            <View style={{
                flexDirection: 'row',
                marginBottom: getHeightPixel(30),
                alignSelf: 'center'
            }}>
                <TouchableOpacity onPress={() => props.onBack()}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.searchBlue,
                        marginTop: getHeightPixel(10),
                        padding: 10,
                        borderRadius: 20,
                        backgroundColor: colors.primary,
                        width: getWidthPixel(100)
                    }}>
                        <Text style={{
                            fontSize: getHeightPixel(16),
                            fontFamily: 'Segoe UI',
                            color: colors.mineShaft,
                            color: 'white'
                        }}>Back</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nextPressed()}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.searchBlue,
                        marginTop: getHeightPixel(10),
                        padding: 10,
                        borderRadius: 20,
                        backgroundColor: colors.primary,
                        width: getWidthPixel(100),
                        marginLeft: getWidthPixel(20)
                    }}>
                        <Text style={{
                            fontSize: getHeightPixel(16),
                            fontFamily: 'Segoe UI',
                            color: colors.mineShaft,
                            color: 'white'
                        }}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ProductContent