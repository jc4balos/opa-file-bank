import { backendUrl } from "../config/config";

export class LoginService {
  async login(data) {
    try {
      const url = new URL(backendUrl + "/api/v1/user/login");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}
