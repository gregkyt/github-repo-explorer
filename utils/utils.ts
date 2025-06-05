function toQueryParam(query?: Record<string, any>) {
  if (query === undefined || query === null) return "";
  const params = new URLSearchParams(query);
  return params.toString();
}

export { toQueryParam };
