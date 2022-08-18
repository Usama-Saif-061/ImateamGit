import axios from "axios";
import { getToken } from "../../../../common/helper";

export const getCallendars = async () => {
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
        const url = "https://dev.imateam.us:8443/calendars/";

        const result = await axios.get(url, config);

        console.log("here is getCalendars response");
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("get calendars error", error);
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
};

export const addCalendarApi = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = "https://dev.imateam.us:8443/calendars/"
        //   const body = {}
        const config = {
            headers: {
                // "Content-Type": "application/json",
                Authorization: token,
            },
        };
        // console.log('body => ', body, ' token => ', token)
        const result = await axios.post(url, body, config)
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("Error in adding calendar: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}

export const updateCalendarApi = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = "https://dev.imateam.us:8443/calendars/"
        //   const body = {}
        const config = {
            headers: {
                // "Content-Type": "application/json",
                Authorization: token,
            },
        };
        // console.log('body => ', body, ' token => ', token)
        const result = await axios.put(url, body, config)
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("Error in updating calendar: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}

export const createEventApi = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = "https://dev.imateam.us:8443/events/"
        const config = {
            headers: {
                // "Content-Type": "application/json",
                Authorization: token,
            },
        };
        // console.log('body for event create => ', body);
        const result = await axios.post(url, body, config)
        // console.log('response api => ', response);
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("Error in creating event: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}

export const updateEventApi = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = "https://dev.imateam.us:8443/events/"
        const config = {
            headers: {
                // "Content-Type": "application/json",
                Authorization: token,
            },
        };
        // console.log('body for event update => ', body);
        console.log('before update api call');
        const result = await axios.put(url, body, config)
        console.log('after update api call');
        // console.log('response api => ', response);
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("Error in updating event: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }

}

export const getEventsApi = async () => {
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
        const url = "https://dev.imateam.us:8443/events/";

        const result = await axios.get(url, config);

        console.log("here is getEvents response");
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("get events error", error);
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
};

export const deleteEventApi = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = "https://dev.imateam.us:8443/events/"
        const config = {
            headers: {
                //"Content-Type": "application/json",
                Authorization: token,
            },
            data: body
        };
        // console.log('body for event delete => ', body);
        const result = await axios.delete(url, config)
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("Error in deleting event: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}

export const deleteCalendarApi = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = "https://dev.imateam.us:8443/calendars/"
        const config = {
            headers: {
                //"Content-Type": "application/json",
                Authorization: token,
            },
            data: body
        };
        // console.log('body for event delete => ', body);
        const result = await axios.delete(url, config)
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("Error in deleting calendar: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}

// Share Calendar 
export const shareCalendarApi = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = "https://dev.imateam.us:8443/calendars/"
        //   const body = {}
        const config = {
            headers: {
                // "Content-Type": "application/json",
                Authorization: token,
            },
        };
        // console.log('body => ', body, ' token => ', token)
        const result = await axios.put(url, body, config)
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("Error in sharing calendar: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}

export const unfollowCalendarApi = async (body) => {
    const token = await getToken();
    let response = {
        message: "",
        data: null,
        resultCode: 0
    }
    try {
        const url = "https://dev.imateam.us:8443/calendars/"
        const config = {
            headers: {
                // "Content-Type": "application/json",
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
        console.log("Error in unfollowing calendar: ", error)
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
}

export const getUserConnectionsApi = async (key) => {
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
        const url = `https://dev.imateam.us:8443/posts/user-connections/${key}/`;

        const result = await axios.get(url, config);

        console.log("here is getUserConnections response");
        return response = {
            message: "Success",
            data: result.data,
            resultCode: 200
        }
    } catch (error) {
        console.log("get userConnections error", error);
        return response = {
            message: error,
            data: null,
            resultCode: 1
        }
    }
};