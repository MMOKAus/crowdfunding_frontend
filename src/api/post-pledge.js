import { getToken } from "../utilities/auth";

const API_URL = import.meta.env.VITE_API_URL;

export default async function postPledge(pledgeData) {
  const token = getToken();

  const response = await fetch(`${API_URL}/pledges/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Token ${token}` } : {}),
    },
    body: JSON.stringify(pledgeData),
  });

  if (!response.ok) {
    let message = "Failed to create pledge.";
    try {
      const data = await response.json();
      message = data.detail || JSON.stringify(data);
    } catch {}
    throw new Error(message);
  }

  return await response.json();
}
