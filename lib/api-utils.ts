import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { ApiError, ApiResponse, NinjaApiErrorResponse } from "@/types/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<NinjaApiErrorResponse>) => {
    const msg = typeof error.response?.data?.detail === "string" ? error.response?.data?.detail : error.response?.data?.detail.msg
    const apiError: ApiError = {
      status: error.response?.status || 500,
      message: msg || "Une erreur est survenue",
      details: error.response?.data,
    };

    return Promise.reject(apiError);
  },
);

export async function get<T>(
  url: string,
  params?: Record<string, string | number | boolean>,
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url, { params });
    return {
      data: response.data,
      status: response.status,
      message: response.statusText,
    };
  } catch (error) {
    throw error as ApiError;
  }
}
