import { API_URL, parseJson } from "../api.js";

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
    },
    body: JSON.stringify(credentials)
  });

  const data = await parseJson(response);
  if (data.token) localStorage.setItem("token", data.token);
  return data;
}

export default loginUser;
