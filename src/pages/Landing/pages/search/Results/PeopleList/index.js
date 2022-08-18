import React, { useEffect, useState } from "react";

import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../../../common/colors";
import { getData } from "../../../../../../common/helper";
import { styles } from "./styles";
import { ShowInitialsOfName } from "./../../../../../../common/Components/ShowInitialsOfName";
const PeopleList = ({ people, navigation, modal }) => {
  //  console.log("peoples complete tab:", people);

  const header = () => {
    return people && people.length == 0 ? null : (
      <View style={styles.header}>
        <Text style={styles.headerText}>Peoples</Text>
      </View>
    );
  };

  const renderPeople = (singleitem) => {
    //  console.log("item is :", singleitem);
    const data = getData(singleitem?.item?.text);
    const name = data[0];
    const img = singleitem?.item?.autocomplete[6];
    const id = singleitem?.item?.autocomplete[2];
    const postsCount = singleitem?.item?.autocomplete[1];

    // console.log(" autocomplete is  :", name);

    return (
      <TouchableOpacity
        onPress={() => {
          modal(false);
          //console.log(" id is  :");

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

  return (
    //peoples list
    <View>
      <FlatList
        data={people}
        ListHeaderComponent={header}
        renderItem={renderPeople}
        style={{ backgroundColor: "white" }}
      />
    </View>

    //teams list
  );
};

export default PeopleList;
