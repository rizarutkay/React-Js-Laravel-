class Auth {
    constructor() {
      this.authenticated = false; this.usertoken=localStorage.getItem('usertoken');
    }
  
    login(token,username,password,cb) { 
      this.authenticated = true; this.usertoken='Bearer '+token;
      localStorage.setItem('usertoken', this.usertoken);
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      cb();
    }
  
    logout() { 
      this.authenticated = false; localStorage.setItem('usertoken', null);
      window.location.href = "http://localhost:3000";
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new Auth();
  