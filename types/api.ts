export interface ApiResponse<T>{
  data: T;
  message?: string;
  status: number;
}

export interface ApiError{
  status: number;
  details?: unknown;
  message: string;
}

export interface NinjaApiErrorResponse {
  detail: string | (Array<Record<string, string[]>> & {msg: string})
}
