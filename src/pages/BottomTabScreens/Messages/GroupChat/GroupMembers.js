import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Modal,
    SafeAreaView
} from 'react-native'
import ProfileHeader from '../../../../common/Components/ProfileHeader'
import { getHeightPixel, getWidthPixel } from '../../../../common/helper'
import { MessageList } from '../constants'
import MembersHeader from './components/MembersHeader'
import SingleMember from './components/SingleMember'
import ModalComponent from '../../../BottomTabScreens/Messages/Components/ModalComponent'
import { useGetUserQuery, useGetFansQuery } from '../../../../Reducers/usersApi'
import SearchWithTags from '../Components/SearchWithTags'
import ButtonRound from '../../Components/ButtonRound'
import colors from '../../../../common/colors'
import images from '../../../../common/images'

const GroupMembers = ({ navigation, route }) => {
    const [list, setList] = useState(MessageList)
    const [showPopUp, setShowPopUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [delKey, setDelKey] = useState(-1)
    const [showModal, setShowModal] = useState(false)
    const [fansList, setFansList] = useState([])
    const [fansObjList, setFansObjList] = useState([])
    const [simpleList, setSimpleList] = useState([])

    const { chatObj } = route.params

    const { data: userInfo, isSuccess } = useGetUserQuery();
    const {
        data: fansData,
        isFetching,
        error,
        refetch,
    } = useGetFansQuery(userInfo?.id);

    useEffect(() => {
        if (fansData?.length > 0) {
            let arr = []
            fansData.map((item) => arr.push({ id: item.display_info.id, name: item.display_info.display_name }))
            setFansList(arr)
        }
    }, [fansData])

    const itemPressed = (arr) => {
        setSimpleList(arr)
        // for fans listings
        let newList = []
        for (let i = 0; i < arr.length; i++) {
            let newItem = fansData?.find((item) => item.id == arr[i].id)
            newList.push(newItem)
        }
        setFansObjList(newList)
    }

    const addMembers = () => {
        let mList = [...list]
        simpleList.map(item => mList.push({
            key: Math.random(),
            dp: images.profileImage,
            name: item.name,
            lastMessage: "The main reason the messages are...",
            lastMessageDate: "1 days",
        }))
        setList(mList)
    }

    return (
        <View style={styles.mainContainer}>
            <ProfileHeader navigation={navigation} />
            <MembersHeader
                navigation={navigation}
                addMember={() => setShowModal(true)}
            />
            <FlatList
                style={styles.listContainer}
                data={chatObj.users}
                renderItem={({ item }) =>
                    <SingleMember
                        onEdit={() => navigation.navigate('ReadOnlyChat')}
                        obj={item}
                        onDelete={() => {
                            setDelKey(item.key)
                            setShowPopUp(true)
                        }}
                    />}
            />
            <ModalComponent
                modalHeader='Confirm delete'
                modalContent='You are about to permanently this member from the group. Please confirm by clicking delete.'
                showPopup={showPopUp}
                setShowPopup={(value) => setShowPopUp(value)}
                loading={loading}
                onConfirm={() => {
                    setShowPopUp(false)
                    let arr = list.filter((item) => item.key !== delKey)
                    setList(arr)
                }}
            />
            {/* {Modal content here} */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(!showModal);
                }}
            >
                <View style={styles.mainModalContainer}>
                    <SafeAreaView />
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>Add Members</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={styles.searchContainer}>
                            <Text style={styles.searchText}>Fans</Text>
                            <SearchWithTags
                                list={fansList}
                                onItemSelect={(arr) => itemPressed(arr)}
                            />
                        </View>
                        <View style={styles.modalButtons} >
                            <View style={{ flex: 1 }}>
                                <ButtonRound
                                    title="CANCEL"
                                    onPress={() => setShowModal(false)}
                                    style={styles.modalBtn}
                                    textStyle={styles.modalBtnTxt}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                <ButtonRound
                                    title="ADD MEMBERS"
                                    // loading={loading}
                                    onPress={() => {
                                        addMembers()
                                        setShowModal(false)
                                    }}
                                    style={[styles.modalBtn, { backgroundColor: colors.primary }]}
                                    textStyle={styles.modalBtnTxt}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
export default GroupMembers

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F4F4F8'
    },
    listContainer: {
        marginTop: getHeightPixel(10),
        backgroundColor: 'white',
    },
    searchContainer: {
        paddingHorizontal: getWidthPixel(15),
        paddingTop: getHeightPixel(10),
        flex: 1
    },
    searchText: {
        fontFamily: 'Segoe UI',
        fontSize: getHeightPixel(16),
        marginBottom: getHeightPixel(5)
    },
    mainModalContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    modalHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        height: getHeightPixel(70),
        borderTopColor: colors.grayLight,
        borderBottomColor: colors.grayLight,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
    },
    modalHeaderText: {
        fontFamily: 'Segoe UI',
        fontSize: getHeightPixel(16),
        color: colors.mineShaft,
        fontWeight: 'bold'
    },
    modalButtons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: getHeightPixel(15),
        marginBottom: getHeightPixel(30)
    },
    modalBtn: {
        width: "90%",
        backgroundColor: colors.accentGray,
    },
    modalBtnTxt: {
        fontFamily: "Segoe UI",
        fontWeight: "800",
    }
})