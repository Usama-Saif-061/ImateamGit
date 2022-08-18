// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   TextInput,
//   Image,
//   TouchableWithoutFeedback,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   FlatList
// } from "react-native";
// import BottomSheet from "@gorhom/bottom-sheet";
// import ImagePicker from "react-native-image-crop-picker";
// import AttachIcon from "react-native-vector-icons/Entypo";
// import Icon from "react-native-vector-icons/AntDesign";
// import DropDownPicker from "react-native-dropdown-picker";
// import icons from "../../../../common/icons";
// import CommonHeader from "../../../../common/Components/CommonHeader";
// import colors from "../../../../common/colors";
// import { getWidthPixel, font, getHeightPixel } from "../../../../common/helper";
// import { TagList } from "../../../../common/StaticData";
// import postData from "../../../Landing/pages/MainLanding/dummyData";
// import DocumnetIcon from "react-native-vector-icons/Ionicons";
// import CameraIcon from "react-native-vector-icons/Feather";
// import { useGetUserQuery } from "../../../../Reducers/usersApi"
// import { useGetTeamMembersQuery } from "../../../../Reducers/teamsApi";
// import SearchComponent from "./SearchComponent";
// const Conversation = ({ navigation, route }) => {
//   const { data: member, isFetching } = useGetTeamMembersQuery(route.params.teamObj?.id);

//   const [chatName, setChatName] = useState("");
//   const [members, setMembers] = useState([])
//   const [teamMembers, setTeamMembers] = useState([])
//   const [comment, setComment] = useState("");
//   const [open3, setOpen3] = useState(false);
//   const [tagValue, setTagValue] = useState([]);
//   const [uri, setUri] = useState("");
//   const [tagItems, setTagItems] = useState(postData);
//   const fileBottomSheetRef = useRef(null);

//   useEffect(() => {
//     if (member) {
//       let arr = []
//       // member.map((item) => arr.push({ id: item.id, name: item.user_info.display_name }))
//       postData.map((item) => arr.push({ id: item.id, name: item.profileName }))
//       setMembers(arr)
//     }
//   }, [member])

//   const [memberObjList, setMemberObjList] = useState([])

//   const itemPressed = (arr) => {
//     let newList = []
//     for (let i = 0; i < arr.length; i++) {
//       let newItem = postData.find((item) => item.id == arr[i].id)
//       newList.push(newItem)
//     }
//     setMemberObjList(newList)
//   }

//   console.log('This is Members Objs length -> ', memberObjList.length)

//   const checkList = (item) => {
//     setTagValue((pre) => {
//       return pre.filter((temp) => temp != item);
//     });
//   };
//   const fileBottomClose = () => {
//     console.log("closed");
//     fileBottomSheetRef.current.close();
//   };
//   const fileBottomOpen = () => {
//     console.log("open");
//     fileBottomSheetRef.current.expand();
//   };
//   const chooseImage = () => {
//     fileBottomClose();
//     ImagePicker.openPicker({
//       width: 300,
//       height: 400,
//       cropping: false,
//       multiple: false,
//     }).then((image) => {
//       setUri(image.path);
//       // image.map((item) => setUri((prevArray) => [...prevArray, item.path]));
//     });
//   };
//   useEffect(() => {
//     console.log(uri);
//   }, [uri]);
//   console.log(tagValue);
//   return (
//     <View style={styles.container}>
//       <SafeAreaView>
//         <CommonHeader navigation={navigation} centerText="Start Conversation" />
//       </SafeAreaView>
//       <View style={styles.contentWrapper}>
//         <Text style={styles.text}>Chat Name</Text>
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={[styles.search, { textAlign: "left" }]}
//             autoCorrect={false}
//             placeholder="Type here.."
//             value={chatName}
//             onChangeText={(chatName) => setChatName(chatName)}
//           />
//         </View>
//         <View style={[styles.searchContainer2, { zIndex: 2, elevation: 5 }]}>
//           <SearchComponent
//             list={members}
//             onItemSelect={(arr) => { itemPressed(arr) }}
//           />
//           {/* TAGS DROPDOWN */}
//           {/* <DropDownPicker
//             open={open3}
//             multiple={true}
//             min={0}
//             max={5}
//             searchable={true}
//             value={tagValue}
//             items={tagItems}
//             setOpen={setOpen3}
//             setValue={setTagValue}
//             setItems={setTagItems}
//             dropDownDirection="BOTTOM"
//             placeholder="Search for users, fans"
//             style={{
//               backgroundColor: colors.searchBlue,
//               height: getHeightPixel(36),
//               paddingVertical: 0,
//               borderWidth: -5,
//             }}
//             selectedItemLabelStyle={{
//               fontWeight: "bold",
//               color: colors.inputBlue,
//             }}
//             placeholderStyle={{
//               ...font(12),
//               color: colors.accentGray,
//               textAlign: "center",
//             }}
//             showArrowIcon={false}
//             listMode="SCROLLVIEW"
//             schema={{
//               label: "title",
//               value: "profileName",
//             }}
//           /> */}
//         </View>
//         <View style={{ flex: 1 }}>
//           {tagValue.length != 0 ? (
//             <View style={styles.tagWrapper}>
//               {tagValue.map((item, index) => (
//                 <View style={styles.tag} key={index}>
//                   {/* <Image style={styles.tagImage} source={item.profileImage} /> */}
//                   <Text style={styles.tagText}>{item}</Text>
//                   <TouchableWithoutFeedback
//                     onPress={
//                       () => checkList(item) //REMOVE ITEM FROM NAMELIST....

