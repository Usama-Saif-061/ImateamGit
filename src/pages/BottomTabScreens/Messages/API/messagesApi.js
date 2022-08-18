import { getToken } from "../../../../common/helper";
import axios from "axios";

// for internal messages inside individual group chat or personal chat
export const getAllMessages = async (key) => {
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
        const url = `https://dev.imateam.us:8443/chat/messages/${key}/`;

        const result = await axios.get(url, config);

        console.log("here is getAllMessages response");
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("get messages error", error);
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
};

// for all conversations and groups with people and groups
export const getAllConversations = async () => {
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
        const url = "https://dev.imateam.us:8443/chat/rooms/";

        const result = await axios.get(url, config);

        console.log("here is getAllConversations response");
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("get getAllConversations error", error);
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
};

export const startConversationApi = async (body) => {
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
        const url = "https://dev.imateam.us:8443/chat/rooms/";

        const result = await axios.post(url, body, config);

        console.log("here is startConversation response");
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("get startConversation error", error);
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
};

// Delete a single chat
export const deleteChat = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = "https://dev.imateam.us:8443/chat/rooms/"
        const config = {
            headers: {
                //"Content-Type": "application/json",
                Authorization: token,
            },
        };
        // console.log('body for chat delete => ', body);
        const result = await axios.put(url, body, config)
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("Error in deleting chat: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}

// Send a single message inside a chat
export const SingleMessageApi = async (key, body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = `https://dev.imateam.us:8443/chat/messages/${key}/`
        const config = {
            headers: {
                //"Content-Type": "application/json",
                Authorization: token,
            },
        };
        // console.log('body for chat send message => ', body);
        const result = await axios.post(url, body, config)
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("Error in sending message in chat: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}

// getAllUsers 
export const getAllUsersApi = async (body) => {
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
        const url = "https://dev.imateam.us:8443/accounts/users/";

        const result = await axios.post(url, body, config);

        console.log("here is getAllUsers response");
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("get getAllUsers error", error);
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
};

// Update last seen
export const updateUnreadMsgsApi = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = "https://dev.imateam.us:8443/chat/rooms/"
        const config = {
            headers: {
                //"Content-Type": "application/json",
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
        console.log("Error in updating unread messages: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}