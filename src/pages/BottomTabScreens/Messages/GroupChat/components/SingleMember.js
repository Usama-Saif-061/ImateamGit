import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { getHeightPixel, getWidthPixel, showInitials } from '../../../../../common/helper'
import icons from '../../../../../common/icons'
import colors from '../../../../../common/colors'
import images from '../../../../../common/images'

const SingleMember = ({ obj, onDelete, onEdit }) => {
    // console.log('obj (SingleMember) -> ', obj)
    return (
        <View style={styles.mainContainer}>
            <View style={styles.dp}>
                {/* <Image style={styles.dp} source={images.profileImage} /> */}
                {
                    obj.avatar.url !== '' ?
                        <Image source={{ uri: obj.avatar.url }} style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30
                        }} /> :
                        <View style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colors.primary
                        }}>
                            <Text style={{
                                fontSize: getHeightPixel(16),
                                fontFamily: 'Segoe UI',
                                color: 'white'
                            }}>{showInitials(obj.display_name)}</Text>
                        </View>
                }
            </View>
            <View style={{
                width: '60%'
            }}>
                <Text style={styles.dpName}>{obj.display_name}</Text>
                {/* <Text style={styles.lastMessage}>{obj.lastMessage}</Text> */}
                <Text style={styles.lastMessage}>Last message</Text>
            </View>
            <View style={{
            }}>
                <Text style={styles.lastMessage}>1 days</Text>
                <View style={styles.editBtns}>
                    <TouchableOpacity onPress={onEdit}>
                        <Image source={icons.iconsMini.EditIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDelete}>
                        <Image style={{ marginLeft: getWidthPixel(10) }} source={icons.iconsMini.DeleteIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SingleMember

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: getWidthPixel(15),
        borderBottomColor: '#e5e5e6',
        borderBottomWidth: 1,
        paddingVertical: getHeightPixel(10)
    },
    dp: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    editBtns: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: getHeightPixel(10),
    },
    dpName: {
        fontFamily: 'Segoe UI',
        fontWeight: 'bold',
        fontSize: getHeightPixel(16),
        color: colors.mineShaft
    },
    lastMessage: {
        fontFamily: 'Segoe UI',
        fontSize: getHeightPixel(14),
        color: colors.gray
    }
})