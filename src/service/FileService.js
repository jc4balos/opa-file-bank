export class FileService {
  async uploadFile(file) {
    console.log("running upload file");
    try {
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file);
      }
      console.log("file", file);
      console.log("formdata:", formData);

      const url = new URL("http://localhost:8080/file/system");
      const params = new URLSearchParams({});

      // Pass formData as the body of the fetch request
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    } catch (error) {
      alert(error);
    }
  }
}
