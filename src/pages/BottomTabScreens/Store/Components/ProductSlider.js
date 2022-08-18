import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../../../common/colors';
import { capitalizeFirstLetter, getHeightPixel, getWidthPixel } from '../../../../common/helper';
const sliderName = [
    {
        type: 0,
        name: 'info',
    },
    {
        type: 1,
        name: 'details',
    },
    {
        type: 2,
        name: 'attachments',
    },
    {
        type: 3,
        name: 'content',
    },
];
const ProductSlider = (props) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
            }}>
            {sliderName.map((item, index) => {
                return (
                    <View key={`${index}`} style={{}}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    height: 40,
                                    width: 40,
                                    backgroundColor:
                                        item.type == props.currentType
                                            ? colors.primary
                                            : item.type < props.currentType
                                                ? colors.secondary : 'rgba(0,0,0,0)',
                                    borderRadius: 20,
                                    borderColor: 'grey',
                                    borderWidth: item.type > props.currentType ? 2 : 0,
                                }}
                            />
                            {index != sliderName.length - 1 && (
                                <View
                                    style={{
                                        height: 2,
                                        backgroundColor:
                                            item.type == props.currentType
                                                ? colors.primary
                                                : item.type < props.currentType
                                                    ? colors.secondary
                                                    : 'grey',
                                        width: 50,
                                    }}
                                />
                            )}
                        </View>
                        <Text
                            style={{
                                color: colors.mineShaft,
                                marginTop: 8,
                                fontSize: getWidthPixel(10),
                                marginLeft: index == 0 ? 10 : index == 1 ? 5 : index == 2 ? -5 : 3,
                            }}>{capitalizeFirstLetter(item.name)}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};
const style = StyleSheet.create({
    mainView: {
        height: 80,
    },
});
export default ProductSlider;
