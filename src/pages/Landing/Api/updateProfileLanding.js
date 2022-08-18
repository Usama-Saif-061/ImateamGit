import axios from "axios";
import { getToken } from "../../../common/helper";

export const refreshUser = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        };
        const url = "https://dev.imateam.us:8443/accounts/user-info/";
        const result = await axios.put(url, body, config);

        console.log("here is update profile response");
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("Update profile error", error);
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}