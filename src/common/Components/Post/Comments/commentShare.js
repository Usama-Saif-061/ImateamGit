import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Modal } from "react-native";
import colors from "../../../colors";
import { getWidthPixel } from "../../../helper";
import Reshare from "./../Reshare";
import CommentIcon from "react-native-vector-icons/EvilIcons";
import PostLikeAndShareList from "../PostLikesList";

function CommentShare({
  commentText,
  post,
  userDetails,

  commentId,
}) {
  const [shareModal, setShareModal] = useState(false);
  const [commentListModal, setCommentListModal] = useState(false);

  const commentShareListModal = () => {
    console.log("comment list modal opened id is ", commentId);

    setCommentListModal(true);
  };
  return (
    <View style={styles.commentLink}>
      <TouchableOpacity
        onPress={() => setShareModal(!shareModal)}
        style={styles.commentLink}
      >
        <Text style={{ color: colors.accentGray }}>Share</Text>

        <Modal
          animationType="slide"
          visible={shareModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setShareModal(false);
          }}
        >
          <Reshare
            closeModal={() => setShareModal(!shareModal)}
            postText={commentText}
            postdata={post}
            userdata={userDetails}
            commentId={commentId}
            postType={"commentShare"}
          />
        </Modal>
      </TouchableOpacity>
      <TouchableOpacity onPress={commentShareListModal}>
        <View style={styles.likeIcon}>
          <CommentIcon name="retweet" size={16} color={colors.white} />
        </View>
      </TouchableOpacity>

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
          //  likeCount={alikeCount}
          modalType={"commentShareListModal"}
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
    flexDirection: "row",
    alignSelf: "center",
  },
  likeIcon: {
    borderRadius: 8,
    backgroundColor: colors.primary,
    padding: 2,
  },
  likeCount: {
    marginHorizontal: 5,
  },
  likeIcon: {
    borderRadius: 8,
    backgroundColor: colors.primary,
    padding: 2,
  },
});
export default CommentShare;
