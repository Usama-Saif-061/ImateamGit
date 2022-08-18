import { getToken } from "../../../../common/helper";
import axios from "axios";

// getAllUsers 
export const getAllStores = async () => {
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
        const url = "https://dev.imateam.us:8443/stores/";

        const result = await axios.get(url, config);

        console.log("here is getAllStores response");
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("get getAllStores error", error);
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
};

// Add Store Api
export const addStoreApi = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const config = {
            headers: {
                // "Content-Type": "application/json",
                Authorization: token,
            },
        };
        const url = "https://dev.imateam.us:8443/stores/";

        const result = await axios.post(url, body, config);

        console.log("here is addStore response");
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("get addStore error", error);
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
};

// Update Store Api
export const updateStoreApi = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const config = {
            headers: {
                // "Content-Type": "application/json",
                Authorization: token,
            },
        };
        const url = "https://dev.imateam.us:8443/stores/";

        const result = await axios.put(url, body, config);

        console.log("here is updateStore response");
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("get updateStore error", error);
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
};

// delete a store api
export const deleteStoreApi = async (key) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = `https://dev.imateam.us:8443/stores/${key}/`
        const config = {
            headers: {
                //"Content-Type": "application/json",
                Authorization: token,
            },
        };
        const result = await axios.delete(url, config)
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("Error in deleting store: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}

// Add Store Api
export const addProductApi = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const config = {
            headers: {
                // "Content-Type": "application/json",
                Authorization: token,
            },
        };
        const url = "https://dev.imateam.us:8443/stores/products/";

        const result = await axios.post(url, body, config);

        console.log("here is addProduct response");
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("get addProduct error", error);
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
};