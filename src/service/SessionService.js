import { backendUrl } from "../config/config";

export class SessionService {
  async getSessionData() {
    try {
      const url = new URL(backendUrl + "/api/v1/session");

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      // setTimeout(() => {
      //   window.location = "/login";
      // }, 2000);
      return error;
    }
  }
}
