export class LoginService {

    async Login(username, password) {
        try {
            const url = new URL("http://localhost:8080/login");
        

            fetch(url, {
                method: "POST",
                body:{
                    username: username,
                    password: password
                },


                }
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));
        } catch (error) {
            alert(error);
        }
    }




}