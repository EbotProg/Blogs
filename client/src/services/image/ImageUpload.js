import axios from '../../api/AxiosInstance';

class ImageUpload {
  upload(file) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.post("/upload-blog-images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  }

  getFiles() {
    return axios.get("/files");
  }
}

export default new ImageUpload();