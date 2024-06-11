import axios from "axios";

const baseURL = process.env.ROOT_API;

const ApiClient = () => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(async (request) => {
    let accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  });
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error?.response?.status == 401 &&
        !error.config.url.includes("/user/signup")
      ) {
        window.location.href = "/login";
      }
      return Promise.reject(error); // Lanza el error para que pueda ser capturado en otro lugar
    }
  );

  return instance;
};
const apiClient = ApiClient();

export async function get(url, config) {
  try {
    const response = await apiClient.get(url, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function post(url, data, config) {
  try {
    const response = await apiClient.post(url, data, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function axiosDelete(url, config) {
  try {
    const response = await apiClient.delete(url, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function patch(url, data, config) {
  try {
    const response = await apiClient.patch(url, data, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
/*
export async function put(url, data, config) {
  try {
    const response = await apiClient.put(url, data, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
  const response = await apiClient.patch(url, data, config);
  return response.data;
}
/*
export async function put(url, data, config) {
  const response = await apiClient.put(url, data, config);
  return response.data;
}
*/
