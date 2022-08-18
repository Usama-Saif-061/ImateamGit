import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import BottomNavigation from "../../../../common/Components/BottomNavigation";
import { useDispatch } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TeamsLanding from "../TeamsLanding";
import NewOrg from "../NewOrg";
import Conversation from "../Conversation";
import CreatePost from "../../../Landing/pages/CreatePost/CreatePost";
import TeamDetails from "../TeamDetails";
import Calendar from '../../Calendar/index'
import CalendarHome from "../../Calendar/CalendarHome";
import EventDetails from "../../Calendar/EventDetails";
import UpdateEventScreen from "../../Calendar/UpdateEventScreen";
import UpdateCalendar from "../../Calendar/UpdateCalendar";
import ShareCalendar from "../../Calendar/ShareCalendar/ShareCalendar";
import MessagesMain from "../../Messages/MessagesMain";
import StartConversation from "../../Messages/StartConversation/StartConversation";
import GroupChat from "../../Messages/GroupChat/GroupChat";
import GroupMembers from "../../Messages/GroupChat/GroupMembers";
import SingleChat from "../../Messages/SingleChat/SingleChat";
import ReadOnlyChat from "../../Messages/ReadOnlyChat/ReadOnlyChat";

const Stack = createNativeStackNavigator();
const MainTeamTab = ({ navigation }) => {

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Stack.Navigator initialRouteName="TeamsLanding">
        <Stack.Screen
          name="TeamsLanding"
          component={TeamsLanding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewOrg"
          component={NewOrg}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="Conversation"
          component={Conversation}
          options={{
            headerShown: false,
          }}
        /> */}

        <Stack.Screen
          name="TeamDetails"
          component={TeamDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{
            headerShown: false,
          }}
        />

        {/* Calendar Screens */}
        <Stack.Screen
          name="CalendarHome"
          component={CalendarHome}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UpdateEventScreen"
          component={UpdateEventScreen}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UpdateCalendar"
          component={UpdateCalendar}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ShareCalendar"
          component={ShareCalendar}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />

        {/* {Chat Screens} */}
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
      <View>
        <BottomNavigation navigation={navigation} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default MainTeamTab;
