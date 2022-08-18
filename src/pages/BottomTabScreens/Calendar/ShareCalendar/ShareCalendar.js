import React from "react";
import {
    View,
    StyleSheet,
    Alert
} from "react-native";
import colors from '../../../../common/colors'
import {
    getHeightPixel,
    getWidthPixel,
    font,
} from "../../../../common/helper";
import TopHeader from '../../../../pages/BottomTabScreens/Components/TopHeader'
import AddMessage from "./AddMessage";
import BottomNavigation from "../../../../common/Components/BottomNavigation";
import useState from "react-usestateref";
import { shareCalendarApi } from "../API/calendarsApi";
import SearchWithTags from "../../Messages/Components/SearchWithTags";
import ButtonRound from "../../Components/ButtonRound";

const ShareCalendar = ({ navigation, route }) => {
    const { calObj } = route.params;
    const [loading, setLoading] = useState(false)
    const [idArray, setIdArray] = useState([])

    const submitBtnClicked = async () => {
        // console.log('tagValue => ', tagValue.length);
        // if (refList.current.length == 0) {
        //     alert('No fans available now.')
        //     return
        // }
        if (idArray.length == 0) {
            alert('Please select at least one fan.')
            return
        }
        let body = {
            calendarId: calObj.id,
            subscriberIds: idArray
        }
        setLoading(true)
        const response = await shareCalendarApi(body);
        setLoading(false)
        console.log('response => ', JSON.stringify(response));
        if (response.resultCode == 200) {
            Alert.alert('Success', 'Your calendar has been shared.', [
                {
                    text: 'OK',
                    onPress: () => {
                        navigation.navigate('CalendarHome')
                    }
                }
            ])
        } else {
            console.log('Error: ', JSON.stringify(response))
            Alert.alert('Error', response.message?.message ?
                response.message?.message : 'Some Error!')
        }
    }

    const itemPressed = (arr) => {
        // console.log('array from tagsComponent', arr)
        let newArrIds = []
        arr.map(item => newArrIds.push(item.id))
        setIdArray(newArrIds)
    }

    return (
        <View style={styles.modalContainer}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 0.3, backgroundColor: colors.lightSilver, width: '100%' }} />
                    <TopHeader
                        title="Share Calendar"
                        onPress={() => navigation.goBack()}
                        isCross
                        onUpdate={submitBtnClicked}
                        isSubmit
                        loading={loading}
                    />
                    <View style={{ height: 0.3, backgroundColor: colors.lightSilver, width: '100%' }} />

                    <View style={{
                        paddingHorizontal: getWidthPixel(15),
                        // paddingTop: getHeightPixel(15),
                        paddingTop: getHeightPixel(50),
                    }}>
                        {/* }}> */}
                        <SearchWithTags
                            onItemSelect={(arr) => itemPressed(arr)}
                        />
                    </View>
                </View>
                <ButtonRound
                    title="Share Calendar"
                    onPress={submitBtnClicked}
                    style={{
                        width: '60%',
                        alignSelf: 'center',
                        marginBottom: 20
                    }}
                />
                {/* <AddMessage /> */}
            </View>
            <BottomNavigation navigation={navigation} />
        </View>
    );
};

export default ShareCalendar;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    style2: {
        height: getHeightPixel(300),
    },
    tagWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    tag: {
        backgroundColor: colors.accentGray,
        flexDirection: "row",
        paddingHorizontal: 4,
        borderRadius: 20,
        alignItems: "center",
        marginLeft: getWidthPixel(4),
        marginVertical: getHeightPixel(4),
    },
    tagText: {
        ...font(14, "bold"),
        paddingHorizontal: 6,
        paddingVertical: 2,
        color: "#fff",
    },
});