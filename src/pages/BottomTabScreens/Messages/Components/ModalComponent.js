import React from 'react'
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import colors from '../../../../common/colors';
import { getWidthPixel, getHeightPixel } from '../../../../common/helper';
import ButtonRound from '../../../BottomTabScreens/Components/ButtonRound'

export default ModalComponent = (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.showPopup}
            onRequestClose={() => {
                props.setShowPopup(!showPopup);
            }}
        >
            <TouchableWithoutFeedback onPress={() => props.setShowPopup(false)}>
                <View style={styles.mainModalContainer}></View>
            </TouchableWithoutFeedback>
            <View style={styles.subContainer}>
                <Text
                    style={{
                        color: colors.mineShaft,
                        fontSize: getWidthPixel(18),
                        fontFamily: "Segoe UI",
                    }}
                >
                    {props.modalHeader}
                </Text>
                <View
                    style={{
                        height: 1,
                        backgroundColor: colors.lightSilver,
                        marginVertical: getHeightPixel(10),
                    }}
                />
                <Text
                    style={{
                        color: colors.accentGray,
                        fontSize: getWidthPixel(16),
                        fontFamily: "Segoe UI",
                    }}
                >
                    {props.modalContent}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: getHeightPixel(15),
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <ButtonRound
                            title="CANCEL"
                            onPress={() => props.setShowPopup(false)}
                            style={{
                                width: "90%",
                                backgroundColor: colors.accentGray,
                            }}
                            textStyle={{
                                fontFamily: "Segoe UI",
                                fontWeight: "800",
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <ButtonRound
                            title="DELETE"
                            loading={props.loading}
                            onPress={props.onConfirm}
                            style={{
                                width: "90%",
                                backgroundColor: colors.primary,
                            }}
                            textStyle={{
                                fontFamily: "Segoe UI",
                                fontWeight: "800",
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    mainModalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    subContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "white",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        padding: getWidthPixel(15),
        paddingBottom: getHeightPixel(25),
    },
})