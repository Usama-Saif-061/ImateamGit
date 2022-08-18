import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const updateLocationApi = async (location) => {
      const value = await AsyncStorage.getItem("auth");
      try{
            const url = "https://dev.imateam.us:8443/locations/places/"
            const body = {
                  search: location
            }
            const response = await axios.post(url, body,{
                  headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${value}`
                  }
            })
            if(response.data){
                  return response.data
            }
      }catch(error){
            console.log("Error in updating Location", error)
            return error
      }
      
}

export default updateLocationApi
