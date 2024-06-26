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

  async getFolder(folderId) {
    try {
      const url = new URL(backendUrl + "/api/v1/folder/get-folder");
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
      return response;
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

  async deleteFolder(folderId) {
    try {
      const url = new URL(backendUrl + "/api/v1/folder/delete-folder");
      const params = new URLSearchParams({
        folderId: folderId,
      });

      url.search = params;

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

  async modifyFolder(data, folderId) {
    try {
      const url = new URL(backendUrl + "/api/v1/folder/modify-folder");
      const params = new URLSearchParams({
        folderId: folderId,
      });

      url.search = params;

      const response = await fetch(url, {
        method: "PATCH",
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

  async search(searchString) {
    try {
      const url = new URL(
        backendUrl + "/api/v2/folder/get-files-and-folders/search"
      );
      const params = new URLSearchParams({
        search: searchString,
      });

      url.search = params;

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
