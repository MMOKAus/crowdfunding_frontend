async function postSignup(username, password) {
    // Common DRF pattern: create user endpoint
    // If your backend uses a different path, change this line only.
    const url = `${import.meta.env.VITE_API_URL}/users/`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
  
    if (!response.ok) {
      const fallbackError = "Error trying to sign up";
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      // Different backends return different shapes for signup errors:
      // - DRF serializers often return { username: ["..."], password: ["..."] }
      // - Some return { detail: "..." }
      // So we try detail first, otherwise stringify something readable.
      const errorMessage =
        data?.detail ??
        (typeof data === "string"
          ? data
          : Object.values(data || {})
              .flat()
              .join(" ")) ??
        fallbackError;
  
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postSignup;
  