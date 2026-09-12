import { API_URL, parseJson } from "../api.js";

export async function registerUser(formData) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  return parseJson(response);
}

export default registerUser;
