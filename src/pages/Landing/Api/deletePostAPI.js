import axios from "axios";
import { useDispatch } from "react-redux";
import { getToken } from "../../../common/helper";
const deletePostAPI = async (postId) => {
  const token = await getToken();
  console.log("this is ", postId, "token is ", token);
  var url = `https://dev.imateam.us:8443/posts/`;
  const body = {
    postId: postId.toString(),
  };
  let headers = {
    Authorization: token,
  };
  const options = {
    method: "DELETE",
    headers: headers,
    data: body,
    url: url,
  };
  try {
    const response = await axios(options);

    if (response.data.msg === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error here", error.response.data);
  }
};

export default deletePostAPI;
