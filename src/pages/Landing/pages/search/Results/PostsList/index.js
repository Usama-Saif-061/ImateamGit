import React, { useEffect, useState } from "react";

import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";
import PostHeader from "../../../../../../common/Components/PostHeader";
import { getData } from "../../../../../../common/helper";
const PostsList = ({ posts, navigation, modal }) => {
  // console.log("posts complete tab:", posts);

  const header = () => {
    return posts && posts.length == 0 ? null : (
      <View style={styles.header}>
        <Text style={styles.headerText}>Posts</Text>
      </View>
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
            navigation={navigation}
            modal={modal}
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

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={renderPosts}
        ListHeaderComponent={header}
        style={{ backgroundColor: "white" }}
      />
    </View>
  );
};

export default PostsList;
