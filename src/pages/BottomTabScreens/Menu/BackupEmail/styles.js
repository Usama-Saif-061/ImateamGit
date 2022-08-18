import { StyleSheet } from "react-native"
import colors from "../../../../common/colors"
import { getHeightPixel, getWidthPixel, font } from "../../../../common/helper"

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: getWidthPixel(17)
    },
    text: {
        ...font(16, "600"),
        marginTop: getHeightPixel(20)
    },
    input: {
        paddingHorizontal: getWidthPixel(12),
        paddingVertical: getHeightPixel(6),
        borderWidth: 1,
        borderRadius: 5,
        marginTop: getHeightPixel(5),
        color: colors.mineShaft
    },
    errMsg: {
        marginTop: getHeightPixel(4),
        fontSize: 12,
        color: colors.blockRed
    }
})

export default styles