export function wrapJsonResponse<T>(response: T): { data: T } {
  return {
    data: response,
  };
}
