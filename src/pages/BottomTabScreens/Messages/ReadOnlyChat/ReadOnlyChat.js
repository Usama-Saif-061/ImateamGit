import React, { useRef } from 'react'
import {
    View,
    FlatList,
} from 'react-native'
import { getWidthPixel } from '../../../../common/helper'
import colors from '../../../../common/colors'
import { dummySingleMsg, MessageList } from '../constants'
import IndividualSingleMessage from '../SingleChat/IndividualSingleMessage'
import ReadOnlyChatHeader from './ReadOnlyChatHeader'

const ReadOnlyChat = ({ navigation }) => {
    const flatListRef = useRef()
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ReadOnlyChatHeader navigation={navigation} />
            {/* {Main Chat here} */}
            <FlatList
                style={{
                    backgroundColor: colors.ghostWhite,
                    paddingHorizontal: getWidthPixel(15),
                }}
                data={MessageList}
                ref={flatListRef}
                onContentSizeChange={() => setTimeout(() => flatListRef.current.scrollToEnd({ animated: true }), 200)}
                keyExtractor={(item) => item.key}
                // renderItem={({ item }) => <IndividualSingleMessage obj={item} />}
                renderItem={({ item, index }) => <IndividualSingleMessage obj={dummySingleMsg} index={index} />}
            />
        </View>
    )
}
export default ReadOnlyChat