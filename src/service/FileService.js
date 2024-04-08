import { backendUrl } from "../config/config";

export class FileService {
  async uploadFile(formData) {
    console.log("running upload file");
    try {
      const url = new URL(backendUrl + "/api/v1/file/create-file");

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async downloadFile(fileId) {
    try {
      const url = new URL(backendUrl + "/api/v1/file/download-file");
      url.search = new URLSearchParams({ fileId: fileId });
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}
