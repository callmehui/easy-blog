const serverUrl =
  import.meta.env.MODE === "production" ? "https://immortalboy.cn" : "";
const imgServerUrl =
  import.meta.env.MODE === "production" ? "https://immortalboy.cn" : "";
const baseUrl =
  import.meta.env.MODE === "production" ? "https://immortalboy.cn" : "/api";

export { baseUrl, serverUrl, imgServerUrl };
