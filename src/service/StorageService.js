import { backendUrl } from "../config/config";

export class StorageService {
  async getStorageInfo() {
    try {
      const url = new URL(backendUrl + "/api/v1/storage/info");

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      setTimeout(() => {
        window.location = "/login";
      }, 2000);
      return error;
    }
  }
}
