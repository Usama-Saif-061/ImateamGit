import axios from "axios";
import { getToken } from "../../../../common/helper";

export const getAllProduct = async () => {
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
        const url = "https://dev.imateam.us:8443/stores/products/";

        const result = await axios.get(url, config);
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
};