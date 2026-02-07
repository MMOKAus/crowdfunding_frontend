export function getToken() {
    return window.localStorage.getItem("token");
  }
  
  export function setToken(token) {
    window.localStorage.setItem("token", token);
  }
  
  export function clearToken() {
    window.localStorage.removeItem("token");
  }
  
  export function getUser() {
    const rawUser = window.localStorage.getItem("user");
    return rawUser ? JSON.parse(rawUser) : null;
  }
  
  export function setUser(user) {
    window.localStorage.setItem("user", JSON.stringify(user));
  }
  
  export function clearUser() {
    window.localStorage.removeItem("user");
  }
  