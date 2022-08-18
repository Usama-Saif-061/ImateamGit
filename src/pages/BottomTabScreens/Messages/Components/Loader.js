import React from 'react'
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import colors from '../../../../common/colors'
import { getHeightPixel, getWidthPixel } from '../../../../common/helper'
import { useSelector } from 'react-redux'

const Loader = () => {
    const loaderState = useSelector((state) => state.chat.isLoaderStart);
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={loaderState}
        >
            <View style={styles.mainContainer}>
                <View style={styles.loader}>
                    <ActivityIndicator size='large' color={colors.primary} />
                </View>
            </View>

        </Modal>
    )
}
export default Loader

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        backgroundColor: 'white',
        height: getHeightPixel(85),
        width: getWidthPixel(85),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 15,
    }
})