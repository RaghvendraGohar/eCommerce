<template>
    <div class="product-list">
      <h1>Product List</h1>
      <input class="search-box" type="text" placeholder="Search" @input="searchHandle" v-model="searchTerm" />
      
      <div class="table-wrapper">
        <ul class="table-header">
          <li>S.No</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
          <li>Operation</li>
        </ul>
        <div v-if="products.length">
          <ul v-for="(item, index) in products" :key="item._id" class="table-row">
            <li>{{ index + 1 }}</li>
            <li>{{ item.name }}</li>
            <li>{{ item.price }}</li>
            <li>{{ item.category }}</li>
            <li>{{ item.company }}</li>
            <li>
              <button @click="deleteProduct(item._id)" class="btn-delete">Delete</button>
              <nuxt-link :to="`/update/${item._id}`" class="btn-update">Update</nuxt-link>
            </li>
          </ul>
        </div>
        <p v-else class="no-result">No Result Found</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [],
        searchTerm: "",
      };
    },
    mounted() {
      this.getProducts();
    },
    methods: {
      async getProducts() {
        let result = await fetch("https://backend-ecomnuxt.onrender.com/products", {
          headers: {
            authorization: `${JSON.parse(localStorage.getItem('token'))}`,
          },
        });
        this.products = await result.json();
      },
      async deleteProduct(id) {
        let result = await fetch(`https://backend-ecomnuxt.onrender.com/product/${id}`, {
          method: "delete",
          headers: {
            authorization: `${JSON.parse(localStorage.getItem('token'))}`,
          },
        });
        if (await result.json()) {
          alert("Record deleted");
          this.getProducts();
        }
      },
      async searchHandle() {
        if (this.searchTerm) {
          let result = await fetch(`https://backend-ecomnuxt.onrender.com/search/${this.searchTerm}`, {
            headers: {
              authorization: `${JSON.parse(localStorage.getItem('token'))}`,
            },
          });
          this.products = await result.json();
        } else {
          this.getProducts();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .product-list {
    padding: 20px;
  }
  
  .search-box {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .table-wrapper {
    overflow-x: auto;
  }
  
  .table-header, .table-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  
  .table-header {
    font-weight: bold;
  }
  
  .btn-delete {
    color: #f44336;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .btn-update {
    margin-left: 10px;
    color: #2196F3;
    text-decoration: underline;
    cursor: pointer;
  }
  
  .no-result {
    color: red;
    font-size: 18px;
  }
  </style>
  