import React from "react"
import { View, Text } from "react-native"
import WebView from "react-native-webview";
import colors from "../../colors";
import Pdf from 'react-native-pdf'
const AttachmentPost = ({ item, size }) => {
  return (
    <View
      style={{
        width: size.width,
        height: size.height,
      }}
    >
      {
        Platform.OS == 'ios' ?
          <WebView
            source={{
              uri: `${item?.url}`,
            }}
            startInLoadingState={true}
          /> :
          <Pdf
          singlePage = {true}
            trustAllCerts={false}
            source={{ uri: `${item?.url}`, cache: true }}
            style={{
              flex: 1,
              width: '100%',
              height: '100%'
            }}
          />
      }
    </View>
  );
};
export default AttachmentPost