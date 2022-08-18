import axios from "axios";
import { getToken } from "../common/helper";

async function addComment(body, id) {
  let Token = await getToken();
  try {
    let url = `https://dev.imateam.us:8443/posts/comments/${id}/`;
    let headers = {
      Authorization: Token,
    };
    console.log("url: ", url, body, headers);
    const options = {
      method: 'POST',
      headers: { Authorization: Token },
      data: body,
      url,
    };
    let response = await axios(options);// axios.post(url, body, headers);
    if (response) {
      console.log("Comment Response: ", response);
      return true;
    } else {
      console.log("Comment Response: Comment not sent;");
      return false;
    }
  } catch (err) {
    console.log(
      "Comment Response: Error in adding comment: ",
      err.response.data
    );
    return false;
  }
}

export default addComment;
