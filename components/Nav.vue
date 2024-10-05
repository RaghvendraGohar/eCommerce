<template>
  <nav class="nav-bar">
    <img
      class="logo"
      src="https://www.boardinfinity.com/blog/content/images/2023/01/Mern.png"
      alt="E-Com Dash Logo"
    />
    <ul class="nav-links">
      <li v-if="auth"><nuxt-link to="/">Product</nuxt-link></li>
      <li v-if="auth"><nuxt-link to="/add">Add Product</nuxt-link></li>
      <li v-if="auth"><a @click="logout">Logout ({{ auth.name }})</a></li>
      <li v-else><nuxt-link to="/signup">Sign Up</nuxt-link></li>
      <li v-else><nuxt-link to="/login">Log In</nuxt-link></li> 
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      auth: null 
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Auth User:", user); 
    this.auth = user; 
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/signup");
    }
  }
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #24292e;
}

.logo {
  height: 40px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background-color: #0366d6;
  border-radius: 5px;
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
