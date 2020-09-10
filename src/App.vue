<template>
  <div id="app">
    <b-container fluid class="hero">
      <b-row>
        <b-col cols="12">
          <div class="hero--chooseHero">
            <div class="hero--chooseHero__content">
              <h1>IT幫幫忙 - 鐵人賽 30 天</h1>
              <p>自討苦吃</p>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <b-navbar type="dark" variant="dark">

      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About Me</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>

    <router-view/>
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
  color: #2c3e50;
}

.container-fluid.hero {
  background-color: #024e82;
  .row {
    padding-left: -15px;
    padding-right: -15px;
  }
  .hero--chooseHero {
    position: relative;
    padding: 1rem;
    height: 300px;
    color: #ddd;

    & > .hero--chooseHero__content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 3rem;
      border: solid 2px #ddd;
      border-radius: 5px;
      text-align: center;

      & > h1,p {
        user-select: none;
      }
    }
  }
}

nav {
  &.navbar { padding: 1rem; }
  .nav-item {
    a {
      font-weight: bold;
      color: #ccc;
      user-select: none;
    }
    a.router-link-exact-active {
      color: #42b983 !important;
    }
  }
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
