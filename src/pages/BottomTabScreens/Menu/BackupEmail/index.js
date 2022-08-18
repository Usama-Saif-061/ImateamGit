import React, { useEffect, useState } from "react";
import { View, Text, TextInput, SafeAreaView } from "react-native";
import colors from "../../../../common/colors";
import Header from "../../../../common/Components/HeaderCommon";
import styles from "./styles";
import SetBackupEmail from "../Api/backupEmail";
import { getHeightPixel, ValidateEmail } from "../../../../common/helper";
import { useGetUserQuery } from "../../../../Reducers/usersApi";

const BackupEmail = ({ navigation }) => {
  const { data: userData, refetch } = useGetUserQuery();

  const [backupEmail, setBackupEmail] = useState(
    userData?.payload?.backupEmail ? userData.payload.backupEmail : ""
  );
  const [isEdit, setIsEdit] = useState(
    userData?.payload?.backupEmail ? true : false
  );
  const [editable, setEditable] = useState(false);
  const [emailValidity, setEmailValidity] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailExisted, setExisted] = useState(false);

  const validate = (i) => {
    setBackupEmail(i);
    if (ValidateEmail(i)) {
      setEmailValidity(true);
    } else {
      setEmailValidity(false);
    }
  };
  useEffect(() => {
    if (userData?.payload?.backupEmail) {
      setBackupEmail(userData?.payload?.backupEmail);
    } else {
      setBackupEmail("");
    }
  }, []);
  console.log("backupEmail=====>", backupEmail);
  const backup = async () => {
    if (!editable && userData?.payload?.backupEmail) {
      setEditable(true);
    } else {
      if (emailValidity && backupEmail.length) {
        if (userData.payload.backupEmail !== backupEmail) {
          setExisted(false);
          setLoading(true);
          let response = await SetBackupEmail(backupEmail, userData.id);
          if (response) {
            setLoading(false);
            refetch();
            console.log("BackUp email", response);
            navigation.goBack();
          }
        } else {
          setExisted(true);
        }
      }
    }
  };
  return (
    <View>
      <SafeAreaView>
        <Header
          navigation={navigation}
          heading="Backup Email"
          Submit={true}
          btnTitle={
            !editable && userData?.payload?.backupEmail ? "Edit" : "Submit"
          }
          onPressSubmit={() => backup()}
          loading={loading}
        />
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Email</Text>
            <TextInput
              value={backupEmail}
              editable={
                !editable && userData?.payload?.backupEmail ? false : true
              }
              placeholder="Enter Email"
              placeholderTextColor={colors.lightSilver}
              style={[
                styles.input,
                {
                  borderColor: emailValidity
                    ? colors.lightSilver
                    : colors.blockRed,
                  color:
                    !editable && userData?.payload?.backupEmail
                      ? colors.silver
                      : colors.mineShaft,
                  height: getHeightPixel(50),
                },
              ]}
              onChangeText={(e) => validate(e)}
            />
            {!emailValidity && (
              <Text style={styles.errMsg}>Enter valid email</Text>
            )}
            {emailExisted && (
              <Text style={styles.errMsg}>
                This email is already your backup email{" "}
              </Text>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default BackupEmail;
