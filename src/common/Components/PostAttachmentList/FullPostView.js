import React from "react"
import { Dimensions, View } from "react-native"
const FullPostView = ({data,onClose})=>{
    const size = Dimensions.get("screen")
    return(
        <View
        style = {{
            height : size.height,
            width : size.width
        }}
        >
        </View>
    )
}