import React from "react";

import { Text, View } from "react-native";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/Feather";
import colors from "../../colors";

const PostCountIcon = ({ postsCount }) => {
  return (
    <View>
      <View style={styles.icon}>
        <Icon name="users" size={25} color={colors.accentGray} />
      </View>
      <Text style={styles.noOfPosts}>{postsCount}</Text>
    </View>
  );
};

export default PostCountIcon;
