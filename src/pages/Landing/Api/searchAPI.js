import axios from "axios";
import { getToken } from "../../../common/helper";

const searchAPI = async (input) => {
  const token = await getToken();
  console.log(
    "here is search suggestions api input is ",
    input,
    "token is ",
    token
  );

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    const url = `https://dev.imateam.us:8443/search/?text=${input}/`;

    const response = await axios.get(url, config);
    console.log("suggestions list api rsponse", response.data);
    if (response.data) {
      console.log("data  is:", response);
      return response.data;
    }
  } catch (error) {
    console.log("search error", error.response.data);
  }
};

export default searchAPI;
