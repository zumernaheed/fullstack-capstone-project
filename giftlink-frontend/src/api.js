export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function parseJson(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request failed: ${response.status}`);
  return data;
}
