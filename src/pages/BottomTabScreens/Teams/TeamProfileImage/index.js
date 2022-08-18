import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Pressable,
  Image,
} from "react-native";
import ModalHeader from "../../../../common/Components/ModalHeader";
import ImagePicker from "react-native-image-crop-picker";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./style";
import colors from "../../../../common/colors";
import { useGetUserQuery } from "../../../../Reducers/usersApi";
import { useGetTeamMembersQuery, useGetTeamsQuery } from "../../../../Reducers/teamsApi";
import updateTeamAvatar from "../API/updateTeamAvatarApi";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUploadTeamAvatarMutation } from "../../../../Reducers/teamsApi";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import ImgToBase64 from "react-native-image-base64";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetModal from "../../Messages/Components/BottomSheetModal";
import { getHeightPixel, getToken, getWidthPixel } from "../../../../common/helper";
import TeamAttachmentList from "./TeamAttachmentList";
import GestureRecognizer from "react-native-swipe-gestures";
import FullOrgModal from "./FullOrgModal";
import icons from "../../../../common/icons";

const ImageUpload = ({ open, handleModal, orgInfo, setReload }) => {
  const { data: member, isFetching } = useGetTeamMembersQuery(orgInfo?.id);
  console.log('Member ===> ', JSON.stringify(member))
  const [uploadTeamAvatar] = useUploadTeamAvatarMutation();
  const [selectedImage, selectImage] = useState();
  const [adminData, setAdminData] = useState();
  const [loading, setLoading] = useState(false);

  const fileBottomSheetRef = useRef(null);
  const [imageArray, setImageArray] = useState([]);
  const [flag, setFlag] = useState(false)

  const [imageIndex, setImageIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  // const pickImage = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: false,
  //     multiple: false,
  //     mediaType: "photo",
  //     includeBase64: true,
  //   }).then((image) => {
  //     console.log("The image: ", image);
  //     selectImage(image);
  //   });
  // };

  // let jsonBody = {
  //   files: [
  //     {
  //       data: selectedImage?.data,
  //       fileInfo: {
  //         filename: selectedImage?.filename ? selectedImage?.filename : selectedImage?.modificationDate,
  //         fileSize: selectedImage?.size,
  //         fileType: selectedImage?.mime,
  //         scope: "avatar",
  //       },
  //     },
  //   ],
  //   memberId: orgInfo?.id,
  //   payload: orgInfo?.payload,
  // };
  async function updateAvatar() {
    setLoading(true);
    let jsonBody = {
      // memberId: orgInfo?.id,
      memberId: member[0]?.id,
      payload: {},
      files: imageArray
    }
    console.log('Image Array ==> ', JSON.stringify(jsonBody))
    console.log('member Id -> ', member[0].id)
    let response = await uploadTeamAvatar(orgInfo.id, jsonBody);
    console.log('response her => ', JSON.stringify(response))
    if (response) {
      setLoading(false);
      selectImage();
      setAdminData();
      console.log("Update Avatar: ", response);
      setImageArray([])
      handleModal(false);
    }
  }

  useEffect(() => {
    console.log('OrgInfo = ', orgInfo ? JSON.stringify(orgInfo) : '')
    member?.filter((x) => {
      if (x.admin) {
        setAdminData(x);
      }
    });
  }, [isFetching, adminData]);

  // Attaching attachments logic is here
  // Media Pickers here -> 
  const fileBottomClose = () => {
    console.log("closed");
    fileBottomSheetRef.current.close();
  };
  const fileBottomOpen = () => {
    console.log("open");
    fileBottomSheetRef.current.expand();
  };

  // Convert Image to Base64
  const convertImageToBase64 = async (img) => {
    console.log("img: ", img);
    if (img.fileInfo.fileType.substring(0, 2) == 'vi') {
      console.log('this is video')
      RNFS.readFile(img.path, "base64").then((RNFSresponse) => {
        // console.log("RNFSresponse: ", RNFSresponse);
        const obj = {
          data: RNFSresponse,
          fileInfo: {
            filename: img.fileInfo.filename,
            fileSize: img.fileInfo.fileSize,
            fileType: img.fileInfo.fileType,
          },
        };
        let temArray = imageArray;
        temArray.push(obj);
        setImageArray(temArray);
      });
    } else {
      if (img.path) {
        ImgToBase64.getBase64String(img.path)
          .then((base64String) => {
            //   console.log("base64String: ", base64String);
            const temp = base64String;
            const imgobj = {
              data: temp,
              fileInfo: img.fileInfo,
              path: img.path,
            };
            let temArray = imageArray;
            temArray.push(imgobj);
            console.log("temArray.length ->", temArray.length);
            console.log('imageArray.length -> ', imageArray.length)
            setImageArray(temArray);
            // getPickerData(imageArray);
            // setImageArray([]);

            console.log(" images array", imageArray.length);
            //return temp;
          })
          .catch((err) => "not converted");
      }
    }
    setTimeout(() => setFlag(!flag), 500)
  };

  // Gallery Image
  const chooseImage = async () => {
    fileBottomClose();
    await ImagePicker.openPicker({
      width: getWidthPixel(300),
      height: getHeightPixel(400),
      cropping: false,
      multiple: true,
      mediaType: "any",
      useFrontCamera: true,
      smartAlbums: [
        "UserLibrary",
        "PhotoStream",
        "Panoramas",
        "Videos",
        "Bursts",
      ],
    }).then((image) => {
      //setUri(image.path);
      console.log("ma image wala hn", image);
      image.map((item) => {
        let imageName = item.filename;
        if (Platform.OS === "android") {
          imageName = new Date();
          console.log(" time stamp", imageName);
        }

        const imgobj = {
          path: item.path,
          // data: convertImageToBase64(item.path),
          fileInfo: {
            filename: imageName,
            fileSize: item.size,
            fileType: item.mime,
          },
        };
        console.log('item -> ', item)
        convertImageToBase64(imgobj);
      });
    });
    // console.log("i am image converted in base 64", Uri);
    setTimeout(() => setFlag(!flag), 500)
  };

  // Document
  const chooseDocument = async () => {
    fileBottomClose();
    console.log("document picker called");
    try {
      const pickerResult = await DocumentPicker.pick({
        type: DocumentPicker.types.pdf,
        allowMultiSelection: true,
      });
      pickerResult.map(async (item) => {
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

          let temArray = imageArray;
          temArray.push(obj);
          //console.log("temArray", temArray);
          setImageArray(temArray);
        });
      });
    } catch (error) {
      console.log("error in picking file", error);
    }
    setTimeout(() => setFlag(!flag), 500)
  };

  // Camera
  const chooseCamera = async () => {
    fileBottomClose();
    await ImagePicker.openCamera({
      width: getWidthPixel(300),
      height: getHeightPixel(400),
      //  cropping: true,
      multiple: true,
      mediaType: "photo",
      // useFrontCamera: true,
    }).then((image) => {
      //setUri(image.path);
      console.log("ma image wala hn", image);

      let imageName = new Date();

      console.log(" time stamp", imageName);
      // image.map((item) => {
      const imgobj = {
        path: image.path,
        // data: convertImageToBase64(item.path),
        fileInfo: {
          filename: imageName,
          fileSize: image.size,
          fileType: image.mime,
        },
      };

      convertImageToBase64(imgobj);
      //   );
    });
    setTimeout(() => setFlag(!flag), 500)
    // console.log("i am image converted in base 64", Uri.length);
  };
  return (
    <Modal animationType="slide" visible={open}>
      <SafeAreaView>
        {/* modal header */}
        <ModalHeader
          // heading={"Upload Image"}
          heading={"Upload Attachments"}
          closeModal={() => {
            setImageArray([])
            handleModal(false)
          }}
          btnTitle={"Submit"}
          btnMethod={updateAvatar}
          loading={loading}
          flushArr={selectImage}
          teams={true}
        />
        {/* Team and Admin name */}
        <View style={styles.teamName}>
          <Text style={styles.orgName}>{orgInfo?.name}</Text>
          <Text style={styles.adminName}>
            {adminData?.user_info?.display_name}
          </Text>
        </View>

        <View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: getHeightPixel(10),
            paddingHorizontal: getWidthPixel(15),
          }}>
            <Text style={styles.upload}>Upload</Text>
            {
              imageArray.length > 0 &&
              <TouchableOpacity onPress={fileBottomOpen}>
                <View style={{
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 10
                }}>
                  <Image source={icons.iconsMini.Add}
                    resizeMode='contain'
                    style={{
                      tintColor: 'white'
                    }}
                  />
                </View>
              </TouchableOpacity>
            }
          </View>
          {
            imageArray.length > 0 ?
              <TeamAttachmentList
                attachmentWidth={imageArray.length > 1 ? 75 : 100}
                data={imageArray}
                openingFrom={"mainLanding"}
                removeItem={(el) => {
                  setImageArray([...imageArray.filter((item) => item !== el)])
                }}
                onAttachmentPressed={(index) => {
                  setImageIndex(index);
                  setModalVisible(true);
                }}
              /> :
              <TouchableOpacity
                // onPress={() => pickImage()}
                onPress={fileBottomOpen}
                style={styles.imageContainer}
              >
                {selectedImage ? (
                  <View>
                    <Image
                      source={{ uri: selectedImage.path }}
                      style={styles.image}
                    />
                    <TouchableOpacity
                      style={styles.imageDeleteBtn}
                      onPress={() => selectImage()}
                    >
                      <Icon
                        name="close"
                        size={15}
                        style={{ color: colors.white }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.text}>+ Attachments</Text>
                  </View>
                )}
              </TouchableOpacity>
          }
        </View>
      </SafeAreaView>
      {/* SHOW MODAL */}
      {
        modalVisible &&
        <GestureRecognizer
          style={{ flex: 1 }}
          onSwipeDown={() => console.log("modal is close")}
        >
          <View style={{
            flex: 1,
            backgroundColor: "black"
          }}>
            <Modal
              statusBarTranslucent={false}
              animationType="fade"
              presentationStyle="overFullScreen"
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              {/* SHOW MODAL VISIBILY AND SEND post PROP */}
              <FullOrgModal
                // avatar={post?.user_info?.avatar?.url}
                avatar={orgInfo?.organization_info?.avatar?.signed_url}
                name={orgInfo?.organization_info?.display_name}
                createdAt={orgInfo?.created_at}
                text={orgInfo?.payload?.description}
                attachments={imageArray}
                // image={post?.attachments[imageIndex]?.url}
                image={imageArray[imageIndex]?.path}
                closeModal={setModalVisible}
                // type={post?.attachments[imageIndex]?.payload?.fileType}
                type={imageArray[imageIndex]?.fileInfo?.fileType}
                // id={post?.user_info?.id}
                id={orgInfo?.organization_info?.id}
                currentTabIndex={imageIndex}
              />
            </Modal>
          </View>
        </GestureRecognizer>}
      <BottomSheet
        index={-1}
        snapPoints={[200, 190]}
        initialSnapIndex={-1}
        enablePanDownToClose={true}
        ref={fileBottomSheetRef}
      >
        <BottomSheetModal
          fileBottomSheetRef={fileBottomSheetRef}
          chooseDocument={chooseDocument}
          chooseCamera={chooseCamera}
          chooseImage={chooseImage}
        />
      </BottomSheet>
    </Modal>
  );
};

export default ImageUpload;
