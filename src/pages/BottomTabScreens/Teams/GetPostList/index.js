import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import icons from "../../../../common/icons";
import styles from "./styles";
import colors from "../../../../common/colors";
import { ShowInitialsOfName } from "../../../../common/Components/ShowInitialsOfName";
import { getHeightPixel, getWidthPixel } from "../../../../common/helper";
import Header from "../../../../common/Components/HeaderCommon";
import {
  useGetMemberInfoQuery,
  useGetMemberPostsQuery,
} from "../../../../Reducers/teamsApi";
import Post from "../../../../common/Components/Post";
import { ActivityIndicator } from "react-native-paper";
import AddButton from "../../Components/AddButton";
import FollowFan from "../../API/followFanApi";
import {
  useGetUserQuery,
  useGetFansQuery,
} from "../../../../Reducers/usersApi";
import { useFollowFanMutation } from "../../../../Reducers/usersApi";
import userPostsPaginationAPI from "../API/usersPostsPaginationAPI";
import { useSelector } from "react-redux";

const GetPostList = ({ route, navigation }) => {
  const id = route?.params?.id;
  const type = route?.params?.type;
  const member = route?.params?.member;
  const { data: adminData, isFetching: fetchingAdmin } = useGetUserQuery();
  const { data: socialData, isFetching: isSuccess } = useGetMemberInfoQuery(id);
  const { refetch } = useGetFansQuery();
  const { data: posts, isFetching } = useGetMemberPostsQuery(id);
  const [followFan, results] = useFollowFanMutation();
  const [load, setLoad] = useState(false);
  const [fanAdded, setAdded] = useState(false);
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState(
    route?.params?.id ? route?.params?.id : ""
  );
  const allChats = useSelector((state) => state.chat.existingChats);

  const [endPost, setEndPost] = useState(posts?.hasMore);

  const [realPost, setRealPost] = useState([]);

  const getMorePost = async (page) => {
    var m;
    if (endPost) {
      m = await userPostsPaginationAPI(id, page);
      console.log(m);
      setRealPost([...posts.posts, ...m.posts]);

      if (m?.hasMore === false) {
        setEndPost(false);
      }
    } else { }

    console.log("2ndd page data is ", m);
  };

  useEffect(() => {
    console.log("posts are", posts);
    setRealPost(posts?.posts);
    setEndPost(posts?.hasMore);
  }, [isFetching]);

  async function addFan() {
    if (userId) {
      setLoad(true);
      // let body = {
      //   action: "following",
      //   connectionId: id,
      //   userOrTarget: "user",
      // };
      let body = {
        userIds: [userId],
      };
      console.log("bodyData====>", body);
      console.log("adminData.id===>", adminData.id);
      let response = await FollowFan(body, adminData.id);
      console.log("response => ", response);
      if (response) {
        setLoad(false);
        console.log("ADD FAN RESP", response);
        setAdded(true);
      }
    }
  }

  const startChatFunc = () => {
    let tempObj;
    if (allChats.length > 0) {
      allChats.map(chat => {
        if (chat.name == '') {
          obj = chat.users.find(user => user.id == socialData.id)
          if (obj) {
            tempObj = chat;
          }
        }
      })
    }
    if (tempObj) {
      navigation.navigate('SingleChat', { chatObj: tempObj })
    } else {
      navigation.navigate('StartConversation', {
        fanObj: socialData
      })
    }
  }

  const renderProfileInfo = () => (
    <View>
      <View style={styles.profileInfo}>
        <ShowInitialsOfName
          size={getHeightPixel(66)}
          radius={getHeightPixel(33)}
          name={socialData?.display_name}
          userId={id}
          fontSize={26}
          imgUrl={socialData?.avatar?.url}
        />
        <Text style={styles.userName}>{socialData?.display_name}</Text>
        <Text style={styles.dimText}>{socialData?.locale?.address}</Text>
      </View>
      <View style={styles.userSocial}>
        <View style={styles.socialData}>
          <Text style={styles.social}>Fans</Text>
          <Text style={[styles.social, styles.boldNumbers]}>
            {socialData?.social?.followers}
          </Text>
        </View>
        <View style={styles.socialData}>
          <Text style={styles.social}>Posts</Text>
          <Text style={[styles.social, styles.boldNumbers]}>
            {socialData?.social?.posts}
          </Text>
        </View>
        <TouchableOpacity style={styles.socialData} onPress={startChatFunc}>
          <Icon
            style={[styles.social, { marginBottom: getHeightPixel(5) }]}
            name="message1"
            size={getHeightPixel(18)}
          />
          <Text style={styles.social}>Message</Text>
        </TouchableOpacity>
        {load ? (
          <ActivityIndicator
            style={styles.socialData}
            color={colors.inputBlue}
            size="small"
          />
        ) : socialData?.connection?.i_follow ||
          !socialData?.connection === null ||
          socialData?.id === adminData?.id ? null : !fanAdded ? (
            <TouchableOpacity
              style={styles.socialData}
              // onPress={() => addFan(socialData?.connection?.id)}
onPress={() => addFan()}
            >
              <Icon
                style={[styles.social, { marginBottom: getHeightPixel(2) }]}
                name="user"
                size={getHeightPixel(18)}
              />
              <Text style={styles.social}>Add Fan</Text>
            </TouchableOpacity>
          ) : (
          <View style={styles.socialData}>
            <Icon
              style={[styles.social, { marginBottom: getHeightPixel(5) }]}
              name="checkcircleo"
              size={getHeightPixel(18)}
            />
            <Text style={styles.social}>Added</Text>
          </View>
        )}
      </View>
      <View style={styles.profileBio}>
        <Text style={styles.bioText}>
          {socialData?.payload?.description || "Hi, i am also on ImaTeam"}
        </Text>
      </View>
    </View>
  );

  const renderProfileInfoSkeleton = () => (
    <View>
      <View style={styles.imgSkeleton}>
        <View style={styles.imgSkull}></View>
        <View style={styles.imgTextSkull}></View>
        <View style={styles.imgTextSkulldim}></View>
      </View>
      <View style={styles.skullContainer}>
        <View style={styles.skullHead}>
          <View style={styles.skull}></View>
        </View>
        <View style={styles.skullHead}>
          <View style={styles.skull}></View>
        </View>
        <View style={styles.skullHead}>
          <View style={styles.skull}></View>
        </View>
        <View style={styles.skullHead}>
          <View style={styles.skull}></View>
        </View>
      </View>
      <View style={styles.profileBio}>
        <View style={styles.TextSkull}></View>
      </View>
    </View>
  );

  return (
    <View style={styles.Container}>
      <SafeAreaView>
        <Header
          heading={`${type} Details`}
          navigation={navigation}
          teams={true}
        />
      </SafeAreaView>
      <View styles={styles.socialContainer}>
        {!isSuccess ? renderProfileInfo() : renderProfileInfoSkeleton()}
      </View>

      <View style={styles.listing}>
        {isFetching ? (
          <ActivityIndicator
            color={colors.inputBlue}
            style={{ marginTop: 25 }}
          />
        ) : (
          <FlatList
            style={{
              flex: 1,
              marginBottom: getHeightPixel(5),
            }}
            data={realPost}
            onEndReached={() => {
              getMorePost(page + 1);
            }}
            onEndReachedThreshold={0.2}
            renderItem={({ item }) => (
              <View>
                <Post
                  post={item}
                  icons={icons}
                  posts={realPost}
                  user_id={adminData?.id}
                  userDetails={socialData}
                  navigation={navigation}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      {type === "Team" && (
        <AddButton
          onPress={() => {
            navigation.navigate({
              name: "CreatePost",
              params: {
                postType: "createPost",
                postFromTeam: true,
                teamAvatar: socialData?.avatar?.url,
                teamName: socialData?.display_name,
                teamId: id,
              },
            });
          }}
        />
      )}
    </View>
  );
};

export default GetPostList;
