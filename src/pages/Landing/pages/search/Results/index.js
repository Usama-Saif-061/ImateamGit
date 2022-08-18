import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native";

import PeopleList from "./PeopleList/index";
import TeamsList from "./TeamsList/index";
import PostsList from "./PostsList/index";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styles from "./../../../pages/../../BottomTabScreens/Menu/Profile/styles";
import colors from "../../../../../common/colors";

import All from "./All";
import Loading from "../../../../../common/Components/MainFrame";

const SearchResults = (props) => {
  const Tab = createMaterialTopTabNavigator();
  console.log("PROPSSSS DATA", props);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarItemStyle: { ...styles.TabMenuItem },
          tabBarActiveTintColor: colors.inputBlue,
          tabBarInactiveTintColor: "gray",
          tabBarContentContainerStyle: {
            display: "flex",
            justifyContent: "center",
            paddingBottom: 5,
            marginTop: 5,
          },
          tabBarIndicatorStyle: { display: "none" },
        }}
      >
        <Tab.Screen
          name="all"
          children={() => (
            <All
              people={props.people}
              posts={props.posts}
              teams={props.teams}
              navigation={props.navigation}
              modal={props.modal}
              loading={props.loading}
              sectionListData={props.sectionListData}
              setSectionListData={props.setSectionListData}
            />
          )}
          options={{
            tabBarLabelStyle: {
              fontWeight: "bold",
              fontSize: 11,
            },
          }}
        />
        <Tab.Screen
          name="People"
          children={() => (
            <PeopleList
              people={props.people}
              navigation={props.navigation}
              modal={props.modal}
            />
          )}
          options={{
            tabBarLabelStyle: {
              fontWeight: "bold",
              fontSize: 11,
            },
          }}
        />
        <Tab.Screen
          name="Teams"
          children={() => (
            <TeamsList
              teams={props.teams}
              navigation={props.navigation}
              modal={props.modal}
            />
          )}
          options={{
            tabBarLabelStyle: {
              fontWeight: "bold",
              fontSize: 11,
            },
          }}
        />
        <Tab.Screen
          name="Posts"
          children={() => (
            <PostsList
              posts={props.posts}
              navigation={props.navigation}
              modal={props.modal}
            />
          )}
          options={{
            tabBarLabelStyle: {
              fontWeight: "bold",
              fontSize: 11,
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default SearchResults;
