<template>
  <div id="app">
    <b-container fluid class="header">
      <b-row>
        <b-col cols="12">
          <div class="chooseHero">
            <div class="chooseHero__content">
              <h1>IT幫幫忙 - 鐵人賽 30 天</h1>
              <p>自討苦吃</p>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="containerNavbar">
      <b-row>
        <b-col cols="12">
          <div class="containerNavbar__nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <!-- <router-view/> -->
  </div>
</template>

<style lang="scss" scope>
* {
  font-family: 微軟正黑體;
  box-sizing: border-box;
}

#app {
  h1,h2,h3,h4,h5,h6,p {
    margin: 0px;
  }

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container-fluid {
  background-color: #024e82;
  .row {
    padding-left: -15px;
    padding-right: -15px;
  }
  .chooseHero {
    position: relative;
    padding: 1rem;
    height: 300px;
    color: #ddd;

    & > .chooseHero__content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 3rem;
      border: solid 2px #ddd;
      border-radius: 5px;
    }
  }
}

.containerNavbar {
  background-color: #444;
  .containerNavbar__nav {
    padding: 30px;
    background-color: #444;
    a {
      font-weight: bold;
      color: #ccc;
    }
    a.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
