import React, { useRef, useState } from "react"
import { View, Text } from "react-native"
import WebView from "react-native-webview";
import Pdf from 'react-native-pdf'
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../../../common/colors";

const AttachmentPost = ({ item, size }) => {
  const [page, setPage] = useState(1)
  var totalPages = useRef(0)
  return (
    <View
      style={{
        width: size.width,
        height: size.height,
        backgroundColor: 'black'
      }}
    >
      {
        item?.path ?
          // Platform.OS == 'ios' ?
          // <WebView
          //   source={{
          //     uri: `${item?.url}`,
          //   }}
          //   startInLoadingState={true}
          // /> :
          <Pdf
            // singlePage={true}
            // trustAllCerts={false}
            // source={{ uri: `${item?.path}`, cache: true }}
            // style={{
            //   flex: 1,
            //   width: '100%',
            //   height: '100%'
            // }}
            page={page}
            singlePage={false}
            enablePaging={true}
            source={{ uri: `${item?.path}`, cache: true }}
            trustAllCerts={false}
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
            }}
            onPageSingleTap={() => {
              console.log(page)
              console.log(totalPages)
              if (page < totalPages.current) {
                if (page == 0) {
                  setPage(2)
                }
                else {
                  setPage(page + 1)
                }
              }
              else {
                setPage(1)
              }
            }}
            onPageChanged={(page, numberOfPages) => {
              totalPages.current = numberOfPages
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