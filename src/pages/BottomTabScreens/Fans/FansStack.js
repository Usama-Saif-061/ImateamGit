import { SafeAreaView, View } from "react-native";
import React from "react";
import BottomNavigation from "../../../common/Components/BottomNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Fans from './index'
import GetPostList from "../Teams/GetPostList";
import MessagesMain from '../../BottomTabScreens/Messages/MessagesMain'
import StartConversation from '../../BottomTabScreens/Messages/StartConversation/StartConversation'
import GroupChat from '../../BottomTabScreens/Messages/GroupChat/GroupChat'
import GroupMembers from '../../BottomTabScreens/Messages/GroupChat/GroupMembers'
import SingleChat from '../../BottomTabScreens/Messages/SingleChat/SingleChat'
import ReadOnlyChat from '../../BottomTabScreens/Messages/ReadOnlyChat/ReadOnlyChat'

const Stack = createNativeStackNavigator();

const FansStack = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <SafeAreaView />
            <View
                style={{
                    flex: 1,
                }}
            >
                <Stack.Navigator
                    initialRouteName="Fans"
                >
                    <Stack.Screen
                        name="Fans"
                        component={Fans}
                        options={{
                            gestureEnabled: false,
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="GetPostList"
                        component={GetPostList}
                        options={{
                            gestureEnabled: false,
                            headerShown: false,
                        }}
                    />
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

export default FansStack;
