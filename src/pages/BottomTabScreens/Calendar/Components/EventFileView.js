import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  Platform,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { getHeightPercentage, getHeightPixel, getWidthPercentage, getWidthPixel } from "../../../../common/helper";
import icons from "../../../../common/icons";
import colors from "../../../../common/colors";
import WebView from "react-native-webview";
import Pdf from "react-native-pdf";
import Video from "react-native-video";

const EventFileView = ({ attachment, onClose }) => {
  const [loading, setLoading] = useState(attachment.payload.fileType.substring(0, 3) == 'ima' ? true : false)
  const [paused, setPaused] = useState(false)
  const [duration, setDuration] = useState(0)
  const [value, setValue] = useState(0)
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => onClose()}>
      <View style={{
        flex: 1,
        backgroundColor: 'white'
      }}>
        <SafeAreaView />
        <View style={styles.container}>
          <TouchableOpacity onPress={() => onClose()}>
            <View style={{ padding: 8 }}>
              <Image source={icons.Back} />
            </View>
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            style={styles.topTitle}
          >
            {attachment?.payload?.filename}
          </Text>
          <View />
        </View>
        <View style={{
          backgroundColor: 'black',
          height: getHeightPercentage(100),
          width: getWidthPercentage(100),
          flexDirection: "column",
        }}>
          <View style={{
            height: 10,
            backgroundColor: '#EAECED',
          }} />
          {
            loading &&
            <View
              style={{
                height: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                size={"large"}
                color={'white'}
              />
            </View>
          }
          {
            attachment.payload.fileType.substring(0, 3) == 'ima' ?
              <Image source={{
                uri: attachment.signed_url
              }}
                onLoad={() => setLoading(false)}
                resizeMode='contain'
                style={{
                  height: '80%',
                }}
              /> :
              attachment.payload.fileType.substring(0, 3) == 'app' ?
                (
                  Platform.OS == 'ios' ?
                    <WebView
                      source={{
                        uri: attachment.signed_url,
                      }}
                      startInLoadingState={true}
                    /> :
                    <Pdf
                      source={{ uri: attachment.signed_url, cache: true }}
                      trustAllCerts={false}
                      style={{
                        flex: 1,
                        width: '100%',
                        height: '100%'
                      }}
                    />
                )
                :
                attachment.payload.fileType.substring(0, 3) == 'vid' ?
                  <View style={{
                    height: '80%',
                    zIndex: 0,
                  }}>
                    <Video
                      ref={(ref) => {
                        if (ref) {
                          player = ref
                        }
                      }}
                      paused={paused}
                      source={{ uri: attachment.signed_url }}
                      rate={1.0}
                      volume={1.0}
                      muted={false}
                      controls={true}
                      resizeMode={"contain"}

                      repeat={false}
                      style={styles.videoStyle}
                      onError={(err) => {
                        Alert.alert('Error!', err?.error?.localizedFailureReason ? err?.error?.localizedFailureReason : 'Some problem while playing the video')
                        console.log(err)
                        setPaused(true)
                      }}
                      onLoad={(data) => {
                        setDuration(data.duration)
                      }}
                      onProgress={(data) => {
                        setValue(data.currentTime)
                      }}
                    />
                  </View>
                  :
                  <Text style={{
                    color: 'white',
                    fontFamily: 'Segoe UI',
                    fontSize: getHeightPixel(14),
                  }}>File Url is invalid</Text>
          }
        </View>
      </View>
    </Modal>

  )
};

const styles = StyleSheet.create({
  container: {
    height: getHeightPixel(60),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: getWidthPixel(15),
    backgroundColor: "#fff",
  },
  topTitle: {
    fontSize: getHeightPixel(18),
    fontWeight: "bold",
    color: colors.black,
    fontFamily: "Segoe UI",
    width: '60%',
  },
  video: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 15,
    overflow: "hidden",
    marginTop: getHeightPixel(5),
    marginBottom: getHeightPixel(10)
  },
  videoMainContainer: {
    marginHorizontal: getWidthPixel(5),
    overflow: "hidden",
    borderRadius: getWidthPixel(8),
    backgroundColor: "black",
    height: getHeightPixel(200),
    width: getWidthPixel(200),
  },
  videoBtnMainContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  videoStyle: {
    flex: 1,
  },
  videoBtnStyle: {
    height: getHeightPixel(70),
    width: getHeightPixel(70),
    backgroundColor: '#1C6AB0',
    alignSelf: "center",
    borderRadius: getHeightPixel(35),
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  videoBtnImageStyle: {
    height: getHeightPixel(70),
    width: getWidthPixel(70),
    resizeMode: "center"
  }
});

export default EventFileView;
