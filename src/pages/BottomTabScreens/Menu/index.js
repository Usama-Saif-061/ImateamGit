import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BottomNavigation from "../../../common/Components/BottomNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenu from "./MainMenu";
import Profile from "./Profile";
const Stack = createNativeStackNavigator();
const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserProfile"
          component={Profile}
          options={{
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
  content: {
    flex: 1,
  },
});
export default Menu;
