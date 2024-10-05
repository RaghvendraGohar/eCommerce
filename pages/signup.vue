<template>
    <div class="register">
      <h1>Register</h1>
      <input type="text" class="inputBox" placeholder="Enter Name" v-model="name" />
      <input type="text" class="inputBox" placeholder="Enter Email" v-model="email" />
      <input type="password" class="inputBox" placeholder="Enter Password" v-model="password" />
      <button @click="handleSignUp" class="appbutton">Sign Up</button>
      <button @click="redirectToLogin" class="loginButton">Already have an account? Login</button> <!-- New Login Button -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: ''
      };
    },
    middleware: 'auth', 
    mounted() {
      const auth = localStorage.getItem('user');
      if (auth) {
        this.$router.push('/');
      }
    },
    methods: {
      async handleSignUp() {
        const response = await fetch('https://backend-ecomnuxt.onrender.com/register', {
          method: 'POST',
          body: JSON.stringify({ name: this.name, email: this.email, password: this.password }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        console.warn(result);
  
        if (result) {
          localStorage.setItem("user", JSON.stringify(result.result));
          localStorage.setItem("token", JSON.stringify(result.auth));
          this.$router.push('/'); 
        }
      },
      redirectToLogin() {
        this.$router.push('/login'); 
      }
    }
  };
  </script>
  
  <style scoped>
  .register {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .inputBox {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .inputBox:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .appbutton {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .appbutton:hover {
    background-color: #0056b3;
  }
  
  .loginButton {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 4px;
    background-color: #28a745;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px; 
  }
  
  .loginButton:hover {
    background-color: #218838;
  }
  </style>
  