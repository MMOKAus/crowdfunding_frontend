import { getToken } from "../utilities/auth";

const API_URL = import.meta.env.VITE_API_URL;

export default async function deleteFundraiser(fundraiserId) {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in to delete a fundraiser.");
  }

  const response = await fetch(`${API_URL}/fundraisers/${fundraiserId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (response.status === 403) {
    throw new Error("You are not authorised to delete this fundraiser.");
  }

  if (!response.ok) {
    throw new Error("Failed to delete fundraiser.");
  }

  // DRF usually returns 204 No Content for DELETE
  return true;
}
