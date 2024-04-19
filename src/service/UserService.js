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

  async modifyUser(data) {
    try {
      const url = new URL(backendUrl + "/api/v1/user/modify-user");

      const response = await fetch(url, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: data,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  async addUser(data) {
    try {
      const url = new URL(backendUrl + "/api/v1/user/create-user");

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: data,
      });

      return response;
    } catch (error) {
      return error;
    }
  }
}
