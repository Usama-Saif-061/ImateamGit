import { getToken } from "../../../../common/helper";
import axios from "axios";

export const getTeamAttachmentsApi = async (id) => {
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
        const url = `https://dev.imateam.us:8443/organizations/member/${id}/`

        const result = await axios.get(url, config);
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("get team attachments error", error);
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
};

export const updateTeamAttachmentsApi = async (id, body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = `https://dev.imateam.us:8443/organizations/member/${id}/`
        const config = {
            headers: {
                Authorization: token,
            },
        };
        const result = await axios.put(url, body, config)
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("Error in updating team attachments messages: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}