const BASE_API = "https://api.santavideowishes.co.uk";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || BASE_API;

export const api = {
  get: async (url: string) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },

  post: async (url: string, data: any) => {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };

    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      data = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers,
      body: data,
    });
    return response.json();
  },

  put: async (url: string, data: any) => {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };

    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      data = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "PUT",
      headers,
      body: data,
    });
    return response.json();
  },

  delete: async (url: string) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
};

export default api;
