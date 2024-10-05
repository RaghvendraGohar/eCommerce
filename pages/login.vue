<template>
    <div class="login">
      <h1>LogIn</h1>
      <input type="text" class="inputBox" placeholder="Enter email" v-model="email" />
      <input type="password" class="inputBox" placeholder="Enter password" v-model="password" />
      <button @click="handleLogin" class="appbutton">LogIn</button>
    </div>
  </template>
  
  <script>
  export default {
     middleware: 'auth',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async handleLogin() {
        let result = await fetch('https://backend-ecomnuxt.onrender.com/login', {
          method: 'POST',
          body: JSON.stringify({ email: this.email, password: this.password }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        result = await result.json();
        if (result.auth) {
          localStorage.setItem("user", JSON.stringify(result.user));
          localStorage.setItem("token", JSON.stringify(result.auth));
          this.$router.push('/');
        } else {
          alert("Please enter correct details.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
 .login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: auto;
}

h1 {
  font-family: 'Orbitron', sans-serif; 
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

.inputBox {
  width: 100%;
  padding: 12px 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.inputBox:focus {
  border-color: #007bff; 
  outline: none;
}

.appbutton {
  width: 100%;
  padding: 12px 15px;
  background-color: #007bff; 
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.appbutton:hover {
  background-color: #0056b3; 
}

.appbutton:disabled {
  background-color: #cccccc; 
  cursor: not-allowed;
}

  </style>
  