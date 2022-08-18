import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, Pressable, FlatList } from "react-native";
import styles from "./styles";

import AppStatusBar from "../../../../pages/statusBarColor";
import postLikesListAPI from "../../../../pages/Landing/Api/postLikesListAPI";
import postShareListAPI from "../../../../pages/Landing/Api/postShareListAPI";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "./../../../colors";
import commentsLikeListAPI from "../../../../pages/Landing/Api/commentLikesListAPI";
import PostHeader from "../../PostHeader";

import Loading from "../../MainFrame";
function PostLikeAndShareList({
  postId,
  navigation,
  closeModal,
  likeCount,
  modalType,
  commentId,
}) {
  const [List, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getLikesList = async () => {
    setLoading(true);

    const response = await postLikesListAPI((id = postId));
    const coloredList = response?.liked_by.map((item) => {
      return {
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        ...item,
        image: item?.avatar?.upload,
        name: item?.display_name,
      };
    });
    console.log("length of like list", response?.liked_by);
    console.log("list after adding color", coloredList);
    setList(coloredList);
    setLoading(false);
  };

  const getShareList = async () => {
    setLoading(true);
    const response = await postShareListAPI(postId);

    const coloredList = response?.map((item) => {
      return {
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
        ...item,
        image: item?.avatar?.upload,
        name: item?.display_name,
      };
    });

    console.log("here is data before setting in share list", response);
    setLoading(false);
    setList(coloredList);
    console.log("here is data before setting in share list", isLoading);
  };

  const getCommentLikeList = async () => {
    setLoading(true);
    const response = await commentsLikeListAPI(postId);
    console.log("response from CommentLike list====>", response);
    if (response) {
      setLoading(false);
      const coloredList = response?.liked_by.map((item) => {
        return {
          color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          ...item,
          image: item?.avatar?.upload,
          name: item?.display_name,
        };
      });

      console.log("comment likes list", response);
      setList(coloredList);
    }
  };
  const getCommentShareList = () => {
    console.log("comment shares list");
  };

  const renderList = ({ item }) => (
    <PostHeader
      name={item.name}
      img={item.image}
      type={"repostheader"}
      userId={item.id}
    />
  );

  useEffect(() => {
    console.log("modal type is :", modalType);
    if (modalType === "likeListModal") {
      console.log(" id for post likes list ", postId);
      getLikesList();
    } else if (modalType === "shareListModal") {
      getShareList();
      console.log(" id for post shares list", postId);
    } else if (modalType === "commentLikeListModal") {
      getCommentLikeList();
      console.log(" id for comments like list ", postId);
    } else if (modalType === "commentShareListModal") {
      getCommentShareList();
      console.log(" id for comments share list ", postId);
    }
  }, []);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.innerContainer}>
        <SafeAreaView>
          <AppStatusBar backgroundColor="#fff" barStyle="dark-content" />
        </SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {modalType === "likeListModal" ? "Likes" : "Reposts"} :{" "}
            {List.length} Total
          </Text>
          <Pressable
            onPress={() => closeModal(false)}
            style={styles.closeButton}
          >
            <Icon name={"close"} size={21} color={"black"} />
          </Pressable>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={List}
          // ListHeaderComponent={() => (
          //   <View>
          //     <Text style={{ marginBottom: 16 }}>Post to....</Text>
          //   </View>
          // )}
          renderItem={renderList}
        />
      </View>
      <Loading isLoading={isLoading} backgroundColor={colors.white} />
    </View>
  );
}

export default PostLikeAndShareList;
