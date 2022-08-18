import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./styles";
import addComment from "../../../../Reducers/addCommentApi";
import colors from "../../../colors";
import AttachIcon from "react-native-vector-icons/Entypo";
import { convertImageToBase64, getHeightPixel } from "../../../helper";
import { ShowInitialsOfName } from "../../ShowInitialsOfName";
import { useAddNewPostMutation } from "../../../../Reducers/postsApi";
import { AttachmentList } from "../AttachmentsList";
import Loading from "../../MainFrame";
import addReplyOnComment from "../../../../pages/Landing/Api/addReplyToComment";

function AddComment(props) {
  const {
    post,
    inputRef,
    method,
    onAddComment,
    userId,
    showAttachmentPicker,
    attachmentShown,
    pickerData,
    commentType,
    //  setLoading,
  } = props;
  const [val, setVal] = useState("");
  const [Uri, setUri] = useState([]);
  const [checkCom, setCheckCom] = useState(true);
  const [newComment, { isLoading }] = useAddNewPostMutation();
  const [loading, setLoading] = useState(false);

  const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 0;

  useEffect(() => {
    console.log("pickerData from useEffect: ", pickerData);
    setUri([]);
    setUri(pickerData);
    console.log("i am comment type ", commentType);
  }, [pickerData.length]);

  const jsonBody = {
    files: Uri,
    values: {
      accountId: userId,
      burn: post.payload.burn,
      private: post.payload.private,
      text: val,
    },
  };

  function checkEmpty() {
    if (val.length === 0) {
      setCheckCom(false);
    } else {
      setCheckCom(true);
      Keyboard.dismiss();
      postComment();
      newComment(jsonBody, post.id);
    }
  }

  const postComment = async () => {
    setLoading(true);

    const attachments = [];

    post.attachments.map((attachment) => {
      let base64Image = convertImageToBase64(attachment.url);
      attachments.push({
        fileInfo: {
          filename: attachment?.payload.filename,
          fileSize: attachment?.payload.fileSize,
          fileType: attachment?.payload.fileType,
        },
        data: base64Image,
      });
    });

    console.log("i am comment type", commentType);
    if (commentType.type === "reply") {
      var response = await addReplyOnComment(jsonBody, commentType.id);
      console.log("i am reply reponse", response);
    } else {
      var response = await addComment(jsonBody, post.id);
      console.log("i am comment response", response);
    }
    if (response) {
      setVal("");
      setLoading(false);
      setUri([]);
      console.log("i am comment response");
      onAddComment();
    }
    setLoading(false);
  };

  const toggleAttachments = () => {
    showAttachmentPicker(!attachmentShown);
  };

  return (
    <View>
      <Loading isLoading={loading} backgroundColor={colors.white} />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <TouchableOpacity>
            <ShowInitialsOfName
              size={28}
              radius={20}
              fontSize={10}
              name={post.user_info.display_name}
              colors={colors.accentGray}
              imgUrl={post?.user_info?.avatar?.url}
            />
          </TouchableOpacity>
          <View>
            <TextInput
              placeholder={checkCom ? "Write a comment..." : "Empty Comment"}
              placeholderTextColor={
                checkCom ? colors.lightSilver : colors.blockRed
              }
              value={val}
              style={{ ...styles.input, height: getHeightPixel(50) }}
              onChangeText={(val) => {
                setVal(val);
              }}
              returnKeyLabel="Post"
              returnKeyType="done"
              onSubmitEditing={checkEmpty}
              ref={inputRef}
            />

          </View>
        </View>

        <TouchableOpacity onPress={() => toggleAttachments()}>
          <AttachIcon name="attachment" size={16} color={colors.accentGray} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AddComment;
