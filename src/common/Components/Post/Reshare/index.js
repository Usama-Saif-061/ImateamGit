import {
  StyleSheet,
  Text,
  Platform,
  Image,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import ImgToBase64 from "react-native-image-base64";
import {
  font,
  getHeightPixel,
  getWidthPixel,
  showInitials,
} from "../../../helper";
import DocumentPicker, { types } from "react-native-document-picker";
import colors from "../../../colors";
import { Divider } from "react-native-paper";
import RNFS from "react-native-fs";
import ButtonCommon from "../../Buttons";
import { resharePostApi } from "../../../../pages/Landing/Api/resharePostAPI";
import Toast from "react-native-toast-message";
import ImagePicker, { openCamera } from "react-native-image-crop-picker";
import BottomSheet from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/AntDesign";
import AttachIcon from "react-native-vector-icons/Entypo";
import DocumnetIcon from "react-native-vector-icons/Ionicons";
import CameraIcon from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import shareCommentAPI from "../../../../pages/Landing/Api/shareComment";

const TouchableWrapper = Platform.OS === "ios" ? KeyboardAvoidingView : View;
import { Appearance } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import shareToListAPI from "../../../../pages/Landing/Api/shareToListAPI";

export default function Reshare({
  closeModal,
  postText,
  postdata,
  userdata,
  postType,
  commentId,
}) {
  console.log("post reshare called");
  const colorScheme = Appearance.getColorScheme();
  const [open, setOpen] = useState(false);
  console.log("USer Data ", userdata);
  const [groupItems, setGroupItems] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState([]);
  const [newcomment, setNewComment] = useState("");
  const [tagValue, setTagValue] = useState([]);
  const [tagItems, setTagItems] = useState(tagConversion);
  const [loading, setLoading] = useState(false);
  const [additionalFeeds, setAdditionalFeeds] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [Uri, setUri] = useState([]);

  const [imageArray, setImageArray] = useState([]);

  const postid = postdata?.id;
  const userid = userdata?.id;
  console.log("i am postt data ", postdata);
  // BOTTOMSHEET FUNCTIONS FOR OPENING AND CLOSING
  const profileBottomSheetRef = useRef(null);
  const fileBottomSheetRef = useRef(null);

  const fileBottomClose = () => {
    console.log("Bottomsheet closed");
    fileBottomSheetRef.current.close();
  };
  const fileBottomOpen = () => {
    console.log("file attachmennt pressed");
    fileBottomSheetRef.current.expand();
  };

  const callApi = async () => {
    // console.log("iam files aray lenth", imageArray.length);

    const userFeeds = selectedTags.map((item) => {
      return {
        id: item.id,
        display_name: item.value,
      };
    });

    setLoading(!loading);
    var body = {
      values: {
        accountId: userid,

        text: postText,
        comment: newcomment,
        private: false,
        burn: false,

        repostInfo: {
          id: postdata?.user_info?.id,
          display_name: postdata?.user_info?.display_name,
          organization: false,
          created_at: postdata.created_at,
          updated_at: new Date(),

          avatar: postdata?.user_info?.avatar,
          groups: postdata?.user_info?.groups,
          locale: postdata?.user_info?.locale,
        },
        files: imageArray,
        feeds: userFeeds,
      },
    };

    // console.log(body)

    // console.log("i am body12 ", body.values.files.length);
    //
    console.log("body before send", body.values.feeds);

    const send =
      (await postType) === "commentShare"
        ? shareCommentAPI((id = commentId), (body = body))
        : resharePostApi(body, postid);
    console.log("i am send", send);
    if (send) {
      setLoading(false);

      showToast();
      closeModal();
    } else {
      setLoading(false);
    }
  };
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: `Success`,
      text2: `Post sucessfully shared ✅`,
      visibilityTime: 1500,
    });
  };

  const checkList = (item) => {
    setTagValue((pre) => {
      return pre.filter((temp) => temp != item);
    });
  };

  const tagConversion = () => {
    userdata?.org_accounts.map((item) => {
      return {
        label: item.display_name,
        value: item.id,
      };
    });
  };

  const convertImageToBase64 = async (img) => {
    if (img.path) {
      ImgToBase64.getBase64String(img.path)
        .then((base64String) => {
          const temp = base64String;
          const imgobj = {
            data: temp,
            fileInfo: img.fileInfo,
          };

          let temArray = imageArray;
          temArray.push(imgobj);

          setImageArray(temArray);
        })
        .catch((err) => "not converted");
    }
  };
  //j document picker
  const chooseDocument = async () => {
    fileBottomClose();
    console.log("document picker called");
    try {
      const pickerResult = await DocumentPicker.pick({
        type: types.pdf,
        allowMultiSelection: true,
      });
      //  console.log("pickerResult: ", pickerResult);
      pickerResult.map(async (item) => {
        //  console.log("item: ", item);
        RNFS.readFile(item.uri, "base64").then((RNFSresponse) => {
          // console.log("RNFSresponse: ", RNFSresponse);

          const obj = {
            data: RNFSresponse,
            fileInfo: {
              filename: item.name,
              fileSize: item.size,
              fileType: item.type,
            },
          };
          setUri((prevArray) => [...prevArray, obj]);
          let temArray = imageArray;
          temArray.push(obj);
          //console.log("temArray", temArray);
          setImageArray(temArray);
        });

        // console.log("obj: ", obj);

        // convertImageToBase64(obj);
      });
    } catch (error) {
      console.log("error in picking file", error);
    }
  };
  const chooseImage = async () => {
    fileBottomClose();
    await ImagePicker.openPicker({
      width: getWidthPixel(300),
      height: getHeightPixel(400),
      cropping: false,
      multiple: true,
      mediaType: "any",
      useFrontCamera: true,
    }).then((image) => {
      console.log("ma image wala hn", image);
      image.map((item) => {
        const imgobj = {
          path: item.path,

          fileInfo: {
            attachmentId: "78",
            filename: item.filename,
            fileSize: item.size,
            fileType: item.mime,
          },
        };
        setUri((prevArray) => [...prevArray, imgobj]);
        convertImageToBase64(imgobj);
      });
    });

    console.log(Uri.length);
  };
  const openCamera = () => {
    fileBottomClose();
    ImagePicker.openCamera({
      width: getWidthPixel(300),
      height: getHeightPixel(400),
      cropping: false,
      multiple: true,
      mediaType: "any",
      useFrontCamera: true,
    }).then((image) => {
      console.log("ma image wala hn", image);
      image.map((item) => {
        const imgobj = {
          path: item.path,

          fileInfo: {
            filename: item.filename,
            fileSize: item.size,
            fileType: item.mime,
          },
        };
        setUri((prevArray) => [...prevArray, imgobj]);

        convertImageToBase64(imgobj);
      });
    });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await shareToListAPI(userid);
      console.log("additional feeds reponse ", response);
      const userInterests = userdata?.interests;
      console.log("user Data", userInterests);

      const addedColorsInInterests = userInterests.map((item) => {
        return {
          color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          id: item.id,
          label: item.name,
          value: item.name,
        };
      });
      // setAdditionalFeeds((prev) => [...prev, addedColorsInInterests]);

      const list = response?.map((item) => {
        return {
          label: item?.display_info.display_name.trim(),
          value: item?.display_info.display_name.trim(),
          id: item.id,
          color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        };
      });

      const temp = addedColorsInInterests.concat(list);

      //set temp in setadditionfeeds when connection api is live
      setAdditionalFeeds(addedColorsInInterests);
    };

    getData();
  }, []);

  useEffect(() => {
    console.log("Selected Tags", selectedTags);
  }, [[tagValue], [selectedTags]]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View style={styles.topContainer}>
            <Divider />

            <View style={styles.topContentContainer}>
              <TouchableOpacity onPress={closeModal}>
                <Icon name="close" color={colors.accentGray} size={24} />
              </TouchableOpacity>
              <Text style={styles.repost}>Repost</Text>

              <View></View>
            </View>

            <Divider />
          </View>
        </SafeAreaView>

        <View style={[styles.content, { zIndex: 3, elevation: 5 }]}>
          <Text style={styles.headingText}>Account</Text>

          <DropDownPicker
            open={open}
            value={value}
            items={userdata?.org_accounts.map((item) => {
              return {
                label: item.display_name,
                value: item.display_name,
              };
            })}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setGroupItems}
            dropDownDirection="BOTTOM"
            onSelectItem={(item) => {
              console.log("i am selected", item.label);
              setGroupItems(item.label);
            }}
            placeholder="Select Account"
            style={{
              backgroundColor: colors.searchBlue,
              height: getHeightPixel(36),
              marginTop: getHeightPixel(7),
              paddingHorizontal: getWidthPixel(5),
            }}
            listMode="SCROLLVIEW"
          />
        </View>
        <View style={{ marginBottom: tagValue.length ? 2 : 0 }}>
          <Text
            style={{ ...styles.headingText, marginLeft: getHeightPixel(10) }}
          >
            Additional Feeds
          </Text>
          <View style={styles.content1}>
            {tagValue.length != 0 ? (
              <View style={styles.tagWrapper}>
                {tagValue.map((item, index) => (
                  <View style={styles.tag} key={index}>
                    <View
                      style={{
                        height: getHeightPixel(20),
                        width: getWidthPixel(20),
                        borderRadius: 40,
                        marginVertical: 2,
                        backgroundColor: colors.primary,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",

                          ...font(14, "bold"),
                          color: "#fff",
                        }}
                      >
                        {showInitials(item)}
                      </Text>
                    </View>
                    <Text style={styles.tagText}>{item}</Text>
                    <TouchableWithoutFeedback
                      onPress={
                        () => checkList(item) //REMOVE ITEM FROM NAMELIST....
                      }
                    >
                      <Icon name="close" size={12} color="#fff" />
                    </TouchableWithoutFeedback>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </View>

        <View style={[styles.content, { zIndex: 2, elevation: 5 }]}>
          {/* // additional feed */}
          <DropDownPicker
            open={open2}
            multiple={true}
            min={0}
            max={5}
            searchable={true}
            value={tagValue}
            items={additionalFeeds}
            setOpen={setOpen2}
            setValue={setTagValue}
            setItems={setTagItems}
            onSelectItem={(item) => {
              setSelectedTags(item);
            }}
            dropDownDirection="BOTTOM"
            placeholder="Search"
            style={{
              backgroundColor: colors.searchBlue,
              height: getHeightPixel(36),
              paddingVertical: 0,
            }}
            selectedItemLabelStyle={{
              fontWeight: "bold",
              color: colors.inputBlue,
              placeholder: "hello",
            }}
            listMode="SCROLLVIEW"
          />
          <Text style={styles.textExplaination}>
            Always posts to your feed, want add more?
          </Text>

          <View />

          <Text style={styles.headingText}>Comment</Text>

          <TextInput
            style={{
              ...styles.comment,
              color: colorScheme == "dark" ? colors.black : colors.accentGray,
            }}
            multiline={true}
            numberOfLines={10}
            value={newcomment}
            onChangeText={(text) => setNewComment(text)}
          />

          <View style={{ marginVertical: getHeightPixel(17) }}>
            <Text style={styles.headingText}>Original Text</Text>
            <Text
              style={{
                ...styles.comment,
                color: colorScheme == "dark" ? colors.black : colors.accentGray,
                height: getHeightPixel(150),
                paddingHorizontal: getWidthPixel(20),
                paddingTop: getHeightPixel(13),
                paddingBottom: getHeightPixel(17),
                marginTop: getHeightPixel(5),
              }}
            >
              {postText}
            </Text>
          </View>

          <TouchableWithoutFeedback>
            <TouchableOpacity onPress={fileBottomOpen}>
              <Text style={{ ...styles.headingText, color: colors.inputBlue }}>
                + Attachments
              </Text>
            </TouchableOpacity>
          </TouchableWithoutFeedback>

          {/* here is code for attachments selected */}
          <TouchableWrapper behavior="padding" style={newStyles.content3}>
            {Uri.length != 0 ? (
              <View
                style={{
                  alignItems: "flex-start",
                  flex: 1,
                  overflow: "hidden",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {Uri.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      marginHorizontal: getWidthPixel(5),
                      marginVertical: getHeightPixel(5),
                    }}
                  >
                    {
                      (console.log("i am file type", item),
                      item.fileInfo.fileType === "video/mp4" ? (
                        <>
                          <View
                            style={{
                              width: getWidthPixel(60),
                              height: getHeightPixel(60),
                              backgroundColor: "#fff",
                              resizeMode: "cover",
                              borderWidth: 1,
                              borderColor: colors.inputBlue,
                              marginRight: 2,
                            }}
                            onPress={() =>
                              setUri((pre) => {
                                return pre.filter((temp) => temp != item);
                              })
                            }
                          />
                          <Icon
                            name="play"
                            size={22}
                            color={colors.primary}
                            onPress={() =>
                              setUri((pre) => {
                                return pre.filter((temp) => temp != item);
                              })
                            }
                            style={{
                              position: "absolute",
                              right: getWidthPixel(20),
                              left: getWidthPixel(20),
                              bottom: 20,
                            }}
                          />
                        </>
                      ) : item.fileInfo.fileType === "application/pdf" ? (
                        <>
                          <View
                            style={{
                              width: getWidthPixel(60),
                              height: getHeightPixel(60),
                              backgroundColor: "#fff",
                              resizeMode: "cover",
                              borderWidth: 1,
                              borderColor: colors.inputBlue,
                              marginRight: 2,
                            }}
                            onPress={() =>
                              setUri((pre) => {
                                return pre.filter((temp) => temp != item);
                              })
                            }
                          />
                          <Icon
                            name="file1"
                            size={22}
                            color={colors.primary}
                            onPress={() =>
                              setUri((pre) => {
                                return pre.filter((temp) => temp != item);
                              })
                            }
                            style={{
                              position: "absolute",
                              right: getWidthPixel(20),
                              left: getWidthPixel(20),
                              bottom: 20,
                            }}
                          />
                        </>
                      ) : (
                        <Image
                          style={{
                            width: 60,
                            height: 60,
                            backgroundColor: "red",
                            resizeMode: "cover",
                            borderWidth: 1,
                            borderColor: colors.inputBlue,
                            marginRight: 2,
                          }}
                          source={{ uri: item.path }}
                        />
                      ))
                    }

                    <Icon
                      name="close"
                      size={12}
                      color="black"
                      onPress={() =>
                        setUri((pre) => {
                          return pre.filter((temp) => temp != item);
                        })
                      }
                      style={{
                        position: "absolute",
                        right: 5,
                        top: 5,
                      }}
                    />
                  </View>
                ))}
              </View>
            ) : null}
          </TouchableWrapper>
        </View>
      </KeyboardAwareScrollView>
      {/* SECOND BOTTOM SHEET FOR SELECTING FILES I.E IMAGE, DOCS  */}
      <BottomSheet
        index={-1}
        snapPoints={[400, 300]}
        initialSnapIndex={-1}
        enablePanDownToClose={true}
        ref={fileBottomSheetRef}
      >
        <View style={newStyles.bottomSheetContainer}>
          <View style={newStyles.bottomSheetHeader}>
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
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <TouchableOpacity
                onPress={chooseDocument}
                style={newStyles.bottomSheetIconsWrapper}
              >
                <DocumnetIcon
                  name="document-text-outline"
                  size={23}
                  style={{
                    padding: 20,
                    color: "#fff",
                    flexDirection: "column",
                    alignSelf: "center",
                  }}
                />
              </TouchableOpacity>
              <Text>Document</Text>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={chooseImage}
                style={newStyles.bottomSheetIconsWrapper}
              >
                <AttachIcon
                  name="images"
                  size={23}
                  style={{
                    padding: 20,
                    color: "#fff",
                    flexDirection: "column",
                    alignSelf: "center",
                  }}
                />
              </TouchableOpacity>

              <Text>Gallery</Text>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={openCamera}
                style={newStyles.bottomSheetIconsWrapper}
              >
                <CameraIcon
                  name="camera"
                  size={23}
                  style={{
                    padding: 20,
                    color: "#fff",
                    flexDirection: "column",
                    alignSelf: "center",
                  }}
                />
              </TouchableOpacity>
              <Text>Camera</Text>
            </View>
          </View>
        </View>
      </BottomSheet>
      <View style={styles.buttonView}>
        <ButtonCommon
          title={"SHARE NOW"}
          textColor={colors.ghostWhite}
          color={colors.inputBlue}
          loading={loading}
          method={() => {
            callApi();
          }}
        />
      </View>
    </View>
  );
}

const newStyles = StyleSheet.create({
  bottomSheetContainer: {
    paddingHorizontal: getWidthPixel(50),
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
    borderColor: colors.lightSilver,
    borderWidth: 1,
  },
  bottomSheetName: {
    ...font(14, "bold"),
  },
  bottomSheetIconsWrapper: {
    backgroundColor: colors.inputBlue,
    borderRadius: 60,
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: getHeightPixel(6),
  },
  content3: {
    flex: 1.1,

    justifyContent: "flex-end",
  },
  content3Wrapper: {
    borderColor: colors.lightGray,
    borderTopWidth: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderColor: colors.ironGray,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getWidthPixel(10),
  },
  topContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingTop: getHeightPixel(15),
    paddingBottom: getHeightPixel(15),
    paddingHorizontal: getWidthPixel(10),
  },
  repost: {
    ...font(18),
    color: colors.black,
  },
  detailsCotainer: {
    paddingHorizontal: getWidthPixel(10),
    paddingTop: getHeightPixel(11),
    paddingHorizontal: getWidthPixel(10),
  },
  headingText: {
    ...font(14),
    fontWeight: "bold",
    color: colors.black,
  },
  secondDropDown: {
    paddingTop: 18,
    paddingBottom: 14,
  },
  search: {
    ...font(16),
    width: getWidthPixel(310),

    textAlign: "auto",
    paddingHorizontal: getWidthPixel(20),
    color: colors.accentGray,
    borderWidth: 1,
    paddingVertical: getHeightPixel(9),
    marginTop: getHeightPixel(7),
    borderTopLeftRadius: getHeightPixel(7),
    borderBottomLeftRadius: getHeightPixel(7),
  },
  textExplaination: {
    ...font(14),
    lineHeight: getHeightPixel(26),
    color: colors.accentGray,
    marginBottom: getHeightPixel(5),
    marginTop: getHeightPixel(20),
  },
  comment: {
    ...font(16),
    borderWidth: getWidthPixel(1),
    paddingTop: getHeightPixel(13),
    paddingHorizontal: getWidthPixel(10),
    borderRadius: 10,
    marginTop: getHeightPixel(10),
    height: getHeightPixel(60),
    textAlignVertical: "top",
  },
  buttonView: {
    marginBottom: getHeightPixel(30),
  },
  content: {
    marginBottom: 12,
    paddingTop: 18,
    paddingBottom: 14,
    paddingHorizontal: getWidthPixel(10),
  },
  text: {
    marginBottom: 3,
    ...font(16, "bold"),
  },
  content1: {
    backgroundColor: colors.silverWhite,
  },
  tagWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: colors.accentGray,
    flexDirection: "row",
    paddingHorizontal: 4,
    borderRadius: 20,
    alignItems: "center",
    marginLeft: getWidthPixel(4),
    marginVertical: getHeightPixel(4),
  },
  tagText: {
    ...font(14, "bold"),
    paddingHorizontal: 6,
    paddingVertical: 2,
    color: "#fff",
  },
});
