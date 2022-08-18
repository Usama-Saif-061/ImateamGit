import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icons from "react-native-vector-icons/MaterialIcons";
import { accessibilityProps } from "react-native-paper/lib/typescript/components/MaterialCommunityIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import { font } from "../../helper";
import colors from "../../colors";
import { bottomSelection, tabSelection, tabColor } from "../../../Reducers/CommonReducers/mainLandingReducer";
import { setNavFromLanding } from "../../../Reducers/CommonReducers/calendarSlice";


const BottomNavigation = memo((props) => {
  const { isSelected: temp } = useSelector(state => state.bottomTab)
  const { tabColor } = useSelector(state => state.bottomTab)
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();


  useEffect(() => {
    if (temp) {
      props.navigation.navigate(temp);
      if (temp == 'Teams') {
        dispatch(setNavFromLanding(true))
      } else {
        dispatch(setNavFromLanding(false))
      }
    }
    else if (tabColor) {
      //  <TabButtons activeTab = {tabColor}/>
      console.log("I am actualy being called")
    }
  }, [temp])

  return (
    <View style={styles.container}>
      <TabButtons
        iconName="account-heart-outline"
        text="Fans"
        btnColor="black"
        textColor="white"
        activeTab={temp}
        dispatch={dispatch}

      />
      <TabButtons
        iconName="account-group-outline"
        text="Teams"
        btnColor="black"
        textColor="white"
        activeTab={temp}
        dispatch={dispatch}

      />
      <TabButtons
        iconName="calendar-blank-outline"
        text="Calendar"
        btnColor="black"
        textColor="white"
        activeTab={temp}
        dispatch={dispatch}

      />
      <TabButtons
        iconName="bubble"
        text="Messages"
        btnColor="black"
        textColor="white"
        activeTab={temp}
        dispatch={dispatch}

      />
      <TabButtons
        iconName="menu"
        text="Menu"
        btnColor="black"
        textColor="white"
        activeTab={temp}
        dispatch={dispatch}
      />
    </View>
  );
})
const TabButtons = (props) => (
  <TouchableOpacity
    style={[
      styles.itemsWrapper,
      { backgroundColor: props.activeTab === props.text ? colors.inputBlue : "white" },
    ]}
    onPress={() => {
      props.dispatch(tabSelection(props.text))
      // props.setActiveTab(props.text)

    }
    }
  >
    {props.text != "Messages" ? (
      <Icon
        name={props.text === "Messages" ? "bubble" : props.iconName}
        color={props.activeTab === props.text ? "white" : colors.mineShaft}
        size={23}
      />
    ) : (
      <Icon2
        name={props.iconName}
        color={props.activeTab === props.text ? "white" : colors.mineShaft}
        size={20}
      />
    )}

    <Text
      style={[
        styles.text,
        { color: props.activeTab === props.text ? "white" : colors.mineShaft },
      ]}
    >
      {props.text}
    </Text>

  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    shadowColor: colors.mineShaft,
    shadowOffset: { height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
  },
  itemsWrapper: {
    width: 80,
    height: 63.2,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...font(10, "bold"),
  },
});

export default BottomNavigation;

//   return (

//     <Tab.Navigator
//     initialRouteName = "none"
//     screenOptions={({route})=>({
//       tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = focused
//                 ? 'notifications'
//                 : 'notifications-none';
//             } else if (route.name === 'Settings') {
//               iconName = focused ? 'notifications' : 'notifications-none';
//             }

//             // You can return any component that you like here!
//             return <Icon name={iconName} size={size} color={color} />;
//           },
//       unmountOnBlur: false,
//       lazy: false,
//       tabBarActiveBackgroundColor : 'red',
//         tabBarStyle: { borderWidth: 3,
//         borderColor: "black"},

//  })}
// screenOptions={({ route }) => ({
//   tabBarIcon: ({ focused, color, size }) => {
//     let iconName;

//     if (route.name === 'Home') {
//       iconName = focused
//         ? 'notifications'
//         : 'notifications-none';
//     } else if (route.name === 'Settings') {
//       iconName = focused ? 'notifications' : 'notifications-none';
//     }

//     // You can return any component that you like here!
//     return <Icon name={iconName} size={size} color={color} />;
//   },
//   tabBarActiveTintColor: 'tomato',
//   tabBarInactiveTintColor: 'gray',
// })}
//>
{
  /* <Tab.Screen
      name="Home"
      component={CreatePost}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="notifications" color={color} size={26} />
        ),
      }}
    />
          <Tab.Screen name="Settings" component={CreatePost} /> */
}
//           	<Tab.Screen name="Home" component={CreatePost} />
//             <Tab.Screen name="level" component={CreatePost} />
//           	<Tab.Screen name="fans" component={CreatePost} />
//             <Tab.Screen name="Teams" component={CreatePost} />
// 			<Tab.Screen name="Settings" component={CreatePost} />
//     </Tab.Navigator>

//   );
// }
