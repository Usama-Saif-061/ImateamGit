import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phoneNo: "",
    interests: [],
    dob: "",
    verificationId: "",
    location: ""
  },
  isSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSignupStep1: (state, action) => {
      const users = action.payload;
      state.userInfo.first_name = users.first_name;
      state.userInfo.last_name = users.last_name;
      state.userInfo.email = users.email;
      state.userInfo.password = users.password;
      console.log("step 1 data", state.userInfo);

      state.isSuccess = true;
    },
    userSignupStep2: (state, action) => {
      const dob = action.payload.dob;
      const interests = action.payload.selectedItems;

      console.log("here is data of dob ", dob);
      state.userInfo.dob = dob;
      state.userInfo.interests = interests;
      console.log("main interests hon ", interests);
      console.log(state.userInfo);
      state.isSuccess = true;
    },
    userSignupStep3: (state, action) => {
      const phoneNo = action.payload.number;
      const id = action.payload.id;

      state.userInfo.phoneNo = phoneNo;
      state.userInfo.verificationId = id;

      console.log("step 3 data", state.userInfo);
      state.isSuccess = true;
    },
    updateUserInfo: (state, action) => {
      const users = action.payload;
      state.userInfo.email = users.email;
      state.userInfo.first_name = users.first_name;
      state.userInfo.last_name = users.last_name;
      state.userInfo.phoneNo = users.phoneNo;
      state.userInfo.personalInfo = users.personalInfo;
      state.userInfo.location = users.location
      state.userInfo.interests = users.interests
      console.log("Updated user data", state.userInfo);
      state.isSuccess = true;
    },
    userLogOut: (state) => {
      state.userInfo.first_name = "";
      state.userInfo.last_name = "";
      state.userInfo.email = "";
      state.userInfo.password = "";
      (state.userInfo.phoneNo = ""),
        (state.userInfo.interests = []),
        (state.userInfo.dob = ""),
        (state.userInfo.verificationId = ""),
        (state.isSuccess = false);
    },
  },
});
export const { userSignupStep1, userSignupStep2, userSignupStep3, updateUserInfo, userLogOut } =
  userSlice.actions;
export default userSlice.reducer;
