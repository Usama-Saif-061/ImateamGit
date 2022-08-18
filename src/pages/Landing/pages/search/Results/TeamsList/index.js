import React, { useEffect, useState } from "react";

import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { styles } from "./styles";
import { ShowInitialsOfName } from "../../../../../../common/Components/ShowInitialsOfName";
import { getData } from "../../../../../../common/helper";
import PostCountIcon from "../../../../../../common/Components/PostCountIcon";
const TeamsList = (props) => {
  const teams = props.teams;

  //  console.log("teams complete tab:", teams);
  const header = () => {
    return teams && teams.length == 0 ? null : (
      <View style={styles.header}>
        <Text style={styles.headerText}>Teams</Text>
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
          props.modal(false);
          //   console.log(" id is  :");

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
    <View>
      <FlatList
        data={teams}
        ListHeaderComponent={header}
        renderItem={renderTeams}
        style={{ backgroundColor: "white" }}
      />
    </View>
  );
};

export default TeamsList;
