<template>
    <div class="add-product">
      <h1>Add Product</h1>
      <input type="text" placeholder="Enter product name" class="input-box" v-model="name" />
      <span v-if="error && !name" class="invalid-input">Enter valid name!</span>
  
      <input type="text" placeholder="Enter product price" class="input-box" v-model="price" />
      <span v-if="error && !price" class="invalid-input">Enter valid price!</span>
  
      <input type="text" placeholder="Enter product category" class="input-box" v-model="category" />
      <span v-if="error && !category" class="invalid-input">Enter valid category!</span>
  
      <input type="text" placeholder="Enter product company" class="input-box" v-model="company" />
      <span v-if="error && !company" class="invalid-input">Enter valid company!</span>
  
      <button @click="addProduct" class="app-button">Add Product</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        price: '',
        category: '',
        company: '',
        error: false
      };
    },
    middleware: 'auth',
    methods: {
        async addProduct() {
    if (!this.name || !this.price || !this.category || !this.company) {
        this.error = true;
        return;
    }
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const token = JSON.parse(localStorage.getItem('token')); 
    let result = await fetch("https://backend-ecomnuxt.onrender.com/add-product", {
        method: 'POST',
        body: JSON.stringify({ 
            name: this.name, 
            price: this.price, 
            category: this.category, 
            company: this.company, 
            userId 
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token 
        }
    });

    result = await result.json();
    if (!result.error) {
        this.$router.push('/'); 
    } else {
        this.error = true; 
    }
}

    }
  };
  </script>
  
  <style scoped>
  .add-product {
    padding: 20px;
  }
  
  .input-box {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .invalid-input {
    color: red;
    font-size: 14px;
  }
  
  .app-button {
    padding: 10px 20px;
    background-color: #0366d6;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .app-button:hover {
    background-color: #024fa1;
  }
  </style>
  