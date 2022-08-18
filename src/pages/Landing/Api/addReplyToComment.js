import axios from "axios";
import { getToken } from "./../../../common/helper";

async function addReplyOnComment(body, id) {
  let Token = await getToken();
  try {
    let url = `https://dev.imateam.us:8443/comments/replies/${id}/`;
    let headers = {
      Authorization: Token,
    };
    console.log("url: ", url, body, headers);
    const options = {
      method: "POST",
      headers: { Authorization: Token },
      data: body,
      url,
    };
    let response = await axios(options);
    if (response) {
      console.log("Comment replt Response: ", response);
      return true;
    } else {
      console.log("Comment  reply Response: Comment not sent;");
      return false;
    }
  } catch (err) {
    console.log(
      "Comment reply Response: Error in adding comment: ",
      err.response.data
    );
    return false;
  }
}

export default addReplyOnComment;
