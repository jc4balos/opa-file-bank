export class AccessLevelService {
  async getAllAccessLevels() {
    try {
      const url = new URL(
        backendUrl + "/api/v1/access-level/get-access-levels"
      );

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
