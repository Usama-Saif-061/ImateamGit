import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native'
import colors from '../../../../common/colors'
import { font, getWidthPixel, getHeightPixel } from '../../../../common/helper'
import icons from '../../../../common/icons'
import Icon from "react-native-vector-icons/AntDesign";
import { getAllUsersApi } from '../API/messagesApi'
import { useGetUserQuery } from '../../../../Reducers/usersApi'
import { getUserConnectionsApi } from '../../Calendar/API/calendarsApi'

const SearchWithTags = (props) => {
  const [showList, setShowList] = useState(false)
  // const [list, setList] = useState(props.list)
  const { data: userInfo, isFetching: fetch } = useGetUserQuery();
  const [list, setList] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [searchText, setSearchText] = useState('')
  const [initialList, setInitialList] = useState([])

  useLayoutEffect(() => {
    props.teamList ? setSelectedItems(props.teamList) : null
  }, [props.teamList])

  // useEffect(() => {
  //     if (searchText.length > 0) {
  //         let arr = list.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
  //         setList(arr)
  //     } else {
  //         setList(props.list)
  //     }
  // }, [searchText, props.list])

  const setInitalListFunc = async () => {
    try {
      const res = await getUserConnectionsApi(userInfo?.id);
      if (res.resultCode == 200) {
        let list = []
        res.data.map(item => {
          list.push({
            id: item.display_info.id,
            display_name: item.display_info.display_name
          })
        })
        setInitialList(list)
      }
    } catch (e) {
      console.log('Error getting user connections', e)
    }
  }

  useEffect(() => {
    setInitalListFunc()
  }, [])

  useEffect(() => {
    if (searchText !== '') {
      getAllUsers()
    } else {
      setList([])
    }
  }, [searchText])

  const getAllUsers = async () => {
    let obj = {}
    obj["searchInput"] = searchText;
    obj["extra"] = {
      messagePrivacy: true
    }
    console.log('getAllUsers body->', obj)
    try {
      const res = await getAllUsersApi(obj)
      if (res.resultCode == 200) {
        // console.log('getAllUsers -> ', JSON.stringify(res))
        console.log('Initial list here => ', initialList)
        setList([...res.data, ...initialList])
      } else {
        console.log('Error getting users -> ', res)
      }
    } catch (e) {
      console.log('Error getAllUsers (Fans) -> ', e)
    }
  }

  const itemPressed = (item) => {
    if (selectedItems.includes(item)) {
      let arr = selectedItems.filter((el) => {
        return el.id !== item.id
      })
      setSelectedItems(arr)
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  useEffect(() => {
    props.onItemSelect(selectedItems);
  }, [selectedItems]);
  console.log("showList===>", showList);
  return (
    <KeyboardAvoidingView keyboardShouldPersistTaps="handled">
      <View>
        <View
          style={{
            ...styles.mainContainer,
            borderBottomRightRadius: showList ? 0 : 10,
            borderBottomLeftRadius: showList ? 0 : 10,
          }}
        >
          {showList ? (
            <TextInput
              placeholder="Search for users, fans"
              placeholderTextColor="#4d5966"
              value={searchText}
              autoFocus={true}
              style={styles.inputStyle}
              onChangeText={(e) => setSearchText(e)}
              onSubmitEditing={() => setShowList(false)}
            />
          ) : (
            <TouchableOpacity
              style={{ flex: 8, alignItems: "center" }}
              onPress={() => setShowList(true)}
            >
              <Text style={styles.fontStyle}>Search for users, fans</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              setShowList(!showList)
              setSearchText('')
            }}
          >
            {showList ? (
              <Icon name="caretup" />
            ) : (
              <Image source={icons.iconsMini.SearchDark} resizeMode="contain" />
            )}
          </TouchableOpacity>
        </View>
        {showList &&
          (list.length !== 0 ? (
            <View style={[styles.listContainer, { borderTopWidth: 0 }]}>
              <FlatList
                data={list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setShowList(false);
                      setSearchText('')
                      itemPressed(item);
                    }}
                  >
                    <Text
                      style={{
                        ...styles.fontStyle,
                        color: selectedItems.includes(item)
                          ? "#106ebf"
                          : "#4d5966",
                      }}
                    >
                      {item.display_name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            <View
              style={{
                borderColor: colors.accentGray,
                borderWidth: 0.5,
                borderRadius: 10,
                paddingVertical: getHeightPixel(10),
                alignItems: "center",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderTopWidth: 0,
              }}
            >
              <Text style={{ ...styles.fontStyle, marginVertical: 0 }}>
                There's nothing to show!
              </Text>
            </View>
          ))}
        {selectedItems.length > 0 && (
          <View style={styles.tagsContainer}>
            {selectedItems.map((item, index) => {
              return (
                <View key={index} style={styles.tagsList}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* <Image source={item.picture} /> */}
                    <View style={styles.tagImg}>
                      <Text style={{ ...styles.tagItem, marginHorizontal: 0 }}>
                        {item.display_name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.tagItem}>{item.display_name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => itemPressed(item)}
                    style={{ marginHorizontal: getWidthPixel(5) }}
                  >
                    <Icon name="close" color="white" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchWithTags

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    borderColor: colors.accentGray,
    borderWidth: 0.5,
    // backgroundColor: colors.searchBlue,
    height: getHeightPixel(45),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 8,
    width: '100%',
    height: '100%',
    ...font(14),
    color: '#4d5966',
    textAlign: "center",
  },
  fontStyle: {
    ...font(14),
    color: '#4d5966',
    textAlign: "center",
    marginVertical: getHeightPixel(10)
  },
  listContainer: {
    // backgroundColor: colors.searchBlue,
    borderColor: colors.accentGray,
    borderWidth: 0.5,
    // borderTopColor: '#b8dbf9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxHeight: getHeightPixel(250)
  },
  tagsContainer: {
    marginTop: getHeightPixel(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagsList: {
    marginRight: getWidthPixel(10),
    backgroundColor: colors.accentGray,
    padding: getWidthPixel(5),
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: getHeightPixel(4)
  },
  tagImg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary2
  },
  tagItem: {
    color: 'white',
    marginHorizontal: getWidthPixel(10),
    fontFamily: 'Segoe UI',
    fontSize: getHeightPixel(12),
    fontWeight: 'bold'
  }
})
