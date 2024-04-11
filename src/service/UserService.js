import { backendUrl } from "../config/config";

export class UserService {
  async getAllUsers() {
    try {
      const url = new URL(backendUrl + "/api/v1/user/all-users");

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}
