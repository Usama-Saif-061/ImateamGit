import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import colors from "../../../colors";
import styles from "./styles";
import CommentLike from "./CommentLike";

import PostHeader from "./../../PostHeader/";
import FullPost from "../FullPost";
import PostAttachmentList from "../../PostAttachmentList";
import { useGetUserQuery } from "../../../../Reducers/usersApi";
import commentsRepliesAPI from "../../../../pages/Landing/Api/commentReplies";
const Comments = ({
  show,
  data,
  id,
  showCommentInput,
  showCom,
  myId,
  navigation,
  setCommentType,
  type,
  nestingLevel,
}) => {
  const [commentShown, setCommentShown] = useState(show); //TO SHOW OR ALL COMMENTS
  const [commentId, setCommentId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showReplies, setCommentReplies] = useState();
  const [selectedComment, setSelectedComment] = useState(0);
  const { data: userData, isFetching } = useGetUserQuery();
  const [commentReplies, getCommentReplies] = useState(null);

  var replies;

  const toggleComments = () => {
    //TOGGLE FUNCTION TO HIDE OR SHOW THE COMMENTS
    setCommentShown(!commentShown);
  };

  const loadReplies = async (id) => {
    replies = await commentsRepliesAPI(id);
    setCommentId(id);
    setCommentReplies(!showReplies);
    getCommentReplies(replies);
  };

  useEffect(() => {}, [showCom]);
  return (
    <View>
      <View>
        {/* CHECK ON TOGGLE FOR HIDING AND SHOWING ALL THE COMMENTS */}
        <View>
          {data && !commentShown ? (
            <View>
              <View
                key={id}
                style={[
                  styles.headerWrapper,
                  { marginVertical: 4, alignItems: "flex-start" },
                ]}
              >
                <View>
                  <PostHeader
                    name={data[0]?.user_info?.display_name}
                    img={userData?.avatar?.url}
                    date={data[0]?.created_at}
                    type={"commentheader"}
                    userId={data[0]?.user_info?.id}
                    comment={data[0]?.payload?.text}
                    myId={myId}
                    navigation={navigation}
                  />
                  <View style={styles.commentLinks}>
                    <CommentLike
                      commentId={data[0]?.id}
                      likedByMe={data[0]?.liked_by_me}
                    />
                    {nestingLevel === "2" ? null : (
                      <TouchableOpacity
                        onPress={() => {
                          showCommentInput(!showCom);
                          setCommentType({ type: "reply", id: data[0].id });
                        }}
                        style={{
                          ...styles.commentLink,
                          borderLeftColor: colors.lightSilver,
                          borderLeftWidth: 1,
                          borderRightColor: colors.lightSilver,
                          //  borderRightWidth: 1,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ color: colors.accentGray }}>
                            Reply
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    {nestingLevel === "2" ? null : (
                      <TouchableOpacity onPress={() => loadReplies(data[0].id)}>
                        {data[0].reply_count > 0 ? (
                          <Text
                            style={{
                              color: colors.accentGray,
                              paddingLeft: 10,
                            }}
                          >
                            {data[0].reply_count}
                          </Text>
                        ) : null}
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>

              {showReplies && data[0].reply_count > 0 ? (
                <View style={styles.repliesContainer}>
                  <Comments
                    data={commentReplies}
                    show={show}
                    id={data[0].id}
                    showCommentInput={showCommentInput}
                    showCom={showCom}
                    myId={myId}
                    navigation={navigation}
                    setCommentType={setCommentType}
                    type={"replies"}
                    nestingLevel={"2"}
                  />
                </View>
              ) : null}
            </View>
          ) : null}

          {commentShown && data ? (
            <View>
              {data.map((item, id) => (
                <View
                  key={id}
                  style={[
                    styles.headerWrapper,
                    {
                      marginVertical: 4,
                      // alignItems: "flex-start",
                      flexDirection: "column",
                    },
                  ]}
                >
                  <PostHeader
                    name={item?.user_info?.display_name}
                    img={item?.user_info?.avatar?.url}
                    date={item.created_at}
                    type={"commentheader"}
                    userId={item.user_info?.id}
                    comment={item.payload.text}
                    myId={myId}
                    navigation={navigation}
                  />

                  <PostAttachmentList
                    commentIndex={id}
                    attachmentWidth={75}
                    data={item?.attachments}
                    onAttachmentPressed={(i) => {
                      setSelectedComment(i);
                      setTimeout(() => {
                        setModalVisible(true);
                      }, 750);
                    }}
                  />

                  <View style={styles.commentLinks}>
                    <CommentLike
                      commentId={item?.id}
                      likedByMe={item?.liked_by_me}
                    />
                    {nestingLevel === "2" ? null : (
                      <TouchableOpacity
                        onPress={() => {
                          showCommentInput(true);
                          setCommentType({ type: "reply", id: item.id });
                        }}
                        style={{
                          ...styles.commentLink,
                          borderLeftColor: colors.lightSilver,
                          borderLeftWidth: 1,
                          borderRightColor: colors.lightSilver,
                          //  borderRightWidth: 1,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ color: colors.accentGray }}>
                            Reply
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    {nestingLevel === "2" ? null : (
                      <TouchableOpacity onPress={() => loadReplies(item.id)}>
                        {item.reply_count > 0 ? (
                          <Text
                            style={{
                              color: colors.accentGray,
                              paddingLeft: 10,
                            }}
                          >
                            {item.reply_count}
                          </Text>
                        ) : null}
                      </TouchableOpacity>
                    )}
                  </View>
                  {showReplies &&
                  item.reply_count > 0 &&
                  item.id === commentId ? (
                    <View style={styles.repliesContainer}>
                      <Comments
                        data={commentReplies}
                        show={show}
                        id={item.id}
                        showCommentInput={showCommentInput}
                        showCom={showCom}
                        myId={myId}
                        navigation={navigation}
                        setCommentType={setCommentType}
                        type={"replies"}
                        nestingLevel={"2"}
                      />
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => toggleComments()}
          style={{ marginLeft: 74, marginTop: 9, marginBottom: 11 }}
        >
          <Text style={styles.showReplies}>
            {commentShown
              ? nestingLevel === "2"
                ? "Hide Replies"
                : "Hide Comments"
              : nestingLevel === "2"
              ? " Show all replies"
              : "Show all comments"}
          </Text>
        </TouchableOpacity>
      </View>
      {!data ? null : (
        <Modal
          statusBarTranslucent={true}
          presentationStyle="pageSheet"
          animationType="fade"
          // presentationStyle="overFullScreen"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          {/* SHOW MODAL VISIBILY AND SEND post PROP */}
          <FullPost
            avatar={data[selectedComment]?.user_info?.avatar?.url}
            name={data[selectedComment]?.user_info?.display_name}
            createdAt={data[selectedComment]?.createdAt}
            text={data[selectedComment]?.payload?.text}
            attachments={data[selectedComment]?.attachments}
            closeModal={setModalVisible}
          />
        </Modal>
      )}
    </View>
  );
};

export default Comments;
