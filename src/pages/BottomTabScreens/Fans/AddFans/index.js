import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import ButtonCommon from "../../../../common/Components/Buttons";
import colors from "../../../../common/colors";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./style";
import notConnectedFans from "../../../../Reducers/getNotConnectedFans";
import { ShowInitialsOfName } from "../../../../common/Components/ShowInitialsOfName";
import { useGetFansQuery } from "../../../../Reducers/usersApi";
import { useUpdateFansMutation } from "../../../../Reducers/usersApi";
import { useGetUserQuery } from "../../../../Reducers/usersApi";
import EmptyProfileComp from "../../../../common/Components/Profile/EmptyProfileComp";
import { addFansApi } from "../fansApi";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AddFansModal = (props) => {
  const [fansArr, fillFansArr] = useState([]);
  const [selectedFans, selectFans] = useState([]);
  const [addFan] = useUpdateFansMutation();
  const [searchTxt, setSearchTxt] = useState("");
  const { data: userData, isFetching } = useGetUserQuery();
  const { refetch } = useGetFansQuery(props.id);

  const getFans = async (e) => {
    if (e.length > 2) {
      let jsonBody = {
        searchInput: e,
        extra: {
          notConnected: true,
        },
      };

      let response = await notConnectedFans(jsonBody);
      if (response) {
        fillFansArr(response.data);
      }
    } else {
      fillFansArr([]);
    }
  };

  // const followFans = async () => {
  //   let followArr = [];
  //   selectedFans.map((x) => {
  //     followArr.push(x.id);
  //   });
  //   const body = {
  //     userIds: followArr,
  //   };
  //   let response = await addFollow(body);
  //   if (response) {
  //     console.log("Follows call", response);
  //     selectFans([]);
  //     fillFansArr([]);
  //     refetch()
  //     props.modal(false);
  //   }
  // };

  const followFans = async () => {
    let followArr = [];
    selectedFans.map((x) => {
      followArr.push(x.id);
    });
    const body = {
      userIds: followArr,
    };
    // let response = await addFan(userData.id, JSON.stringify(body));
    try {
      let response = await addFansApi(userData.id, body);
      console.log("Respo fan adding => ", JSON.stringify(response));
      if (response.resultCode == 200) {
        props.setFans(response.data);
        selectFans([]);
        fillFansArr([]);
        props.modal(false);
      }
    } catch (e) {
      console.log("error ", e);
    }
  };

  const deleteFan = (id, fan) => {
    selectedFans.splice(id, 1);
    selectFans([...selectedFans]);
    // fansArr.unshift(fan);
  };

  return (
    <Modal animationType="slide" visible={props.openModal} style={styles.modal}>
      <View style={styles.modalContainer}>
        <SafeAreaView>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Search Follows</Text>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                fillFansArr([]);
                selectFans([]);
                setSearchTxt("");
                props.modal(false);
              }}
            >
              <Icon name="close" size={22} color={colors.mineShaft} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* tags container */}

        {selectedFans.length !== 0 && (
          <ScrollView style={styles.tagWrapper}>
            <View style={styles.tagContainer}>
              {selectedFans.map((item, id) => {
                return (
                  <View style={styles.fanTag} key={id}>
                    <View>
                      <ShowInitialsOfName
                        size={20}
                        radius={10}
                        fontSize={12}
                        name={item?.display_name}
                        colors={colors.inputBlue}
                        imgUrl={item?.avatar?.url}
                      />
                    </View>
                    <Text style={{ color: colors.white }}>
                      {item.display_name}
                    </Text>
                    <TouchableOpacity onPress={() => deleteFan(id, item)}>
                      <Icon name="close" style={styles.deleteIcon} size={16} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        )}

        <TextInput
          value={searchTxt}
          style={styles.input}
          placeholder="Search name"
          placeholderTextColor={colors.lightSilver}
          onChangeText={(e) => {
            setSearchTxt(e);
            getFans(e);
          }}
        />

        {/* follows container */}
        <ScrollView style={styles.fanWrapper}>
          {!fansArr
            ? null
            : fansArr.map((fan, id) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.fanComponent,
                      id === 0 && {
                        borderTopColor: colors.lightGray,
                        borderTopWidth: 0.5,
                      },
                    ]}
                    onPress={() => {
                      setSearchTxt("");
                      selectFans([...selectedFans, fan]);
                      fansArr.splice(id, 1);
                      // fillFansArr([...fansArr]);
                      fillFansArr([]);
                    }}
                    key={id}
                  >
                    <View>
                      {fan.avatar.upload ? (
                        <Image
                          source={{ uri: fan.avatar.url }}
                          style={styles.profileImage}
                        />
                      ) : (
                        <EmptyProfileComp name={fan.display_name} userId={id} />
                      )}
                    </View>

                    <Text style={styles.fanName}>{fan.display_name}</Text>
                  </TouchableOpacity>
                );
              })}
        </ScrollView>

        {/* Will uncomment it later */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => props.modal(false)}
          >
            <ButtonCommon
              style={styles.button}
              title="Submit"
              color={colors.inputBlue}
              method={followFans}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddFansModal;
