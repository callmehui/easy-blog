const serverUrl =
  import.meta.env.MODE === "production"
    ? "https://music-player-server.immortalboy.cn"
    : "";
const imgServerUrl =
  import.meta.env.MODE === "production"
    ? "https://music-player-server.immortalboy.cn"
    : "";
const baseUrl =
  import.meta.env.MODE === "production"
    ? "https://music-player-server.immortalboy.cn"
    : "/api";

export { baseUrl, serverUrl, imgServerUrl };
