export class SessionService {
  async getSessionData() {
    try {
      const url = new URL(backendUrl + "/api/v1/user/session");

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
