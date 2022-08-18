import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import likeCommentAPI from "../../../../pages/Landing/Api/likeCommentAPI";
import colors from "../../../colors";
import LikeIcon from "react-native-vector-icons/AntDesign";
import { font, getHeightPixel, getWidthPixel } from "../../../helper";
import PostLikeAndShareList from "../PostLikesList";

function CommentLike({ commentId, likedByMe, alikeCount }) {
  const [liked, setLlikedByMe] = useState(likedByMe);
  const [likeCount, setLikeCount] = useState(alikeCount);
  const [commentListModal, setCommentListModal] = useState(false);
  const likeComment = async (id) => {
    console.log("comment like pressed id is", id);

    const likeCommentResponse = await likeCommentAPI(id);
    console.log("response of like Comment", likeCommentResponse);
    if (likeCommentResponse.like === "added") {
      setLlikedByMe(true);
      setLikeCount(likeCommentResponse.count);
    } else if (likeCommentResponse.like === "removed") {
      setLlikedByMe(false);
      setLikeCount(likeCommentResponse.count);
    }
  };

  const loadCommentsLike = () => {
    console.log("comments id to load likes list is ", commentId);
    setCommentListModal(true);
  };
  return (
    <View style={styles.likeContainer}>
      <TouchableOpacity
        onPress={() => likeComment(commentId)}
        style={styles.commentLink}
      >
        <Text
          style={{
            color: liked ? colors.primary : colors.accentGray,
          }}
        >
          Like
        </Text>
      </TouchableOpacity>
      <Pressable
        onPress={loadCommentsLike}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View style={styles.likeIcon}>
          <LikeIcon name={"like2"} size={14} color={colors.white} />
        </View>
        <Text style={styles.likeCount}>{likeCount ? likeCount : ""}</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={commentListModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setCommentListModal(false);
        }}
      >
        <PostLikeAndShareList
          postId={commentId}
          //   navigation={navigation}
          closeModal={setCommentListModal}
          likeCount={alikeCount}
          modalType={"commentLikeListModal"}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  likeContainer: {
    flexDirection: "row",
    paddingHorizontal: 4,
    alignContent: "center",
    alignSelf: "center",
  },

  commentLink: {
    paddingHorizontal: getWidthPixel(10),
  },
  likeIcon: {
    borderRadius: 8,
    backgroundColor: colors.primary,
    padding: 2,
  },
  likeCount: {
    marginHorizontal: 5,
    ...font(14),
  },
});
export default CommentLike;
