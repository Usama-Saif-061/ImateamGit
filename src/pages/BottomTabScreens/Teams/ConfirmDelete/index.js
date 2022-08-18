import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Modal } from "react-native-paper";
import ButtonCommon from "../../../../common/Components/Buttons";
import styles from "./styles";
import colors from "../../../../common/colors";
import deleteOrg from "../API/deleteOrgApi";

const ConfirmDelete = ({ open, handleModal, teamId, navigation }) => {

  const DeleteOrganization = async ()=>{
    let body = {
      organizationId: teamId
    }
    let response = await deleteOrg(body)
    if(response){
      console.log(response)
      navigation.navigate("TeamsLanding", {
        reload: true
      })
    }
  }

  return (
    <Modal visible={open} style={styles.modal} dismissable={false}>
      <View style={styles.modalContainer}>
        <View style={styles.heading}>
          <Text style={styles.headingText} >Confirm Delete</Text>
        </View>
        <View style={styles.confirmNote}>
          <Text style={styles.noteText}>
            You are about to permanently delete this team and all information associated with it. Please confirm by clicking delete
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.cencelBtnWrapper}>
            <ButtonCommon 
            title="CANCEL"
            color={colors.accentGray}
            method={()=> handleModal(false)}
            />
          </View>
          <View style={styles.deleteBtnWrapper} >
            <ButtonCommon 
            title="Delete"
            color={colors.primary}
            method={DeleteOrganization}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDelete;
