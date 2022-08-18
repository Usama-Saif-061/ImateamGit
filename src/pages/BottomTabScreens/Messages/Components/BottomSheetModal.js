import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { getHeightPixel, getWidthPixel, font } from '../../../../common/helper'
import colors from '../../../../common/colors'
import AttachIcon from "react-native-vector-icons/Entypo";
import DocumnetIcon from "react-native-vector-icons/Ionicons";
import CameraIcon from "react-native-vector-icons/Feather";

const BottomSheetModal = (props) => {
    return (
        <View style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheetHeader}>
                <Text
                    style={{
                        paddingBottom: 11,
                        ...font(14, "bold"),
                        color: colors.mineShaft,
                    }}
                >
                    Choose Attached File
                </Text>
            </View>
            <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
                <TouchableOpacity
                    onPress={() => props.chooseDocument()}
                    style={styles.bottomSheetIconsWrapper}>
                    <DocumnetIcon
                        name="document-text-outline"
                        size={23}
                        style={{ padding: 20, color: "#fff" }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.chooseImage}
                    style={styles.bottomSheetIconsWrapper}
                >
                    <AttachIcon
                        name="images"
                        size={23}
                        style={{
                            padding: 20,
                            color: "#fff",
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.chooseCamera}
                    style={styles.bottomSheetIconsWrapper}>
                    <CameraIcon
                        name="camera"
                        size={23}
                        style={{ padding: 20, color: "#fff" }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
        flex: 1,
        ...font(12, "bold"),
        width: 225,
        paddingVertical: 0,
        textAlign: "center",
        paddingHorizontal: 20,
        color: colors.accentGray,
    },
    contentWrapper: {
        flex: 2,
        marginHorizontal: getWidthPixel(17),
        paddingVertical: getWidthPixel(12),
    },
    content2Wrapper: {
        borderColor: colors.lightGray,
        borderTopWidth: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderColor: colors.ironGray,
        borderTopWidth: 1,
        alignItems: "center",
        marginBottom: getHeightPixel(10)
    },
    bottomSheetContainer: {
        paddingHorizontal: 34,
        flex: 1,
    },
    bottomSheetHeader: {
        borderBottomColor: colors.lightSilver,
        borderBottomWidth: 1,
        marginBottom: 25,
    },
    bottomSheetItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        paddingVertical: 9,
        borderRadius: 30,
    },
    bottomSheetName: {
        ...font(14, "bold"),
    },
    bottomSheetIconsWrapper: {
        backgroundColor: colors.inputBlue,
        borderRadius: 60,
        justifyContent: "center",
    },
})

export default BottomSheetModal