import React, { useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Image,
    Keyboard,
    Platform
} from 'react-native'
import { getHeightPixel, getWidthPixel, getWidthPercentage } from '../../../../common/helper'
import colors from '../../../../common/colors'
import AttachIcon from "react-native-vector-icons/Entypo";
import { ShowInitialsOfName } from '../../../../common/Components/ShowInitialsOfName';
import { AttachmentList } from '../../../../common/Components/Post/AttachmentsList';
import icons from '../../../../common/icons';
import useState from 'react-usestateref'

export default AddMessage = () => {
    const [keyboardHeight, setKeyboardHeight, ref] = useState(0)

    const onKeyboardDidShow = (e) => {
        setKeyboardHeight(e.endCoordinates.height)
    }

    const onKeyboardDidHide = () => {
        setKeyboardHeight(0)
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            onKeyboardDidShow
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            onKeyboardDidHide
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    console.log('height => ', ref.current);
    // Bottom navigation height is 63.2
    return (
        <View style={{ ...styles.mainContainer, paddingBottom: Platform.OS == 'android' || ref.current == 0 ? getHeightPixel(10) : ref.current - 55 }}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <TouchableOpacity onPress={() => toggleAttachments()}>
                        <AttachIcon name="attachment" size={20} color={colors.accentGray} />
                    </TouchableOpacity>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == 'android' ? "position" : 'height'}
                    // keyboardVerticalOffset={Platform.OS == 'android' ? 0 : ref.current}
                    // keyboardVerticalOffset={500}
                    // enabled={Platform.OS === "ios" ? true : false}
                    >
                        <TextInput
                            placeholder='Write a comment'
                            // autoFocus={true}
                            placeholderTextColor={colors.lightSilver}
                            // value={val}
                            style={styles.input}
                            // onChangeText={(val) => {
                            //     setVal(val);
                            // }}
                            returnKeyLabel="Post"
                            returnKeyType="done"
                        // onSubmitEditing={checkEmpty}
                        // ref={inputRef}
                        />
                        <AttachmentList
                            // Uri={Uri}
                            Uri=''
                            updateArray={(item) => {
                                // setUri((pre) => {
                                //     return pre.filter((temp) => temp != item);
                                // });
                            }}
                        />
                    </KeyboardAvoidingView>
                    <Image
                        source={icons.iconsMini.SendIcon}
                        resizeMode='contain'
                        style={{
                            position: 'absolute',
                            right: getWidthPixel(15)
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        // height: getHeightPixel(50),
        backgroundColor: '#FBFBFB',
        borderTopColor: '#E2E3E4',
        borderTopWidth: 0.5,
        paddingVertical: getHeightPixel(10),
    },
    wrapper: {
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingHorizontal: getWidthPixel(15),
    },
    input: {
        width: getWidthPercentage(65),
        height: getHeightPixel(42),
        paddingLeft: getWidthPixel(10),
        color: colors.black,
    },
})