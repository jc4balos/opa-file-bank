import { backendUrl } from "../config/config";

export class FolderService {
  async getAllFilesInFolder(folderId) {
    try {
      const url = new URL(backendUrl + "/api/v1/folder/get-all-files");
      const params = new URLSearchParams({
        folderId: folderId,
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

  async addFolder(data) {
    console.log(
      "service",
      data.folderName,
      data.folderDescription,
      data.parentFolderId
    );
    try {
      const url = new URL(backendUrl + "/api/v1/folder/create-folder");

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}
