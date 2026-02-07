import { getToken } from "../utilities/auth";

const API_URL = import.meta.env.VITE_API_URL;

export default async function postFundraiser(fundraiserData) {
  const token = getToken();

  const response = await fetch(`${API_URL}/fundraisers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Token ${token}` } : {}),
    },
    body: JSON.stringify(fundraiserData),
  });

  if (!response.ok) {
    let message = "Failed to create fundraiser.";
    try {
      const data = await response.json();
      // DRF often returns field errors as an object
      message = data.detail || JSON.stringify(data);
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  return await response.json();
}
