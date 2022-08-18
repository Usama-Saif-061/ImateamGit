import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MessageingHeader from "../../../common/Components/MessageingHeader";
import images from "../../../common/images";
import colors from "../../../common/colors";
import MessageSenderDetails from "./Components/MessageSenderDetails";
import Icon from "react-native-vector-icons/AntDesign";
import { getHeightPixel } from "../../../common/helper";
import { chatsList, MessageList } from "./constants";
import ModalComponent from "./Components/ModalComponent";
import {
  deleteChat,
  getAllConversations,
  getAllMessages,
} from "./API/messagesApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatUpdate,
  setExistingChats,
  startLoader,
  updateChatList,
} from "../../../Reducers/CommonReducers/chatSlice";
import { useGetUserQuery } from "../../../Reducers/usersApi";
import moment from "moment";

const MessagesMain = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delKey, setDelKey] = useState(-1); // key for the conversation you want to delete
  const [refreshing, setRefreshing] = useState(false);
  const { data: userInfo, isFetching: fetch } = useGetUserQuery();
  const selector = useSelector((selector) => selector);

  useEffect(() => {
    getAllChats();
  }, []);
  useEffect(() => {
    getAllChats(false);
  }, [selector.chat.updateChat]);
  useEffect(() => {
    if (selector.chat.updateList) {
      getAllChats(false);
    }
  }, [selector.chat.updateList]);
  const getAllChats = async (bool) => {
    try {
      bool !== false ? setLoader(true) : null;
      const res = await getAllConversations();
      setLoader(false);
      if (res.resultCode == 200) {
        // console.log('getAllConversations (Messages Main) -> ', JSON.stringify(res))
        console.log("getAllConversations response here");
        dispatch(setExistingChats(res.data));
        // let arr = res.data.filter(item => item.hidden !== true)
        let temp = [...res.data];
        var arr1 = temp.sort(
          (a, b) =>
            moment(b.last_message?.updated_at) -
            moment(a.last_message?.updated_at)
        );
        setChatList(arr1);
      } else {
        Alert.alert(
          "Error",
          res.message?.message
            ? res.message?.message
            : "Error while getting Conversations"
        );
      }
      dispatch(updateChatList(false));
    } catch (e) {
      console.log("Error getConversations MessagesMain -> ", e);
    } finally {
      setLoader(false);
    }
  };

  const rightActionSwipe = (item) => {
    return (
      <TouchableOpacity
        style={styles.deleteView}
        onPress={() => {
          setShowPopUp(true);
          setDelKey(item.id);
        }}
      >
        <View>
          <Icon size={25} name="delete" color={"white"} />
        </View>
      </TouchableOpacity>
    );
  };

  const confirmDelete = async () => {
    setShowPopUp(false);
    try {
      setLoader(true);
      let obj = {};
      obj["roomId"] = 34;
      obj["payload"] = {
        [userInfo.id]: {
          lastSeen: 0,
        },
      };
      const res = await deleteChat(obj);
      setLoader(false);
      if (res.resultCode == 200) {
        console.log("deleteChat -> ", JSON.stringify(res));
        Alert.alert("Success!", "Chat Deleted Successfully");
        let arr = chatList.filter((item) => item.id !== delKey);
        setChatList(arr);
      } else {
        Alert.alert(
          "Error",
          res.message?.message
            ? res.message?.message
            : "Error while deleting Conversation"
        );
      }
    } catch (e) {
      console.log("Error deleting Conversation -> ", e);
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundGray }}>
      <View style={{ flex: 1 }}>
        <MessageingHeader
          navigation={navigation}
          logo={images.logoBlue}
          centeralText="Messages"
          onPress={() => navigation.navigate("StartConversation")}
        />
        {!loader ? (
          <View
            style={{
              flex: 1,
            }}
          >
            {chatList.length !== 0 ? (
              <FlatList
                style={styles.list}
                data={chatList}
                refreshing={refreshing}
                onRefresh={() => getAllChats()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <MessageSenderDetails
                    obj={item}
                    rightActionSwipe={() => rightActionSwipe(item)}
                    navigation={navigation}
                  />
                )}
              />
            ) : (
              <View style={styles.noChatView}>
                <Text style={styles.noChatText}>No recent chats found</Text>
              </View>
            )}
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
      <ModalComponent
        modalHeader="Confirm delete"
        modalContent="You are about to permanently delete yourself from this team. Please confirm by clicking delete."
        showPopup={showPopUp}
        setShowPopup={(value) => setShowPopUp(value)}
        loading={loading}
        onConfirm={confirmDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingTop: getHeightPixel(10),
  },
  deleteView: {
    width: 56.33,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  noChatView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noChatText: {
    fontFamily: "Segoe UI",
    fontSize: getHeightPixel(16),
    fontWeight: "400",
  },
});
export default MessagesMain;
