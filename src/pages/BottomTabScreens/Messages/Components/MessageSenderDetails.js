import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import colors from '../../../../common/colors';
import { font, getHeightPixel, getWidthPixel, showInitials } from '../../../../common/helper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import images from '../../../../common/images';
import moment from 'moment';
import GroupDpRow from './GroupDpRow';
import { useGetUserQuery } from '../../../../Reducers/usersApi';

const MessageSenderDetails = (props) => {
  const { data: userInfo, isFetching: fetch } = useGetUserQuery();

  const itemPressed = () => {
    if (props.obj?.name !== '') {
      props.navigation.navigate('GroupChat', { chatObj: props.obj })
    } else {
      props.navigation.navigate('SingleChat', { chatObj: props.obj })
    }
  }
  // const [recObj, setRecObj] = useState(null)
  // useEffect(() => {
  //   if (props.obj.name == '' && userInfo) {
  let obj = props.obj.name == '' && userInfo ? props.obj.users.find(item => item.id !== userInfo.id) : null
  //     setRecObj(obj)
  //   }
  // }, [userInfo])
  // 📷 📄 🖼️
  return (
    <Swipeable renderRightActions={props.rightActionSwipe} >
      <TouchableOpacity onPress={itemPressed}>
        <View style={styles.container}>
          <View style={styles.chatInfo}>
            <View>
              {
                props.obj?.name !== '' ?
                  <GroupDpRow list={props.obj.users} />
                  :
                  <View style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.primary
                  }}>
                    <Text style={{
                      fontSize: getHeightPixel(16),
                      fontFamily: 'Segoe UI',
                      color: 'white'
                    }}>{showInitials(obj?.display_name)}</Text>
                  </View>
                // <Image source={images.profileImage} style={styles.dp} />
              }
            </View>
            <View style={{ marginLeft: getWidthPixel(10), width: '60%' }}>
              <Text numberOfLines={1} style={styles.senderName}>{props.obj?.name !== '' ? props.obj?.name : obj ? obj.display_name : 'Anonymous'}</Text>
              <Text numberOfLines={1} style={styles.lastMessage}>{props.obj.last_message?.payload?.message !== '' ? props.obj.last_message?.payload?.message : 'File 📄'}</Text>
            </View>
          </View>
          <View style={{
            marginHorizontal: getWidthPixel(10),
          }}>
            <Text style={styles.lastMessageDate}>{moment(props.obj.last_message?.room?.updated_at).fromNow()}</Text>
            {
              props.obj.unread_messages > 0 &&
              <View style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                backgroundColor: colors.secondary,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
                marginTop: getHeightPixel(10)
              }}>
                <Text style={{
                  ...font(12, "normal"),
                  color: 'white',
                }}>{props.obj.unread_messages < 100 ? props.obj.unread_messages : '99'}</Text>
              </View>
            }
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: getHeightPixel(80),
    justifyContent: 'space-between',
    paddingVertical: getHeightPixel(10),
    paddingHorizontal: getWidthPixel(10),
    borderTopColor: colors.accentGray,
    borderTopWidth: 0.25,
    borderBottomColor: colors.accentGray,
    borderBottomWidth: 0.25,
    backgroundColor: colors.ghostWhite
  },
  chatInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  dp: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  lastMessage: {
    paddingTop: getHeightPixel(3),
    ...font(14, "normal"),
    color: colors.gray,
  },
  senderName: {
    ...font(16, "bold"),
  },
  lastMessageDate: {
    ...font(12, "normal"),
    color: colors.gray,
  },
})



export default MessageSenderDetails;