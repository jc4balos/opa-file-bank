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

  async deleteTrashFiles(folders, files) {
    try {
      const url = new URL(
        backendUrl + "/api/v1/admin/delete-multiple-trash-files"
      );
      url.search = new URLSearchParams({
        folderIds: folders,
        fileIds: files,
      });

      const response = await fetch(url, {
        method: "DELETE",
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
