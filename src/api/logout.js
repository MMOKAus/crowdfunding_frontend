function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
  }
  
  export default logout;
  