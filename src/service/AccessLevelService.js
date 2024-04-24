import { backendUrl } from "../config/config";
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

  async addAccessLevel(data) {
    try {
      const url = new URL(
        backendUrl + "/api/v1/access-level/create-access-level"
      );

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteAccessLevel(accessLevelId) {
    try {
      const url = new URL(
        backendUrl + "/api/v1/access-level/delete-access-level"
      );
      url.search = new URLSearchParams({ accessLevelId: accessLevelId });

      const response = await fetch(url, {
        method: "PATCH",
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
