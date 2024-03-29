import api from "../api/api";

export default class Service {
  static async query(query: string) {
    const response = await api.get("/match", {
      params: {
        q: query,
      },
    });

    if (response.status != 200) {
      throw new Error(response.data.error);
    }

    return response.data;
  }

  static async products() {
    const response = await api.get("/products");

    if (response.status != 200) {
      throw new Error(response.data.message);
    }

    return response.data;
  }
}
