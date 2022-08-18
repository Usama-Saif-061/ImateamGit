import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { getHeightPixel, showInitials } from '../../../../common/helper'
import colors from '../../../../common/colors'
import images from '../../../../common/images'

const GroupDpRow = ({ list }) => {
    let newList = [...list]
    var mlist = newList.length > 3 ? newList.splice(0, 3) : newList
    return (
        <View style={styles.moreSection}>
            <View style={{
                flexDirection: 'row',
                marginRight: 10
            }}>
                {
                    mlist.map((item, index) => <View key={index} >
                        {item.avatar?.url !== '' ?
                            <Image
                                source={{ uri: item.avatar.url }}
                                style={styles.singleImg} /> :
                            <View style={[styles.avatarView, {
                                // backgroundColor: `#${Math.floor(Math.random() * 16777215)
                                //     .toString(16)
                                //     .padStart(6, '0')}`
                                backgroundColor: colors.primary,
                                borderColor: 'white',
                                borderWidth: 2
                            }]}>
                                <Text style={styles.avatarTxt}>{showInitials(item?.display_name)}</Text>
                            </View>
                        }
                    </View>)
                }
            </View>
        </View>
    )
}

export default GroupDpRow

const styles = StyleSheet.create({
    moreSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreText: {
        fontFamily: 'Segoe UI',
        fontSize: getHeightPixel(12),
        color: colors.accentGray,
        textAlign: 'center'
    },
    singleImg: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginRight: - 10
    },
    avatarView: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginRight: - 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarTxt: {
        fontSize: getHeightPixel(16),
        fontFamily: 'Segoe UI',
        color: 'white'
    },
})