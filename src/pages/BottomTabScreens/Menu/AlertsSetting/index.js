import React, { useState } from "react";
import styles from "./styles";
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Switch,
  Text,
} from "react-native";
import colors from "../../../../common/colors";
import { useGetUserQuery } from "../../../../Reducers/usersApi"
import profileAlert from "../Api/profileAlertApi";

function AlertSetting() {

  let { data: userInfo, isFetching, refetch} = useGetUserQuery()

  let [ alerts, setAlerts ] = useState({
    textAlerts: userInfo?.payload?.textAlerts,
    emailAlerts: userInfo?.payload?.emailAlerts,
    systemMessages: userInfo?.payload?.systemMessages,
    taskNotifications: userInfo?.payload?.taskNotifications,
    securityNotifications: userInfo?.payload?.securityNotifications,
  })

  console.log("AL", alerts)

  const subscribe = async (type) => {
    console.log("CONSO", type, userInfo.id)
    if(type === "EA"){
      let body = {
        emailAlerts: !userInfo?.payload?.emailAlerts,
      }
      console.log(body)
      let response = await profileAlert(body, userInfo.id)
      if(response){
        refetch()
        console.log("Alert Response", response)
      }
    }
    else if(type === "TA"){
      let body = {
        textAlerts: !userInfo?.payload?.textAlerts,
      }
      console.log(body)
      let response = await profileAlert(body, userInfo.id)
      if(response){
        refetch()
        console.log("Alert Response", response)
      }
    }
    else if(type === "SM"){
      let body = {
        systemMessages: !userInfo?.payload?.systemMessages,
      }
      console.log(body)
      let response = await profileAlert(body, userInfo.id)
      if(response){
        refetch()
        console.log("Alert Response", response)
      }
    }
    else if(type === "TN"){
      let body = {
        taskNotifications: !userInfo?.payload?.taskNotifications,
      }
      console.log(body)
      let response = await profileAlert(body, userInfo.id)
      if(response){
        refetch()
        console.log("Alert Response", response)
      }
    }
    else if(type === "SN"){
      let body = {
        securityNotifications: !userInfo?.payload?.securityNotifications,
      }
      console.log(body)
      let response = await profileAlert(body, userInfo.id)
      if(response){
        refetch()
        console.log("Alert Response", response)
      }
    }
  }
  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* Section 1 */}
        <View style={styles.section}>
          <Text style={styles.head}>Alerts</Text>
          <View style={[styles.option, { marginBottom: 5}]}>
            <Text style={styles.lightText}>
              Enable email alerts for all selected notifications?
            </Text>
            <Switch
              trackColor={{ false: colors.accentGray, true: colors.inputBlue }}
              thumbColor={colors.white}
              ios_backgroundColor="#3e3e3e"
              onChange={() => {
                setAlerts({
                  ...alerts,
                  emailAlerts: !alerts.emailAlerts,
                })
                subscribe("EA")
              }}
              value={alerts.emailAlerts}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.lightText}>
              Enable text alerts for all selected notifications?
            </Text>
            <Switch
              trackColor={{ false: colors.accentGray, true: colors.inputBlue }}
              thumbColor={colors.white}
              ios_backgroundColor="#3e3e3e"
              onChange={() => {
                setAlerts({
                  ...alerts,
                  textAlerts: !alerts.textAlerts
                })
                subscribe("TA")
              }}
              value={alerts.textAlerts}
            />
          </View>
        </View>
        {/* Section 2 */}
        <View style={styles.section}>
          <Text style={styles.head}>System Messages</Text>
          <View style={styles.option}>
            <Text style={styles.lightText}>
              System messages will be delivered to your selected methods.
            </Text>
            <Switch
              trackColor={{ false: colors.accentGray, true: colors.inputBlue }}
              thumbColor={colors.white}
              ios_backgroundColor="#3e3e3e"
              onChange={() => {
                setAlerts({
                  ...alerts,
                  systemMessages: !alerts.systemMessages
                })
                subscribe("SM")
              }}
              value={alerts.systemMessages}
            />
          </View>
        </View>
        {/* Section 3 */}
        <View style={styles.section}>
          <Text style={styles.head}>Task Notifications</Text>
          <View style={styles.option}>
            <Text style={styles.lightText}>
              Task notifications will be delivered to your selected methods.
            </Text>
            <Switch
              trackColor={{ false: colors.accentGray, true: colors.inputBlue }}
              thumbColor={colors.white}
              ios_backgroundColor="#3e3e3e"
              onChange={() => {
                setAlerts({
                  ...alerts,
                  taskNotifications: !alerts.taskNotifications
                })
                subscribe("TN")
              }}
              value={alerts.taskNotifications}
            />
          </View>
        </View>
        {/* Section 4 */}
        <View style={styles.section}>
          <Text style={styles.head}>Account Security</Text>
          <View style={styles.option}>
            <Text style={styles.lightText}>
              Account Security notifications will be delivered to your selected
              methods.
            </Text>
            <Switch
              trackColor={{ false: colors.accentGray, true: colors.inputBlue }}
              thumbColor={colors.white}
              ios_backgroundColor="#3e3e3e"
              onChange={() => {
                setAlerts({
                  ...alerts,
                  securityNotifications: !alerts.securityNotifications
                })
                subscribe("SN")
              }}
              value={alerts.securityNotifications}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AlertSetting;
