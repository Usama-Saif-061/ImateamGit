import React, { useEffect, useRef, useState } from "react";

import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { SearchInterestModalStyles } from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../common/colors";
import searchAPI from "../../Api/searchAPI";
import FastImage from "react-native-fast-image";
import { getData, getHeightPercentage, getHeightPixel } from "../../../../common/helper";
import SearchResults from "./Results";

const Search = ({ route, props }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [people, setPeople] = useState([]);
  const [posts, setPosts] = useState([]);
  const [teams, setTeams] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sectionListData, setSectionListData] = useState([]);
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
    console.log(people, posts, teams);
    console.log("here is route data", route);
  }, [people, posts, teams]);

  const renderItem = ({ item, index }) => (
    <View style={SearchInterestModalStyles.header}>
      {renderResultType(item)}
    </View>
  );
  const getSugestions = async (value) => {
    setLoading(true);
    const searchResults = await searchAPI(value);
    setSearchResults(searchResults);

    console.log("results are :", searchResults);

    const onlyteams = [];
    const onlypeople = [];
    const onlyposts = [];

    const temp = await searchResults.map((item) => {
      if (item?.autocomplete && item?.text) {
        const data = getData(item?.autocomplete);

        if (data[4] === "People" || data[4] === "Peoples") {
          onlypeople.push({
            text: item.text,
            autocomplete: data,
          });
        } else if (data[4] === "Post" || data[4] === "Posts") {
          onlyposts.push({
            text: item.text,
            autocomplete: data,
          });
        } else if (data[4] === "Team" || data[4] === "Teams") {
          onlyteams.push({
            text: item.text,
            autocomplete: data,
          });
        } else {
          return;
        }
      }
    });

    const listArray = [];

    setPeople(onlypeople);
    setPosts(onlyposts);
    setTeams(onlyteams);

    if (onlypeople.length) {
      listArray.push({ title: "Peoples", data: onlypeople });
    }
    if (onlyposts.length) {
      listArray.push({ title: "Posts", data: onlyposts });
    }
    if (onlyteams.length) {
      listArray.push({ title: "Teams", data: onlyteams });
    }

    console.log("section list data is ", listArray);

    setSectionListData(listArray);

    setLoading(false);

    console.log("only people", onlypeople);
    console.log("only posts", onlyposts);
    console.log("only teams", onlyteams);
  };

  const renderResultType = (item) => {
    const data = getData(item.autocomplete);
    const resultType = data[4];
    return <View>{renderResult(item)}</View>;
  };
  const renderResult = (item) => {
    const autocompleteData = getData(item.autocomplete);
    const userInfo = getData(item?.text);
    const resultType = autocompleteData[4];

    const name = userInfo[0].replace(/[^a-zA-Z ]/g, "");
    // console.log("iam user data", userData);
    return (
      <TouchableOpacity
        onPress={() => {
          //props.modal(false);
          //props.navigation.navigate("SearchResults");
          setSearchResults([]);

          setClicked(true);

          console.log(" user profile pressed, id is: ", route);
        }}
        style={SearchInterestModalStyles.searchPeople}
      >
        <Icon name={"magnify"} color={colors.mineShaft} size={22} />
        <Text style={SearchInterestModalStyles.peopleName}>{name}</Text>
        <Text style={SearchInterestModalStyles.resultType}>
          {" "}
          . {resultType}
        </Text>
        <View style={{ right: 10, position: "absolute" }}>
          <FastImage
            style={SearchInterestModalStyles.peopleImage}
            source={{
              uri: autocompleteData[6],
              priority: FastImage.priority.high,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => { }, []);
  return (
    <View style={SearchInterestModalStyles.ModalContainer}>
      <SafeAreaView
        style={SearchInterestModalStyles.headerWrapper}
        onPress={Keyboard.dismiss}
      >
        <View style={SearchInterestModalStyles.header}>
          <TouchableOpacity
            style={SearchInterestModalStyles.closeButton}
            onPress={() => {
              if (route?.params?.currentPage === "Profile") {
                route.params.navigation.navigate("UserProfile");
              } else {
                route.params.navigation.goBack();
              }

              setSearchResults([]);
              setPeople([]);
              setPosts([]);
              setTeams([]);
              setSectionListData([]);

              console.log("here are params", route);
            }}
          >
            <Icon name="close" size={23} color={colors.accentGray} />
          </TouchableOpacity>

          <View style={SearchInterestModalStyles.search}>
            <TextInput
              onChangeText={(value) => {
                if (value.length > 1) {
                  getSugestions(value);
                }
              }}
              ref={inputRef}
              placeholderTextColor="#262628"
              mode="outlined"
              label={"Search..."}
              activeOutlineColor={colors.accentGray}
              style={{ ...SearchInterestModalStyles.Input, fontSize: 14, fontWeight: '400' }}
              color={colors.mineShaft}
              right={
                Icon ? (
                  <TextInput.Icon style={{
                    marginTop: getHeightPixel(15)
                  }} name={"magnify"} color={colors.accentGray} />
                ) : null
              }
            />
          </View>
        </View>
      </SafeAreaView>

      <View style={{}}>
        <View
          style={{
            height: getHeightPercentage(100),
          }}
        >
          {
            <SearchResults
              people={people}
              posts={posts}
              teams={teams}
              navigation={route?.params?.navigation}
              modal={route?.params?.modal}
              loading={loading}
              sectionListData={sectionListData}
              setSectionListData={setSectionListData}
            />
          }
        </View>
      </View>
    </View>
  );
};

export default Search;
