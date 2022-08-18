import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import { getHeightPixel, ScreenSize, getWidthPixel } from '../../../../common/helper'
import colors from '../../../../common/colors'
import RadioButton from './RadioButton'
import InputComponent from '../../Calendar/Components/InputComponent'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from '../Components/CheckBox'

const ProductDetails = (props) => {

    const nextPressed = () => {
        if (props.sku == '') {
            Alert.alert('Alert!', 'SKU cannot be empty.')
            return;
        }
        if (!props.regularPrice) {
            Alert.alert('Alert!', 'Regular Price cannot be empty.')
            return;
        }
        if (props.inventory == 1 && !props.allowBackOrders) {
            Alert.alert('Alert!', 'Kindly click the checkbox before proceeding.')
            return;
        }
        if (props.shipping == 2 && props.length == '') {
            Alert.alert('Alert!', 'Length cannot be empty.')
            return;
        }
        props.onNext()
    }

    return (
        <KeyboardAwareScrollView style={{
            flex: 1,
            width: ScreenSize.width,
            paddingTop: getHeightPixel(10),
        }}>
            <Text style={{
                fontFamily: 'Segoe UI',
                color: colors.mineShaft,
                fontSize: getHeightPixel(16),
                fontWeight: 'bold',
                alignSelf: 'center',
            }}>Product Details</Text>
            <View style={{
                marginTop: getHeightPixel(10),
                paddingHorizontal: getHeightPixel(25)
            }}>
                <Text style={{
                    fontFamily: "Segoe UI",
                    fontSize: getHeightPixel(16),
                    fontWeight: "700",
                    color: colors.mineShaft,
                    marginBottom: getHeightPixel(5),
                }}>Visibility *</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <RadioButton
                        title='Public'
                        value={props.visibility == 0}
                        onPress={() => props.setVisibility(0)}
                    />
                    <RadioButton
                        title='Private'
                        value={props.visibility == 1}
                        onPress={() => props.setVisibility(1)}
                        boxStyle={{ marginLeft: getWidthPixel(15) }}
                    />
                    <RadioButton
                        title='Hidden'
                        value={props.visibility == 2}
                        onPress={() => props.setVisibility(2)}
                        boxStyle={{ marginLeft: getWidthPixel(15) }}
                    />
                </View>
            </View>

            <InputComponent
                title="SKU *"
                value={props.sku}
                style={{ marginTop: getHeightPixel(5), height: 80, paddingHorizontal: getWidthPixel(15) }}
                onChangeText={(text) => props.setSku(text)}
            />
            <InputComponent
                title="Barcode"
                value={props.barCode}
                style={{ marginTop: getHeightPixel(5), height: 80, paddingHorizontal: getWidthPixel(15) }}
                onChangeText={(text) => props.setbarCode(text)}
            />
            <Text style={{
                fontFamily: "Segoe UI",
                fontSize: getHeightPixel(16),
                fontWeight: "700",
                color: colors.mineShaft,
                marginBottom: getHeightPixel(5),
                paddingHorizontal: getWidthPixel(25),
                alignSelf: 'center',
                marginTop: getHeightPixel(10),
            }}>Pricing *</Text>
            <InputComponent
                title="Regular Price *"
                value={props.regularPrice}
                style={{ marginTop: getHeightPixel(0), height: 80, paddingHorizontal: getWidthPixel(15) }}
                onChangeText={(text) => props.setRegularPrice(text)}
                keyboardType='numeric'
            />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: getWidthPixel(15)
            }}>
                <InputComponent
                    title="Sale Price"
                    value={props.salePrice}
                    style={{ height: 80, width: '40%' }}
                    onChangeText={(text) => props.setSalePrice(text)}
                    keyboardType='numeric'
                />
                <InputComponent
                    title="Cost"
                    value={props.cost}
                    style={{ height: 80, width: '40%' }}
                    onChangeText={(text) => props.setCost(text)}
                    keyboardType='numeric'
                />
            </View>
            {/* {Inventory here} */}
            <View style={{
                marginTop: getHeightPixel(10),
                paddingHorizontal: getHeightPixel(25)
            }}>
                <Text style={{
                    fontFamily: "Segoe UI",
                    fontSize: getHeightPixel(16),
                    fontWeight: "700",
                    color: colors.mineShaft,
                    marginBottom: getHeightPixel(5),
                }}>Inventory *</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <RadioButton
                        title='None'
                        value={props.inventory == 0}
                        onPress={() => props.setInventory(0)}
                    />
                    <RadioButton
                        title='Manage Stock'
                        value={props.inventory == 1}
                        onPress={() => props.setInventory(1)}
                        boxStyle={{ marginLeft: getWidthPixel(15) }}
                    />
                    <RadioButton
                        title='Time Slots'
                        value={props.inventory == 2}
                        onPress={() => props.setInventory(2)}
                        boxStyle={{ marginLeft: getWidthPixel(15) }}
                    />
                </View>
            </View>
            {/* Inventory Expanded portion */}
            {
                props.inventory == 1 &&
                <View style={{
                    marginHorizontal: getHeightPixel(15),
                    marginTop: getHeightPixel(15),
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: colors.grey,
                    paddingHorizontal: getWidthPixel(15),
                    paddingVertical: getHeightPixel(15)
                }}>
                    <CheckBox
                        title={'Allow Backorders'}
                        value={props.allowBackOrders}
                        onPress={() => props.setAllowBackOrders(!props.allowBackOrders)}
                    />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: getHeightPixel(10),
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            height: 80,
                            width: '45%'
                        }}>
                            <Text style={{
                                fontFamily: 'Segoe UI',
                                fontSize: getHeightPixel(16),
                                color: colors.mineShaft
                            }}>Current Stock</Text>
                            <TextInput
                                style={{
                                    flex: 1,
                                    borderColor: colors.grey,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5,
                                    marginTop: getHeightPixel(5)
                                }}
                                value={props.currentStock}
                                onChangeText={(txt) => props.setCurrentStock(txt)}
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={{
                            height: 80,
                            width: '45%'
                        }}>
                            <Text style={{
                                fontFamily: 'Segoe UI',
                                fontSize: getHeightPixel(16),
                                color: colors.mineShaft,
                            }}>Minimum Stock</Text>
                            <TextInput
                                style={{
                                    flex: 1,
                                    borderColor: colors.grey,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5,
                                    marginTop: getHeightPixel(5)
                                }}
                                value={props.minimumStock}
                                onChangeText={(txt) => props.setMinimumStock(txt)}
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                </View>
            }

            {/* {Shipping here} */}
            <View style={{
                marginTop: getHeightPixel(10),
                paddingHorizontal: getHeightPixel(25),
            }}>
                <Text style={{
                    fontFamily: "Segoe UI",
                    fontSize: getHeightPixel(16),
                    fontWeight: "700",
                    color: colors.mineShaft,
                    marginBottom: getHeightPixel(5),
                }}>Shipping *</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}>
                    <RadioButton
                        title='None'
                        value={props.shipping == 0}
                        onPress={() => props.setShipping(0)}
                    />
                    <RadioButton
                        title='Digital Download'
                        value={props.shipping == 1}
                        onPress={() => props.setShipping(1)}
                        boxStyle={{ marginLeft: getWidthPixel(15) }}
                    />
                    <RadioButton
                        title='Shipping via Carrier'
                        value={props.shipping == 2}
                        onPress={() => props.setShipping(2)}
                        boxStyle={{ marginTop: getHeightPixel(5) }}
                    />
                    <RadioButton
                        title='Free'
                        value={props.shipping == 3}
                        onPress={() => props.setShipping(3)}
                        boxStyle={{ marginLeft: getWidthPixel(15), marginTop: getHeightPixel(5) }}
                    />
                </View>
            </View>

            {/* {Shipping expanded portion here} */}
            {
                props.shipping == 2 &&
                <View style={{
                    marginHorizontal: getHeightPixel(15),
                    marginTop: getHeightPixel(15),
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: colors.grey,
                    paddingHorizontal: getWidthPixel(15),
                    paddingVertical: getHeightPixel(15)
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            height: 80,
                            width: '45%'
                        }}>
                            <Text style={{
                                fontFamily: 'Segoe UI',
                                fontSize: getHeightPixel(16),
                                color: colors.mineShaft
                            }}>Length *</Text>
                            <TextInput
                                style={{
                                    flex: 1,
                                    borderColor: colors.grey,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5,
                                    marginTop: getHeightPixel(5)
                                }}
                                value={props.length}
                                onChangeText={(txt) => props.setLength(txt)}
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={{
                            height: 80,
                            width: '45%'
                        }}>
                            <Text style={{
                                fontFamily: 'Segoe UI',
                                fontSize: getHeightPixel(16),
                                color: colors.mineShaft
                            }}>Width</Text>
                            <TextInput
                                style={{
                                    flex: 1,
                                    borderColor: colors.grey,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5,
                                    marginTop: getHeightPixel(5)
                                }}
                                value={props.width}
                                onChangeText={(txt) => props.setWidth(txt)}
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            height: 80,
                            width: '45%',
                        }}>
                            <Text style={{
                                fontFamily: 'Segoe UI',
                                fontSize: getHeightPixel(16),
                                color: colors.mineShaft
                            }}>Height</Text>
                            <TextInput
                                style={{
                                    flex: 1,
                                    borderColor: colors.grey,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5,
                                    marginTop: getHeightPixel(5)
                                }}
                                value={props.height}
                                onChangeText={(txt) => props.setHeight(txt)}
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={{
                            height: 80,
                            width: '45%'
                        }}>
                            <Text style={{
                                fontFamily: 'Segoe UI',
                                fontSize: getHeightPixel(16),
                                color: colors.mineShaft
                            }}>Location</Text>
                            <TextInput
                                style={{
                                    flex: 1,
                                    borderColor: colors.grey,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 5,
                                    marginTop: getHeightPixel(5)
                                }}
                                value={props.location}
                                onChangeText={(txt) => props.setLocation(txt)}
                            />
                        </View>
                    </View>
                </View>
            }
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
                        }}>Next</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}
export default ProductDetails