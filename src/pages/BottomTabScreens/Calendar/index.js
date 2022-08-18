import { SafeAreaView, View } from "react-native";
import React from "react";
import BottomNavigation from "../../../common/Components/BottomNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarHome from "./CalendarHome";
import EventDetails from "./EventDetails";
import UpdateEventScreen from "./UpdateEventScreen";
import UpdateCalendar from "./UpdateCalendar";
import { useSelector } from "react-redux";
import ShareCalendar from "./ShareCalendar/ShareCalendar";

const Stack = createNativeStackNavigator();

const Calendar = ({ navigation }) => {
  const sidebarState = useSelector((state) => state.sidebar.value)
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView />
      <View
        style={{
          flex: 1,
        }}
      >
        <Stack.Navigator
          initialRouteName="CalendarHome"
        >
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
        </Stack.Navigator>
      </View>
      {
        !sidebarState ?
          <BottomNavigation navigation={navigation} /> : null
      }
    </View>
  );
};

export default Calendar;
