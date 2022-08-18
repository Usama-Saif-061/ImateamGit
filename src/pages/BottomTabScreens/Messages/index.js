import { SafeAreaView, View, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import BottomNavigation from "../../../common/Components/BottomNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessagesMain from "./MessagesMain";
import StartConversation from "./StartConversation/StartConversation";
import colors from "../../../common/colors";
import GroupChat from "./GroupChat/GroupChat";
import GroupMembers from "./GroupChat/GroupMembers";
import SingleChat from "./SingleChat/SingleChat";
import ReadOnlyChat from "./ReadOnlyChat/ReadOnlyChat";

const Stack = createNativeStackNavigator();

const Messages = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
      <SafeAreaView />
      <View
        style={{
          flex: 1,
        }}
      >
        <Stack.Navigator
          initialRouteName="MessagesMain"
        >
          <Stack.Screen
            name="MessagesMain"
            component={MessagesMain}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StartConversation"
            component={StartConversation}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GroupChat"
            component={GroupChat}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GroupMembers"
            component={GroupMembers}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SingleChat"
            component={SingleChat}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ReadOnlyChat"
            component={ReadOnlyChat}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
      <BottomNavigation navigation={navigation} />
    </View>
  );
};

export default Messages;