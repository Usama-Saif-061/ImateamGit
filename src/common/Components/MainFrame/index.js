import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Modal, ActivityIndicator } from "react-native";

import colors from "../../colors";
import mainFrameStyles from "./styles";

export default class Loading extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: false,
  };

  render() {
    const { isLoading } = this.props;
    return (
      <Modal visible={isLoading} transparent={true}>
        <View style={mainFrameStyles.container}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
            animating={isLoading}
          />
        </View>
      </Modal>
    );
  }
}
