import React from "react";
import { View, Text } from "react-native";
import colors from "../../../../colors";
import { font, getHeightPixel, getWidthPixel } from "../../../../helper";

const ProgressButtons = (props) => (
  <View
    style={{
      flexDirection: "row",
      marginTop: 0,
      justifyContent: "center",
      marginBottom: 0,
    }}
  >
    {props.activeStep === 0 ? null : (
      <View
        style={{
          position: "absolute",
          left: getWidthPixel(45),
          bottom:
            props.activeStep === 2 ? getHeightPixel(146) : getHeightPixel(75),
          backgroundColor: colors.accentGray,
          width: getWidthPixel(136),
          height: getHeightPixel(46),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
        }}
      >
        {props.renderPreviousButton()}
      </View>
    )}
    <View
      style={{
        position: "absolute",
        right: getWidthPixel(45),
        bottom:
          props.activeStep === 2 ? getHeightPixel(146) : getHeightPixel(75),
        backgroundColor: colors.primary,
        width: props.activeStep === 0 ? getWidthPixel(283) : getWidthPixel(136),
        height: getHeightPixel(46),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
      }}
    >
      {props.renderNextButton()}
    </View>
    {console.log("active step is ", props.activeStep)}
    <Text
      style={{
        width: getWidthPixel(300),
        position: "absolute",
        bottom:
          props.activeStep === 2 ? getHeightPixel(45) : getHeightPixel(30),
        textAlign: "center",
        ...font("12", "400"),
        lineHeight: 15,
      }}
    >
      {props.activeStep === 0
        ? "By continuing, you acknowledge that you have read. understood, and agree to our seller agreement"
        : props.activeStep === 2
        ? "Standard Seller Fee is 5% (includes credit card processing fee). If a transaction is $10.00 or less, you’ll be charged a flat fee of $0.50. By Clicking Finishyou agree to our Seller Agreement. We’ll store your business information and share with payment processors to support selling features."
        : null}
    </Text>
  </View>
);

export default ProgressButtons;
