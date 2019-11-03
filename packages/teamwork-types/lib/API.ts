export interface APIError {
  message: string;
  status: number;
  type: string;
}

export interface APIResponse {
  data?: any;
  error?: APIError;
}

export interface APIResponseSuccess<T> {
  data: T;
}

export interface APIResponseFailure {
  error: APIError;
}
