import axios from "axios";
import { getToken } from "../../../common/helper";

// export const getAllConversations = async () => {
//     const token = await getToken();
//     let response = {
//         message: "",
//         data: null,
//         resultCode: 0
//     }
//     try {
//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: token,
//             },
//         };
//         const url = "https://dev.imateam.us:8443/chat/rooms/";

//         const result = await axios.get(url, config);

//         console.log("here is getAllConversations response");
//         return response = {
//             message: "Success",
//             data: result.data,
//             resultCode: 200
//         }
//     } catch (error) {
//         console.log("get getAllConversations error", error);
//         return response = {
//             message: error,
//             data: null,
//             resultCode: 1
//         }
//     }
// };

export const addFansApi = async (id, body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = `https://dev.imateam.us:8443/posts/connections/${id}/`
        const config = {
            headers: {
                Authorization: token,
            },
        };
        const result = await axios.post(url, body, config)
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("Error in adding fan: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}