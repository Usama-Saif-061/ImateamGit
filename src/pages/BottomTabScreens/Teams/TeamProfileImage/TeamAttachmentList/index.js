import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, TouchableOpacity, Dimensions, Text, TouchableWithoutFeedback, TouchableNativeFeedback, Platform } from "react-native";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../colors";
import {
  getWidthPercentage,
  getHeightPixel,
  getHeightPercentage,
  getWidthPixel,
} from "../../helper";

import WebView from "react-native-webview";
import Video from "react-native-video";
import ImagePost from "./ImagePost";
import VideoPost from "./VideoPost";
import AttachmentPost from "./AttachmentPost";
import Pdf from 'react-native-pdf';
import ImageZoom from 'react-native-image-pan-zoom';
import PhotoView from 'react-native-photo-view';

const TeamAttachmentList = (props) => {
  const {
    data,
    attachmentWidth,
    commentIndex,
    onAttachmentPressed,
    openingFrom,
    scrollIndex
  } = props;
  const flatListRef = useRef(null)
  const [page, setPage] = useState(1)
  var totalPages = useRef(0)
  const [listPage, setCurrentListPage] = useState(0)
  useEffect(() => {
    if (openingFrom == "FullPost" && scrollIndex) {
      console.log("value is ", scrollIndex)
      setTimeout(() => {
        totalPages.current = 20
        setPage(1)
        flatListRef.current.scrollToIndex({ animated: false, index: scrollIndex });
      }, 200);
    }
  }, [])
  const renderVideo = (item, index) => {
    return (
      <View
        style={{
          width: getWidthPercentage(attachmentWidth),
        }}
      >
        {openingFrom === "FullPost" ? null : (
          <Icon
            name="play"
            size={50}
            color={colors.primary}
            onPress={() => { }}
            // onPress={() => setUri(Uri.slice(index + 1))}
            style={{
              position: "absolute",
              right:
                attachmentWidth === 75
                  ? getWidthPercentage(33)
                  : getWidthPercentage(45),
              bottom: getHeightPercentage(20),
              zIndex: 999,
            }}
            onPress={() => {
              onAttachmentPressed(index);
            }}
          />
        )}
        <Video
          source={{ uri: item?.upload }}
          minLoadRetryCount={3}
          controls={openingFrom === "FullPost" ? true : false}
          // paused={openingFrom === "FullPost" ? false : true}
          paused={index == scrollIndex ? false : index == listPage ? false : true}
          fullscreen={true}
          resizeMode="contain"
          style={{
            width: "100%",
            height:
              openingFrom === "FullPost"
                ? getHeightPercentage(70)
                : getHeightPercentage(45),
            //  resizeMode: openingFrom === "FullPost" ? "contain" : "stretch",
          }}
        />
      </View>
    );
  };

  const renderImage = (item) => {
    return (
      <View
        style={{
          width: Dimensions.get('window').width,
          alignSelf: "center",
        }}
      >
        {Platform.OS == "android" ? (
          <PhotoView
            source={{ uri: item.url }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            minimumZoomScale={1}
            maximumZoomScale={3}
            androidScaleType="center"
            onLoad={() => console.log("Image loaded!")}
            style={{
              width: Dimensions.get("window").width,
              height: getHeightPercentage(90),
            }}
          />
        ) : (
          <ImageZoom
            cropWidth={Dimensions.get("screen").width}
            cropHeight={getHeightPercentage(90)}
            imageWidth={Dimensions.get("screen").width}
            imageHeight={getHeightPercentage(90)}
          >
            <FastImage
              source={{
                uri: item.url,
                priority: FastImage.priority.high,
              }}
              style={{
                width: "100%",
                height:
                  openingFrom === "FullPost"
                    ? getHeightPercentage(90)
                    : getHeightPercentage(45),
                // resizeMode: openingFrom === "FullPost" ? "contain" : "stretch",
              }}
              resizeMode="contain"
            />
          </ImageZoom>
        )}
      </View>
    );
  };

  const renderDocument = (item) => {
    return (
      <View
        style={{
          flex: 1,
          width: Dimensions.get("screen").width,
          borderWidth: 1,
          borderColor: colors.white,
        }}
      >
        {
          // Platform.OS == 'ios' ?
          //   <WebView
          //     source={{
          //       uri: `${item?.url}`,
          //     }}
          //     startInLoadingState={true}
          //   /> :
          <Pdf
            page={page}
            singlePage={false}
            enablePaging={true}
            source={{ uri: `${item?.url}`, cache: true }}
            trustAllCerts={false}
            style={{
              flex: 1,
              width: '100%',
              height: '100%'
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
          />
        }
      </View>
    );
  };

  const keyExtractor = (item, index) => index.toString();

  const renderAttachments = (attachment) => {
    const { item, index } = attachment;
    const { fileType } = item.payload;
    //  console.log("fileType: ", fileType);
    const Container =
      attachmentWidth === 100 ? TouchableWithoutFeedback : TouchableWithoutFeedback;
    return (
      <Container
        onPress={() => {
          if (props.hasOwnProperty("commentIndex")) {
            onAttachmentPressed(commentIndex);
          } else {
            onAttachmentPressed(index);
          }
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {fileType !== "video/mp4" ? null : renderVideo(item, index)}
          {fileType === "image/jpeg" ||
            fileType === "image/png" ||
            fileType === "image/heic"
            ? renderImage(item)
            : null}
          {fileType !== "application/pdf" ? null : renderDocument(item)}
        </View>
      </Container>
    );
  };
  const calculateWidthHeight = (index) => {
    const mainWidth = Dimensions.get("screen").width
    var size = {
      width: mainWidth / 2 - 1,
      height: mainWidth / 2
    }
    if (index == 2 && data.length < 4) {
      size.width = mainWidth
      size.height = mainWidth / 2
    }
    if (index < 2 && data.length == 2) {
      size.width = mainWidth / 2 - 1
      size.height = mainWidth / 2
    }
    if (index == 0 && data.length == 1) {
      size.width = mainWidth
      size.height = mainWidth
    }
    return size
  }
  const endView = () => {
    return (
      <View
        style={{
          ...calculateWidthHeight(4),
          backgroundColor: "rgba(0,0,0,0.4)",
          position: "absolute",
          left: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "500"
          }}
        >

          {
            `+${data.length - 4}`
          }

        </Text>
      </View>
    )
  }
  return (
    openingFrom == "FullPost" ?
      <FlatList
        pagingEnabled={true}
        ref={flatListRef}
        data={data}
        horizontal={true}
        keyExtractor={keyExtractor}
        renderItem={renderAttachments}
        onMomentumScrollEnd={(e) => {
          let pageNumber = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / Dimensions.get("screen").width + 0.5) + 1, 0), data.length);
          console.log(pageNumber);
          setCurrentListPage(pageNumber - 1)
        }}
      /> :
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between"
        }}
      >
        {
          data.map((item, index) => {
            if (index < 4) {
              return (

                <TouchableWithoutFeedback
                  onPress={() => {
                    onAttachmentPressed(index);
                  }}
                >
                  <View
                    key={`${index}`}
                    style={{
                      marginTop: 1
                    }}
                  >
                    {
                      item.payload.fileType.toLowerCase().includes("image") ?
                        <ImagePost
                          item={item}
                          size={calculateWidthHeight(index)}
                        /> :
                        item.payload.fileType.toLowerCase().includes("video") ?
                          <VideoPost
                            item={item}
                            size={calculateWidthHeight(index)}
                            onPress={() => {
                              onAttachmentPressed(index);
                            }}

                          /> :
                          item.payload.fileType.toLowerCase().includes("application") ?
                            <AttachmentPost
                              item={item}
                              size={calculateWidthHeight(index)}
                            /> : null
                    }
                    {
                      (index == 3 && data.length > 4) &&
                      endView()
                    }
                  </View>
                </TouchableWithoutFeedback>
              )
            }
            else {
              return null
            }
          })
        }
      </View >
  );
};

export default TeamAttachmentList;
