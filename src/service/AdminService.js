import { backendUrl } from "../config/config";
export class AdminService {
  async getAllTrashFiles() {
    try {
      const url = new URL(backendUrl + "/api/v1/admin/get-all-trash-files");

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