//                       // setNameList((pre) => pre.splice(pre.indexOf(item) + 1))
//                     }
//                   >
//                     <Icon name="close" size={12} color="#fff" />
//                   </TouchableWithoutFeedback>
//                 </View>
//               ))}
//             </View>
//           ) : null}
//         </View>
//       </View>
//       <KeyboardAvoidingView style={styles.content2Wrapper} behavior="padding">
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             width: 45,
//           }}
//         >
//           <TouchableOpacity onPress={() => fileBottomOpen()}>
//             <AttachIcon name="attachment" size={18} color={colors.accentGray} />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <AttachIcon
//               name="emoji-happy"
//               size={18}
//               color={colors.accentGray}
//             />
//           </TouchableOpacity>
//         </View>

//         <TextInput
//           style={[
//             styles.search,
//             { textAlign: "left", flex: 2, ...font(14), color: colors.gray },
//           ]}
//           autoCorrect={false}
//           placeholder="Write a Comment"
//           value={comment}
//           onChangeText={(comment) => setComment(comment)}
//           multiline={true}
//           numberOfLines={3}
//         />
//         <TouchableOpacity>
//           <Image
//             source={require("../../../../common/assets/img/sendIcon.png")}
//             style={{ width: 40, height: 40 }}
//           />
//         </TouchableOpacity>
//       </KeyboardAvoidingView>

//       {/* BOTTOMSHEET FOR SELECTING DOCS, IMAGES AND CAMERA  */}
//       <BottomSheet
//         index={-1}
//         snapPoints={[200, 190]}
//         initialSnapIndex={-1}
//         enablePanDownToClose={true}
//         ref={fileBottomSheetRef}
//       >
//         <View style={styles.bottomSheetContainer}>
//           <View style={styles.bottomSheetHeader}>
//             <Text
//               style={{
//                 paddingBottom: 11,
//                 ...font(14, "bold"),
//                 color: colors.mineShaft,
//               }}
//             >
//               Choose Attached File
//             </Text>
//           </View>
//           <View
//             style={{ flexDirection: "row", justifyContent: "space-around" }}
//           >
//             <TouchableOpacity style={styles.bottomSheetIconsWrapper}>
//               <DocumnetIcon
//                 name="document-text-outline"
//                 size={23}
//                 style={{ padding: 20, color: "#fff" }}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={chooseImage}
//               style={styles.bottomSheetIconsWrapper}
//             >
//               <AttachIcon
//                 name="images"
//                 size={23}
//                 style={{
//                   padding: 20,
//                   color: "#fff",
//                 }}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.bottomSheetIconsWrapper}>
//               <CameraIcon
//                 name="camera"
//                 size={23}
//                 style={{ padding: 20, color: "#fff" }}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </BottomSheet>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   contentWrapper: {
//     flex: 2,
//     marginHorizontal: getWidthPixel(17),
//     paddingVertical: getWidthPixel(12),
//   },
//   text: {
//     ...font(16, "bold"),
//     marginBottom: getHeightPixel(7),
//   },
//   searchContainer: {
//     flexDirection: "row",
//     borderRadius: 6,
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingVertical: 9,
//     paddingBottom: 10,
//     borderColor: colors.accentGray,
//     borderWidth: 1,
//     marginBottom: getHeightPixel(20),
//   },
//   searchContainer2: {
//     marginBottom: getHeightPixel(18),
//   },
//   search: {
//     flex: 1,
//     ...font(12, "bold"),
//     width: 225,
//     paddingVertical: 0,
//     textAlign: "center",
//     paddingHorizontal: 20,
//     color: colors.accentGray,
//   },
//   searchIcon: {
//     marginRight: 12,
//   },
//   tagWrapper: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   tag: {
//     backgroundColor: colors.accentGray,
//     flexDirection: "row",
//     paddingHorizontal: 4,
//     borderRadius: 20,
//     alignItems: "center",
//     marginLeft: 4,
//     marginVertical: 6,
//   },
//   content2Wrapper: {
//     borderColor: colors.lightGray,
//     borderTopWidth: 1,
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderColor: colors.ironGray,
//     borderTopWidth: 1,
//     alignItems: "center",
//     marginBottom: getHeightPixel(10)
//   },
//   bottomSheetContainer: {
//     paddingHorizontal: 34,
//     flex: 1,
//   },
//   bottomSheetHeader: {
//     borderBottomColor: colors.lightSilver,
//     borderBottomWidth: 1,
//     marginBottom: 25,
//   },
//   bottomSheetItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//     paddingVertical: 9,
//     borderRadius: 30,
//   },
//   bottomSheetName: {
//     ...font(14, "bold"),
//   },
//   bottomSheetIconsWrapper: {
//     backgroundColor: colors.inputBlue,
//     borderRadius: 60,
//     justifyContent: "center",
//   },
// });

// export default Conversation;
