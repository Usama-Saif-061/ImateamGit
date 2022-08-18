import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ShowInitialsOfName } from "../ShowInitialsOfName";
import colors from "../../colors";
import { Item } from "react-native-paper/lib/typescript/components/List/List";

//RECIEVES SINGLE LIST OF PEOPLE TO WHOME RESPECTIVE POST IS SHARED
const SharedPeoples = ({ profiles, isEdit }) => {
  return (
    <>
      <View style={styles.sharedProfilesWrapper}>
        {profiles?.map((profile, key) => (
          <View key={profile.id}>
            <ShowInitialsOfName
              name={
                !isEdit
                  ? profile.display_info.display_name
                  : profile.display_name
              }
              colors={colors.primary}
              size={22}
              radius={11}
              userId={profile.id}
              imgUrl={profile?.display_info?.avatar?.url}
            />
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sharedProfilesWrapper: {
    flexDirection: "row",
    marginHorizontal: 23,
  },

  sharedProfile: {
    width: 26,
    height: 26,
    borderRadius: 20,
    marginLeft: 2,
    borderWidth: 0.5,
    borderColor: "#fff",
  },
});
export default SharedPeoples;
