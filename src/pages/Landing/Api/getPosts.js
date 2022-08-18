import axios from "axios";
import { useDispatch } from "react-redux";
const getPosts = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token a1842abd93dfe48380de43302e2965b89de8421c`,
      },
    };
    const response = await axios.get(
      `https://dev.imateam.us:8443/posts/`,
      config
    );
  } catch (error) {
    console.log(error);
  }
}

export default getPosts;
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { getToken } from "../../../common/helper";
// const getPosts  = async (hasMore,nextPage) => {
//   const token = await getToken();

//   try {

//     var url = `https://imateam:8443/posts/`
//    if(hasMore){
//      url = `https://imateam.us:8443/posts/?pageNumber=${nextPage}`
//    }
   
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     };
//     const response = await axios.get(
//       url,
//       config
//     );
//   }
// import axios from "axios";
// import { useDispatch } from "react-redux";
// const getPosts = async () => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token a1842abd93dfe48380de43302e2965b89de8421c`,
//       },
//     };
//     const response = await axios.get(`https://dev.imateam.us:8443/posts/`, config);


//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };


