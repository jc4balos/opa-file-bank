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

  // async fetchPreviewFile(fileId) {
  //   try {
  //     const url = new URL(backendUrl + "/api/v1/file/download-file");
  //     url.searchParams.append("fileId", fileId);
  //     const response = await fetch(url, {
  //       method: "GET",
  //       credentials: "include",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch file");
  //     }

  //     const data = await response.arrayBuffer();
  //     console.log(data);
  //     // const arrayBuffer = await response.arrayBuffer();
  //     // const base64String = btoa(
  //     //   String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
  //     // );
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching file:", error);
  //     throw error;
  //   }
  // }

  async deleteFile(fileId) {
    try {
      const url = new URL(backendUrl + "/api/v1/file/delete-file");
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
