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

  async restoreFolder(folderId) {
    try {
      const url = new URL(backendUrl + "/api/v1/folder/restore-folder");
      url.search = new URLSearchParams({
        folderId: folderId,
      });

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

  async restoreFile(fileId) {
    try {
      const url = new URL(backendUrl + "/api/v1/file/restore-file");
      url.search = new URLSearchParams({ fileId: fileId });
      const response = await fetch(url, {
        method: "PATCH",
        credentials: "include",
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}
