<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <div class="choosePhoto logo"></div>
        </b-col>
      </b-row>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </b-container>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.choosePhoto {
  height: 20rem;
}

.logo {
  background-image: url("./assets/cover.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: center;
}
</style>
