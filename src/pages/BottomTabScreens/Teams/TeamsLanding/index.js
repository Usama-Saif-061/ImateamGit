import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import CommonIcon from "react-native-vector-icons/AntDesign";
import CalendarIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MessageIcon from "react-native-vector-icons/SimpleLineIcons";
import TeamIcon from "react-native-vector-icons/Ionicons";
import UserCogIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import colors from "../../../../common/colors";
import ProfileHeader from "../../../../common/Components/ProfileHeader";
import AppStatusBar from "../../../statusBarColor";
import AddButton from "../../Components/AddButton";
import { FlatList } from "react-native-gesture-handler";
import { font, getHeightPixel, getWidthPixel } from "../../../../common/helper";
import { useGetTeamsQuery } from "../../../../Reducers/teamsApi";
import { ShowInitialsOfName } from "../../../../common/Components/ShowInitialsOfName";
import ImageUpload from "../TeamProfileImage";
import { ActivityIndicator } from "react-native-paper";
import deleteOrg from "../API/deleteOrgApi";
import { useGetUserQuery, useGetFansQuery } from "../../../../Reducers/usersApi";
import { useDeleteTeamMutation } from "../../../../Reducers/teamsApi";
import { setNavFromLanding } from "../../../../Reducers/CommonReducers/calendarSlice";

const iconColor = colors.iconColor;
const iconSize = 18;

const TeamsLanding = ({ navigation, route }) => {
  let { data: userInfo } = useGetUserQuery()
  let { data: teams, isFetching, refetch } = useGetTeamsQuery();
  let { refetch: refetchFansData } = useGetFansQuery()
  let type = route?.params?.type;
  const [deleteTeam] = useDeleteTeamMutation()

  const dispatch = useDispatch()

  const [newData, setNewData] = useState([]);
  const [IUModal, handleIUModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [orgInfo, setOrgInfo] = useState();
  const [orgAction, setOrgAction] = useState("");
  const myData = useGetTeamsQuery();

  const renderTeam = ({ item, index }) => {
    return (
      <View style={styles.contentWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GetPostList", {
              id: item.organization_info.id,
              type: "Team",
            });
          }}
          style={styles.headerWrapper}
        >
          <View style={styles.headerWrapperDown}>
            <ShowInitialsOfName
              name={item.name}
              userId={item.organization_info.id}
              size={40}
              radius={20}
              fontSize={16}
              imgUrl={item.organization_info.avatar.url}
            />
          </View>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.timeText}>
              Members: <Text>{item.member_count}</Text>
            </Text>
          </View>
        </TouchableOpacity>
        {/* ITEM DESCRIPTION */}
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>{item.payload.description}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={styles.footer}>
            <View style={styles.footerIcons}>
              <MessageIcon
                name="bubble"
                size={iconSize}
                color={iconColor}
                // onPress={() => navigation.navigate("Conversation", {
                //   teamObj: item
                // })}
                onPress={() => navigation.navigate('StartConversation', {
                  teamObj: item
                })}
              />
              <CalendarIcon
                name="calendar-blank-outline"
                size={iconSize}
                color={iconColor}
                onPress={() => {
                  navigation.navigate('CalendarHome', {
                    calId: item.organization_calendar_id,
                    isTeam: true
                  });
                  dispatch(setNavFromLanding(true))
                }}
              />
              <TeamIcon
                name="people-outline"
                size={iconSize + 3}
                color={iconColor}
                onPress={() => {
                  navigation.navigate("TeamDetails", {
                    item: item,
                  });
                }}
              />
              <CommonIcon
                name="setting"
                size={iconSize}
                color={iconColor}
                onPress={() => {
                  setRefresh(false);
                  navigation.navigate("NewOrg", {
                    updateOrg: true,
                    teamData: item,
                    actionType: setOrgAction,
                  });
                }}
              />
              <UserCogIcon
                name="account-cog-outline"
                size={iconSize + 3}
                color={iconColor}
                onPress={() => {
                  handleIUModal(true);
                  setOrgInfo(item);
                }}
              />
            </View>
            <View style={styles.footerDeleteIcon}>
              <CommonIcon
                name="delete"
                size={iconSize}
                color={"red"}
                onPress={() => deleteGroup(item.name, item.id)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  // DELETE GROUP CARD FUNCTION
  const deleteGroup = (item, teamId) => {
    Alert.alert("Confirmation", "Do You Want to Delete " + item + "?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () =>
          setNewData((pre) => {
            DeleteOrganization(teamId);
          }),
      },
    ]);
  };

  const DeleteOrganization = async (id) => {
    let body = {
      organizationId: id,
    };
    await deleteTeam(body);

  };

  useEffect(() => {
    console.log("ActionType", orgAction);
    if (orgAction === "createOrg" || orgAction === "updateOrg") {
      console.log("i am here", route?.params?.type);
      setNewData([]);
      myData.refetch();
      setOrgAction("");

      if (!myData.isFetching) {
        console.log("my data is ", myData);
        setNewData(myData.data.team);
      }
    }

    if (!isFetching) {
      setNewData(teams);
    }
  }, [isFetching, newData, orgAction]);

  return (
    <View style={styles.container}>
      {/* <Text>I am here</Text> */}
      <SafeAreaView>
        <AppStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ProfileHeader navigation={navigation} />
      </SafeAreaView>
      {/* CONTENT 1 FOR EACH CARD */}
      <View style={styles.content}>
        {isFetching ? (
          <ActivityIndicator
            color={colors.inputBlue}
            style={{ margin: 15, flex: 1 }}
          />
        ) : newData ? (
          <FlatList data={newData} renderItem={renderTeam} />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: colors.inputBlue }}>
              No Group Created Yet, Press + To Create New
            </Text>
          </View>
        )}
      </View>
      <AddButton
        onPress={() => {
          navigation.navigate("NewOrg", {
            actionType: setOrgAction,
          });
        }}
      />

      <ImageUpload
        open={IUModal}
        handleModal={handleIUModal}
        orgInfo={orgInfo}
        setReload={setRefresh}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
  },
  contentWrapper: {
    backgroundColor: "#fff",
    marginHorizontal: getWidthPixel(17),
    marginTop: getHeightPixel(10),
    borderRadius: 6,
    minHeight: getHeightPixel(170),
  },
  headerWrapper: {
    flexDirection: "row",
    marginHorizontal: getWidthPixel(16),
    marginTop: getHeightPixel(15),
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderColor: "#fff",
    borderRadius: 20,
  },
  headerTextWrapper: {
    marginLeft: 5,
  },
  nameText: {
    ...font(16, "bold"),
    paddingBottom: 2,
  },
  timeText: {
    ...font(14),
    color: colors.accentGray,
  },
  descriptionWrapper: {
    width: 335.16,
    marginHorizontal: 16,
    margin: 9,
  },

  description: {
    ...font(14),
    lineHeight: 18.62,
    color: colors.accentGray,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 14,
    marginHorizontal: getWidthPixel(15),
    marginVertical: getHeightPixel(10),
    paddingVertical: getHeightPixel(12),
    borderRadius: 60,
    backgroundColor: colors.silverWhite,
  },

  footerIcons: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerDeleteIcon: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
export default TeamsLanding;
