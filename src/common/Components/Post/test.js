import React, { memo, useState, useEffect, useRef } from "react";
import { Text, View, Dimensions, Pressable, Modal, Alert } from "react-native";
import FastImage from "react-native-fast-image";
import GestureRecognizer from "react-native-swipe-gestures";
import { Appearance } from "react-native";
import colors from "../../colors";

import Reshare from "./Reshare/index";

import {
  font,
  generateRandomColor,
  getHeightPixel,
  getWidthPixel,
  showInitials,
} from "../../helper";
import LikeIcon from "react-native-vector-icons/AntDesign";
import CommentIcon from "react-native-vector-icons/EvilIcons";
import EditIcon from "react-native-vector-icons/MaterialIcons";
import SharedPeoples from "../SharedPeoples";
import {
  GestureDetector,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { ShowInitialsOfName } from "../ShowInitialsOfName";

import Comments from "./Comments";
import FullPost from "./FullPost";
import { styles } from "./styles";
import likePosts from "../../../pages/Landing/Api/likePosts";
import { useGetCommentsQuery } from "../../../Reducers/postsApi";
import { set } from "immer/dist/internal";
import AddComment from "./AddComment";
import WebView from "react-native-webview";
import PostLikeAndShareList from "./PostLikesList";
import Video from "react-native-video";
import GetPostList from "../../../pages/BottomTabScreens/Teams/GetPostList";
import PostHeader from "../PostHeader";

const windowWidth = Dimensions.get("window").width;

// COMPONENT BODY
const Post = memo(
  ({
    post,
    sharedProfiles,
    user_id,
    id,
    userDetails,
    postListRef,
    postIndex,
    navigation,
    showAttachmentPicker,
    attachmentShown,
    pickerData,
    clearPickerData,
    setLoading,
  }) => {
    const commentInputRef = useRef();
    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [showCom, setCom] = useState(false);
    const [commentShown, setCommentShown] = useState(false); //To show all or single comment
    const samplePost = require("../../../pages/Landing/pages/MainLanding/dummyAssests/sample-post.jpg");
    const [modalVisible, setModalVisible] = useState(false);
    const [shareModal, setShareModal] = useState(false);
    const [imageIndex, setImageIndex] = useState(null);
    const [postId, setPostId] = useState("");
    const [comments, setComments] = useState([]);
    const [mylike, setMylike] = useState(post.liked_by_me);
    const [sentStatus, setStatus] = useState(false);
    const [likeCounter, setLikeCounter] = useState(post.liked_count);
    const [commentCount] = useState(null);
    const [likesListModal, setLikesListModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [commentAdded, setCommentAdded] = useState(false);
    const [UDModal, handleUDModal] = useState(false);
    const [userId, setUserId] = useState();

    const sample =
      "https://alchinlong.com/wp-content/uploads/2015/09/sample-profile-320x320.png";

    const date = post?.created_at;

    const commentsData = useGetCommentsQuery(post.id);
    const [postComments, setPostComments] = useState(commentsData.data);

    const resharedDate = post.payload?.repostInfo?.created_at;
    useEffect(() => {
      if (showCom) {
        commentInputRef.current.focus();
      }
      console.log("comment added", commentAdded);
    }, [showCom, commentAdded]);

    const refreshComment = () => {
      commentsData.refetch();
    };

    useEffect(() => {
      if (commentsData?.data) {
        setPostComments(commentsData?.data);
      }
    }, [commentsData.data]);

    //console.log("sent status", sentStatus);

    const repostCheck = post.payload.hasOwnProperty("repostInfo");
    // console.log("post.payload.repostInfo: ", post.payload?.repostInfo);
    const repostComment = post.payload.comment;
    const repostImage = post.payload.repostInfo?.avatar?.url;
    //  console.log("repostImage: ", repostImage);

    const colorScheme = Appearance.getColorScheme();
    const toggleNumberOfLines = () => {
      //To toggle the show text or hide it
      setTextShown(!textShown);
    };
    const toggleComments = () => {
      //To toggle the show text or hide it
      setCommentShown(!commentShown);
    };
    //like post function
    const likeHandler = async (id) => {
      const res = await likePosts(id);
      console.log("resp ", res);

      console.log("this is post data of a post", post);
      const like = res.liked_by_me;
      const count = res.counter;

      setMylike(like);
      console.log("this is my like ", like);
      setLikeCounter(count);
    };

    const openPostLikesModal = (postId) => {
      setModalType("likeListModal");
      setLikesListModal(true);
    };
    const openPostSharesListModal = (postId) => {
      setModalType("shareListModal");
      setLikesListModal(true);
    };
    useEffect(() => { }, [postId, comments, commentAdded]);

    return (
      // SINGLE POST COMPONENTmoda
      <View style={styles.container}>
        {/* POST HEADER */}
        <View style={styles.headerWrapper}>
          <PostHeader
            name={post?.user_info.display_name}
            img={post?.user_info.avatar.url}
            date={date}
            type={"postheader"}
            userId={post.user}
          />
          {console.log("posts")}
          {post?.user_info?.id === user_id ? (
            <TouchableOpacity
              style={styles.editIconWrapper}
              onPress={() => {
                navigation.navigate({
                  name: "CreatePost",
                  params: {
                    post: post,
                    user_id: user_id,
                    id: id,
                    userDetails: userDetails,
                    postIndex: postIndex,
                    nameList: post?.payload?.feeds,
                    postType: "editPost",
                    setLoader: true,
                  },
                  merge: true,
                });
              }}
            >
              <EditIcon
                name="edit"
                size={12}
                color={colorScheme == "dark" ? colors.black : colors.accentGray}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        {post?.payload?.feeds?.length != 0 ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingTop: getHeightPixel(10),
            }}
          >
            {post?.payload?.feeds?.map((item, index) => (
              <View key={index.toString()}>
                <View
                  style={{
                    backgroundColor: colors.accentGray,
                    flexDirection: "row",
                    paddingHorizontal: 4,
                    borderRadius: 20,
                    alignItems: "center",
                    marginLeft: getWidthPixel(4),
                    marginVertical: getHeightPixel(4),
                  }}
                //  key={index}
                >
                  <View
                    style={{
                      height: getHeightPixel(20),
                      width: getWidthPixel(20),
                      borderRadius: 10,
                      marginVertical: 2,
                      backgroundColor: generateRandomColor(index),

                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        //   color: item.color,
                        ...font(11, "bold"),
                        color: colors.white,
                        alignSelf: "center",
                      }}
                    >
                      {showInitials(item.display_name)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      ...font(14, "bold"),
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      color: "#fff",
                    }}
                  >
                    {item.display_name}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <></>
        )}

        <>
          {repostCheck ? (
            <View style={styles.repostInfo}>
              <Text style={styles.repostComment}>{repostComment}</Text>
              <Text style={styles.repostof}>Repost of</Text>

              <PostHeader
                name={post.payload?.repostInfo?.display_name}
                img={post?.payload?.repostInfo?.avatar?.url}
                date={resharedDate}
                type={"repostheader"}
                userId={post.payload?.repostInfo?.id}
              />
            </View>
          ) : null}
        </>
        {/* POST DESCRIPTION */}
        <View style={styles.descriptionWrapper}>
          <Text
            // onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 1}
            style={styles.description}
          >
            {post.payload.text}
          </Text>

          {post.payload.text?.split(" ").length >= 8 ? (
            <Text
              onPress={toggleNumberOfLines}
              style={{ lineHeight: 21, marginTop: 5, color: colors.inputBlue }}
            >
              {textShown ? "Read less..." : "Read more..."}
            </Text>
          ) : null}
        </View>

        {/* SHARED PEOPLE'S PROFILE ICONS */}
        <View>
          {sharedProfiles?.length != 0 ? (
            <SharedPeoples profiles={sharedProfiles} />
          ) : null}
        </View>
        {/* POST IMAGE */}

        {post.attachments.length ? (
          <>
            {/* FILTER CONTENT IF ITS IS "image/jpeg" or "video/quicktime" */}

            {post.attachments[0]?.payload.fileType === "application/pdf" ? (
              <View style={{ flex: 1, height: getHeightPixel(300) }}>
                <WebView
                  source={{
                    uri: `https://docs.google.com/gview?embedded=true&url=${post.attachments[0]?.upload}`,
                  }}
                />
              </View>
            ) : post.attachments[0]?.payload.fileType === "video/mp4" ? (
              <Video
                source={{ uri: post.attachments[0].url }}
                minLoadRetryCount={3}
                controls={true}
                paused={true}
                fullscreen={true}
                resizeMode="contain"
                style={{ height: getHeightPixel(300) }}
              />
            ) : post.attachments[0]?.payload.fileType === "image/jpeg" ||
              "image/png" ? (
              <View>
                {post.attachments.length <= 1 ? (
                  <Pressable
                    onPress={() => {
                      setImageIndex(0);
                      setModalVisible(true);
                    }}
                  >
                    <FastImage
                      source={{
                        uri: post.attachments[0].url,
                        priority: FastImage.priority.high,
                      }}
                      style={[styles.postImage]}
                    />
                  </Pressable>
                ) : (
                  // NEEDS TO BE MODIFIED IN FUTURE
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      backgroundColor: "pink",
                      height: 230,
                      overflow: "hidden",
                    }}
                  >
                    {post.attachments.map((item, id) => (
                      <Pressable
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          width: "100%",
                          height: "100%",
                          margin: getWidthPixel(0.4),
                        }}
                        // OPEN MODAL TO SHOW FULL SIZE IMAGE
                        onPress={() => {
                          setImageIndex(id);
                          setModalVisible(true);
                        }}
                        key={id}
                      >
                        <FastImage
                          source={{
                            uri: item.url,
                            priority: FastImage.priority.high,
                          }}
                          style={{
                            resizeMode: "stretch",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>
            ) : (
              <View>
                <FastImage style={styles.postImage} source={samplePost} />
              </View>
            )}
          </>
        ) : null}

        {/* POST LIKES & COMMENTS */}
        <View style={styles.postAnalyticWrapper}>
          <TouchableOpacity onPress={() => openPostLikesModal(post.id)}>
            <Text style={styles.likeText}>Like {likeCounter}</Text>
          </TouchableOpacity>
          <View style={styles.commentShareWrapper}>
            <TouchableOpacity
              onPress={() => {
                console.log("comments preseed");
              }}
            >
              <Text style={styles.likeText}>{post.comment_count} Comments</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openPostSharesListModal(post.id)}>
              <Text
                style={{ ...styles.likeText, marginLeft: getWidthPixel(10) }}
              >
                {post.repost_count} Shares{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* POST ACTIONS i.e LIKE, COMMENT & SHARE */}
        <View style={styles.postActionsWrapper}>
          <View style={styles.likeShareContainer}>
            <TouchableOpacity
              onPress={async () => {
                await likeHandler(post?.id);
                return;
              }}
              style={styles.likeIcon}
            >
              <LikeIcon
                name={"like2"}
                size={19}
                color={mylike ? colors.inputBlue : colors.accentGray}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.commentIcon}
              onPress={() => {
                // console.log("comment count", post.comment_count);
                setCom(!showCom);
                clearPickerData([]);
                postListRef.scrollToIndex({
                  animated: true,
                  index: postIndex,
                  viewOffset: post.attachments.length ? -150 : 10,
                });
              }}
            >
              <CommentIcon name="comment" size={25} color={colors.accentGray} />
            </TouchableOpacity>
          </View>

          {post?.user_info?.id === user_id ||
            post?.payload?.repostInfo ? null : (
            <TouchableOpacity onPress={() => setShareModal(!shareModal)}>
              <View style={styles.shareIcon}>
                <CommentIcon
                  name="retweet"
                  size={26}
                  color={colors.accentGray}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* COMMENTS COMPONENT FOR EACH POST  */}
        <View>
          {post?.comment_count != 0 ? (
            <Comments
              data={postComments}
              show={sentStatus}
              post={post}
              sharedProfiles={sharedProfiles}
              user_id={user_id}
              id={id}
              userDetails={userDetails}
              postListRef={postListRef}
              postIndex={postIndex}
            />
          ) : null}
        </View>

        {/* Add comment component */}
        {showCom && (
          <AddComment
            inputRef={commentInputRef}
            post={post}
            method={setCommentAdded}
            onAddComment={refreshComment}
            userId={user_id}
            showAttachmentPicker={showAttachmentPicker}
            attachmentShown={attachmentShown}
            pickerData={pickerData}
            setLoading={setLoading}
          />
        )}

        {/* Modal for Repost/reshare */}
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
            postText={post.payload.text}
            postdata={post}
            userdata={userDetails}
          />
        </Modal>
        {/*likes list modal*/}

        <Modal
          animationType="slide"
          transparent={true}
          visible={likesListModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setLikesListModal(false);
          }}
        >
          <PostLikeAndShareList
            postId={post.id}
            navigation={navigation}
            closeModal={setLikesListModal}
            likeCount={likeCounter}
            modalType={modalType}
          />
        </Modal>

        {/* SHOW MODAL */}
        <GestureRecognizer
          style={{ flex: 1 }}
          onSwipeDown={() => console.log("modal is close")}
        >
          <View style={styles.centeredView}>
            <Modal
              statusBarTranslucent={false}
              presentationStyle="pageSheet"
              animationType="fade"
              presentationStyle="overFullScreen"
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <FullPost
                avatar={post?.user_info?.avatar.url}
                name={post?.user_info?.display_name}
                createdAt={post?.attachments[0]?.created_at ?? post.created_at}
                text={post?.payload?.text}
                image={post.attachments[imageIndex]?.url}
                closeModal={setModalVisible}
                type={post?.attachments[imageIndex]?.payload.fileType}
              />
            </Modal>
            <GetPostList
              open={UDModal}
              id={userId}
              handleModal={handleUDModal}
            />
          </View>
        </GestureRecognizer>
      </View>
    );
  }
);

export default Post;
