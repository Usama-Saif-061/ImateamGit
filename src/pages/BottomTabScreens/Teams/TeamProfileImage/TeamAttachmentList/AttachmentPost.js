import React from "react"
import { View, Text } from "react-native"
import WebView from "react-native-webview";
import Pdf from 'react-native-pdf'
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../../../common/colors";

const AttachmentPost = ({ item, size }) => {
  return (
    <View
      style={{
        width: size.width,
        height: size.height,
        backgroundColor: 'black'
      }}
    >
      {
        item.url ?
          Platform.OS == 'ios' ?
            <WebView
              source={{
                uri: `${item?.url}`,
              }}
              startInLoadingState={true}
            /> :
            <Pdf
              singlePage={true}
              trustAllCerts={false}
              source={{ uri: `${item?.url}`, cache: true }}
              style={{
                flex: 1,
                width: '100%',
                height: '100%'
              }}
            /> :
          <View style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon
              name="file1"
              size={50}
              color={colors.primary}
            />
          </View>
      }
    </View>
  );
};
export default AttachmentPost