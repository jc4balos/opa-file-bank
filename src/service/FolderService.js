import { backendUrl } from "../config/config";

export class FolderService {
  async getAllFilesInFolder(folderId, userId) {
    try {
      const url = new URL(backendUrl + "/api/v1/folder/get-all-files");
      const params = new URLSearchParams({
        folderId: folderId,
        userId: userId,
      });

      url.search = params;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }
}
