export function formatQueryParams(params: { [key: string]: string | number }) {
  const entries = Object.entries(params);
  if (entries.length === 0) return "";

  const query = entries.map(([key, value]) => `${key}=${value}`).join("&");
  return query;
}

export function genUrl(path: string, params: { [key: string]: string | number }) {
  return `${path}?${formatQueryParams(params)}`;
}