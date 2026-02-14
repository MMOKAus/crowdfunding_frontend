import { setToken, setUser } from "../utilities/auth";

const API_URL = import.meta.env.VITE_API_URL;

export default async function postLogin(credentials) {
  if (!API_URL) {
    throw new Error("VITE_API_URL is missing.");
  }

  const response = await fetch(`${API_URL}/api-token-auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed.");
  }

  if (!data.token) {
    throw new Error(`No token in response: ${JSON.stringify(data)}`);
  }

  // Store token
  setToken(data.token);

  // Store username manually
  setUser({
    username: credentials.username,
  });

  return data;
}
