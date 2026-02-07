import { setToken } from "../utilities/auth";

const API_URL = import.meta.env.VITE_API_URL;

export default async function postLogin(credentials) {
  const url = `${API_URL}/api-token-auth/`;

  console.log("POST LOGIN URL:", url, "payload:", credentials);

  const response = await fetch(url, {
    method: "POST",
    cache: "no-store", // <-- prevent caching weirdness
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const text = await response.text(); // read once, then parse
  let data = null;

  try {
    data = JSON.parse(text);
  } catch {
    // if it isn't JSON, show the first part to debug
    throw new Error(`Expected JSON but got: ${text.slice(0, 120)}`);
  }

  if (!response.ok) {
    throw new Error(data.detail || JSON.stringify(data));
  }

  if (!data.token) {
    throw new Error(`No token in response: ${JSON.stringify(data)}`);
  }

  setToken(data.token);
  return data;
}
