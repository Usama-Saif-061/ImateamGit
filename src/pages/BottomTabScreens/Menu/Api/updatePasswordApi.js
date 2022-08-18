import axios from "axios";
import { getToken } from "../../../../common/helper"

const updatePassword = async (input, id) => {
    let token = await getToken()
    try{
        let url = `https://dev.imateam.us:8443/auth/password/change/`
        let headers = {
            Authorization : token
        }
        let body = {
            password: input
        }
        let options = {
            method: "POST",
            headers: headers,
            data: body,
            url
        }
        let response = await axios(options)
        if(response){
            return response
        }
    }
    catch(err){
        return err
    }
}

export default updatePassword