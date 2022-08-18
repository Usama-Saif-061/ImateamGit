import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  ActivityIndicator,
  View,
  SectionList,
  TouchableOpacity,
  Text,
} from "react-native";
import { styles } from "./styles";
import colors from "../../../../../../common/colors";
import { ShowInitialsOfName } from "../../../../../../common/Components/ShowInitialsOfName";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PostHeader from "../../../../../../common/Components/PostHeader";
import PostCountIcon from "../../../../../../common/Components/PostCountIcon";
import {
  getWidthPercentage,
  getHeightPercentage,
  getData,
} from "../../../../../../common/helper";
const All = (props) => {
  const { modal, navigation, setSectionListData } = props;

  console.log(" alldata ", props.sectionListData);

  const renderItem = (result) => {
    const { item, index } = result;

    console.log("itemoffff :", item);

    const type = item?.autocomplete[4];

    if (type === "People") {
      return renderPeople(result);
    } else if (type === "Posts") {
      return renderPosts(result);
    } else if (type === "Teams") {
      return renderTeams(result);
    } else {
      return null;
    }
  };

  const renderPeople = (singleitem) => {
    console.log("itemis :", singleitem);
    const data = getData(singleitem?.item?.text);
    const name = data[0];
    const img = singleitem?.item?.autocomplete[6];
    const id = singleitem?.item?.autocomplete[2];
    const postsCount = singleitem?.item?.autocomplete[1];

    console.log(" autocomplete is  :", name);

    return (
      <TouchableOpacity
        onPress={() => {
          setSectionListData([]);
          props.modal(false);
          console.log(" id is  :");

          navigation.navigate("GetPostList", {
            id: id,
            type: "Member",
          });
        }}
        style={styles.peopleWrapper}
      >
        <ShowInitialsOfName
          name={data[0]}
          size={46}
          radius={23}
          userId={id}
          imgUrl={img}
        />
        <View>
          <Text style={styles.name}>{data[0]}</Text>
          <Text style={styles.location}>{data[2]}</Text>
        </View>

        <View style={styles.icon}>
          <Icon name="circle-double" size={25} color={colors.accentGray} />
        </View>
        <Text style={styles.noOfPosts}>{postsCount}</Text>
      </TouchableOpacity>
    );
  };

  const renderPosts = (item) => {
    const data = getData(item?.item.text);
    const name = data[0];
    const id = item?.item?.autocomplete[5];
    const membersCount = item?.item.autocomplete[2];
    const img = item?.item?.autocomplete[6];
    const desc = data[2];
    const date = data[3];

    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <PostHeader
            name={name}
            img={img}
            date={date}
            type={"postheader"}
            userId={id}
            navigation={props.navigation}
            modal={props.modal}
          />
        </View>

        <Text style={styles.postText}>{desc}</Text>
        {/* <FastImage
          source={{
            uri: img,
            priority: FastImage.priority.high,
          }}
          style={styles.postImage}
        /> */}
      </View>
    );
  };
  const renderTeams = (item) => {
    const data = getData(item?.item?.text);
    const name = data[1];
    const id = item?.index;
    const membersCount = item?.item.autocomplete[2];
    const img = item.item?.autocomplete[6];
    const userId = item.item?.autocomplete[2];
    const postCount = item.item?.autocomplete[1];

    // console.log("here is single item of teams", item, data);

    return (
      <TouchableOpacity
        onPress={() => {
          setSectionListData([]);
          props.modal(false);
          console.log(" id is  :");

          props.navigation.navigate("GetPostList", {
            id: userId,
            type: "Member",
          });
        }}
        style={styles.postsSection}
      >
        <View style={styles.peopleWrapper}>
          <ShowInitialsOfName
            name={data[1]}
            size={46}
            radius={23}
            userId={id}
            imgUrl={img}
          />

          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.members}>{data[2]} </Text>
          </View>
          <View style={{ flex: 1 }}>
            <PostCountIcon postsCount={postCount} />
          </View>
        </View>
        {/* <View>
          <Text style={styles.teamDesciption}>{desc}</Text>
        </View> */}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      {!props.loading ? (
        <View>
          <SectionList
            sections={props.sectionListData}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{}}>{title}</Text>
            )}
          />
        </View>
      ) : (
        <View
          style={{
            width: getWidthPercentage(100),
            height: getHeightPercentage(60),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
          }}
        >
          <ActivityIndicator
            size="large"
            color={colors.primary}
            animating={props.loading}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default All;
