import axios from "axios";
import { getToken } from "../../../../common/helper"

const SetBackupEmail = async (input, id) => {
    let token = await getToken()
    try{
        let url = `https://dev.imateam.us:8443/accounts/user-setting/${id}/`
        let headers = {
            Authorization : token
        }
        let body = {
            backupEmail: input
        }
        let options = {
            method: "PUT",
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

export default SetBackupEmail