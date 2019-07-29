export interface ApiError {
  message: string;
  status: number;
  type: string;
}

export interface ApiSuccess<T> {
  data: T;
}
