import axios from "axios";
import { getToken } from "../../../../common/helper";

const getPlaces = async (search) => {
  let token = await getToken();
  try {
    let url = "https://dev.imateam.us:8443/locations/places/";
    let headers = {
      Authorization: token,
    };
    let body = {
      location: "",
      search: search,
      sessionId: "",
      types: "(regions)",
    };
    let options = {
      method: "POST",
      headers: headers,
      data: body,
      url,
    };
    let response = await axios(options);
    return response;
  } catch (err) {
    return err;
  }
};
export default getPlaces