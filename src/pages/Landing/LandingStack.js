import { SafeAreaView, View, Alert } from "react-native";
import React, { useEffect } from "react";
import BottomNavigation from "../../common/Components/BottomNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessagesMain from "../BottomTabScreens/Messages/MessagesMain";
import StartConversation from "../BottomTabScreens/Messages/StartConversation/StartConversation";
import colors from "../../common/colors";
import GroupChat from "../BottomTabScreens/Messages/GroupChat/GroupChat";
import GroupMembers from "../BottomTabScreens/Messages/GroupChat/GroupMembers";
import SingleChat from "../BottomTabScreens/Messages/SingleChat/SingleChat";
import ReadOnlyChat from "../BottomTabScreens/Messages/ReadOnlyChat/ReadOnlyChat";
import Menu from "../BottomTabScreens/Menu";
import Teams from '../BottomTabScreens/Teams/Main/index'
import MainTeamTab from "../BottomTabScreens/Teams/Main";
import Calendar from "../BottomTabScreens/Calendar";
import Messages from "../BottomTabScreens/Messages";
import CreatePost from "./pages/CreatePost/CreatePost";
import SharedPost from "./pages/CreatePost/SharedTo";
import GetPostList from "../BottomTabScreens/Teams/GetPostList";
import Search from "./pages/search";
import FansStack from "../BottomTabScreens/Fans/FansStack";
import MainLanding from "./pages/MainLanding";
import { useDispatch } from "react-redux";
import { setExistingChats, setChatUpdate } from "../../Reducers/CommonReducers/chatSlice";
import { getAllConversations } from "../BottomTabScreens/Messages/API/messagesApi";
import { getFirebaseToken, getToken } from "../../common/helper";
import DeviceInfo from "react-native-device-info";
import ReconnectingWebSocket from 'reconnecting-websocket';
import { useGetUserQuery } from "../../Reducers/usersApi";
import { refreshUser } from "./Api/updateProfileLanding";
var SOCKET_BASE_URL = "wss://dev.imateam.us:8443"

const Stack = createNativeStackNavigator();

const LandingStack = ({ navigation }) => {
    let _ws = null;

    const dispatch = useDispatch()
    useEffect(() => {
        getAllChats()
        addSocketListener()
        return () => {
            cleanUp()
        }
    }, [])
    const addSocketListener = async () => {
        const token = await getToken()
        const tokenValue = token.split(" ")
        const socketUrl = SOCKET_BASE_URL + `/ws/notifications/?token=${tokenValue[1]}`
        console.log(socketUrl)
        _ws = new ReconnectingWebSocket(socketUrl);
        _ws.addEventListener('open', (message) => {
            _ws.removeEventListener('open');
        });
        _ws.addEventListener('message', (message) => {
            getAllChats()
            dispatch(setChatUpdate(Date().toString()))
        });
        _ws.addEventListener('error', (error) => {
            console.log('got error', error);
            cleanUp();
        });
    }
    const cleanUp = () => {
        _ws.removeEventListener('message');
        _ws.close();
        _ws = null;
    }
    const getAllChats = async () => {
        try {
            const res = await getAllConversations()
            if (res.resultCode == 200) {
                // console.log('getAllConversations -> ', JSON.stringify(res))
                console.log('conversation get success on landing screen.')
                dispatch(setExistingChats(res.data))
                // let arr = res.data.filter(item => item.hidden !== true)
            } else {
                Alert.alert('Error', res.message?.message ? res.message?.message : 'Error while getting Conversations')
            }
        } catch (e) {
            console.log('Error getConversations MessagesMain -> ', e)
        }
    }
    const { data: userInfo, isFetching: fetch } = useGetUserQuery();
    useEffect(() => {
        if (userInfo) {
            validateUser()
        }
    }, [userInfo])
    // Update api with fcm token
    const validateUser = async () => {
        console.log('validating user')
        let Obj = {}
        Obj['userInfo'] = {
            firstName: userInfo.first_name,
            lastName: userInfo.last_name,
            email: userInfo.email
        }
        Obj['payload'] = {
            title: userInfo.payload.title,
            personalProfile: userInfo.payload.personalProfile,
            phone: userInfo.payload.phone,
            nickName: userInfo.payload.nickName
        }
        const deviceType = DeviceInfo.getDeviceType()
        const firebaseToken = await getFirebaseToken()
        Obj['fcmToken'] = firebaseToken;
        Obj['deviceType'] = deviceType
        try {
            const res = await refreshUser(Obj)
            if (res.resultCode == 200) {
                // console.log('Refresh User (LandingStack) -> ', JSON.stringify(res))
                console.log('refresh user success on landing screen.')
            } else {
                console.log('validate User Error - LandingStack')
            }
        } catch (e) {
            console.log('Error refreshing user -> ', e)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <SafeAreaView />
            <View
                style={{
                    flex: 1,
                }}
            >
                <Stack.Navigator
                    initialRouteName="MainLanding"
                >
                    <Stack.Screen
                        name="MainLanding"
                        component={MainLanding}
                        options={{
                            headerShown: false,
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="CreatePost"
                        component={CreatePost}
                        options={{
                            headerShown: false,
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="SharedTo"
                        component={SharedPost}
                        options={{
                            headerShown: false,
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Fans"
                        component={FansStack}
                        options={{
                            gestureEnabled: false,
                            headerShown: false,
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Teams"
                        component={Teams}
                        options={{
                            gestureEnabled: false,
                            headerShown: false,
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="MainTeam"
                        component={MainTeamTab}
                        options={{
                            headerShown: false,
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Calendar"
                        component={Calendar}
                        options={{
                            gestureEnabled: false,
                            headerShown: false,
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Messages"
                        component={Messages}
                        options={{
                            gestureEnabled: false,
                            headerShown: false,
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Menu"
                        component={Menu}
                        options={{
                            gestureEnabled: false,
                            headerShown: false,
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="GetPostList"
                        component={GetPostList}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Search"
                        component={Search}
                        options={{
                            headerShown: false,
                        }}
                    />

                    {/* {Messages Screens here} */}
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

export default LandingStack;