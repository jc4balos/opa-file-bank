import { backendUrl } from "../config/config";

export class LoginService {

    async Login(data) {
        try {
            const url = new URL(backendUrl + "/api/v1/user/login");
        
           const response =  await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                body:JSON.stringify(data)

                }
            )
            if (response.ok){
                const data = await response.json();
                return data;
            }else{
                const errorData = await response.json();
                throw errorData;
            }
               
        } catch (error) {
            throw error;
        }
    }




}