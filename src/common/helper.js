import { Dimensions } from "react-native";
import ImgToBase64 from "react-native-image-base64";
import colors from "./colors";
import moment from "moment";
import 'moment-timezone'
import {
  notifications,
} from 'react-native-firebase-push-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const { width: fullWidth, height: fullHeight } =
  Dimensions.get("window");

export const getWidthPercentage = (percentage) =>
  (fullWidth * percentage) / 100;

export const getHeightPercentage = (percentage) =>
  (fullHeight * percentage) / 100;

export const getHeightPixel = (pixel) => {
  const percent = (pixel / 812) * 100;
  return getHeightPercentage(percent);
};

export const getWidthPixel = (pixel) => {
  const percent = (pixel / 375) * 100;
  return getWidthPercentage(percent);
};

export const getResponsiveFont = (fontSize) => {
  const scale = fullWidth / 414;
  if (fullWidth > 500) {
    if (fullHeight > 1200) {
      return fontSize * 1.3;
    }
    return fontSize * 1.5;
  }
  return fontSize * scale;
};

export const font = (
  fontSize,
  fontWeight = "400",
  fontFamily = "Segoe UI"
) => ({
  fontSize: getResponsiveFont(fontSize),
  fontFamily: fontFamily,
  fontWeight: fontWeight,
  color: colors.mineShaft,
});

export const ValidateFirstName = (text) => {
  if (text) {
    if (text.length < 3 || text.length > 30) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const ValidateLastName = (text) => {
  if (text) {
    if (text.length < 3 || text.length > 30) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const GOOGLE_API_KEY = "AIzaSyBQyEE67gM0AvoJAzwp7fSdDlPqKwqKTxU";

export const ValidateEmail = (mail) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(mail) === false || mail.length > 50) {
    return false;
  } else {
    console.log("Email is Correct");

    return true;
  }
};

export const ValidatePassword = (text) => {
  if (text) {
    if (text.length < 8 || text.length > 30) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const moveToNextScreen = (navigation, screenName) => {
  navigation.navigate(screenName);
};

export const showInitials = (name) => {
  if (!name) {
    return name;
  }
  const res = name.split(" ");
  if (!res[1]) {
    return res[0].charAt(0).toUpperCase();
  }
  return `${res[0].charAt(0).toUpperCase()}${res[1].charAt(0).toUpperCase()}`;
};
export const convertImageToBase64 = (image) => {
  if (image) {
    ImgToBase64.getBase64String(image)
      .then((base64String) => {
        //console.log(base64String);
        return base64String;
      })
      .catch((err) => "not converted");
  }
};
export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("auth");
    //console.log("App started token is ", value);
    if (value === null) {
      return false;
    } else {
      return `Token ${JSON.parse(value)}`;
    }
  } catch (e) {
    console.log("error reading from async");
  }
};

export const generateRandomColor = (index) => {
  const colorIndex = index % 7;
  const allColors = [
    colors.DI,
    colors.DII,
    colors.DIII,
    colors.NAIA,
    colors.CC,
    colors.NONPROFITBADGE,
    colors.DIV,
  ];
  return allColors[colorIndex];
};

export const getData = (string) => {
  if (string) {
    const data = string.split("|");
    return data;
  } else return false;
};

export const getTranslatedTime = (time, timezone) => {
  if (timezone) {
    return moment.utc(time).tz(timezone)
  } else {
    return moment.utc(time).tz(moment.tz.guess())
  }
}

export const validateUrl = (url) => {
  const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
  return regex.test(url);
}

export const filterDailyTime = (time, dateNow) => {
  switch (time) {
    case '12:00 AM':
      return moment(dateNow).format('YYYY-MM-DDT24:00')
    case '1:00 AM':
      return moment(dateNow).format('YYYY-MM-DDT01:00')
    case '2:00 AM':
      return moment(dateNow).format('YYYY-MM-DDT02:00')
    case '3:00 AM':
      return moment(dateNow).format('YYYY-MM-DDT03:00')
    case '4:00 AM':
      return moment(dateNow).format('YYYY-MM-DDT04:00')
    case '5:00 AM':
      return moment(dateNow).format('YYYY-MM-DDT05:00')
    case '6:00 AM':
      return moment(dateNow).format('YYYY-MM-DDT06:00')
    case '7:00 AM':
      return moment(dateNow).format('YYYY-MM-DDT07:00')
    case '8:00 AM':
      return moment(dateNow).format('YYYY-MM-DDT08:00')
    case '9:00 AM':
      return moment(dateNow).format('YYYY-MM-DDT09:00')
    case '10:00 AM':
      return moment(dateNow).format('YYYY-MM-DDT10:00')
    case '11:00 AM':
      return moment(dateNow).format('YYYY-MM-DDT11:00')
    case '12:00 PM':
      return moment(dateNow).format('YYYY-MM-DDT12:00')
    case '1:00 PM':
      return moment(dateNow).format('YYYY-MM-DDT13:00')
    case '2:00 PM':
      return moment(dateNow).format('YYYY-MM-DDT14:00')
    case '3:00 PM':
      return moment(dateNow).format('YYYY-MM-DDT15:00')
    case '4:00 PM':
      return moment(dateNow).format('YYYY-MM-DDT16:00')
    case '5:00 PM':
      return moment(dateNow).format('YYYY-MM-DDT17:00')
    case '6:00 PM':
      return moment(dateNow).format('YYYY-MM-DDT18:00')
    case '7:00 PM':
      return moment(dateNow).format('YYYY-MM-DDT19:00')
    case '8:00 PM':
      return moment(dateNow).format('YYYY-MM-DDT20:00')
    case '9:00 PM':
      return moment(dateNow).format('YYYY-MM-DDT21:00')
    case '10:00 PM':
      return moment(dateNow).format('YYYY-MM-DDT22:00')
    case '11:00 PM':
      return moment(dateNow).format('YYYY-MM-DDT23:00')
    default:
      return;
  }
}

export const capitalizeFirstLetter = (txt) => {
  return txt.charAt(0).toUpperCase() + txt.slice(1)
}

export const ScreenSize = Dimensions.get('screen');

export const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    ;
}

export const getFirebaseToken = async () => {
  try {
    let token = await notifications.getToken()
    return token
  } catch (e) {
    console.log('Error while getting firebase token', e)
    return null;
  }
}