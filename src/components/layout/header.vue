<template>
    <!-- header  -->
  <nav class="navbar navbar-expand-sm navbar-light menuItem" v-if="auth == true">
     <router-link to="/" class="navbar-brand ml-4 logo">
        <i class="fab fa-adn fa-2x"></i>
        <p class="float-right ml-2 mt-1">Automation <i>v1.0</i></p>
      </router-link>
    <!-- <a class="navbar-brand ml-4 logo" href="index.html">
      <i class="fab fa-adn fa-2x"></i>
      <p class="float-right ml-2 mt-1">Automation <i>v1.0</i></p>
    </a> -->
    <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
      aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation"></button>
    <div class="collapse navbar-collapse ml-5" id="collapsibleNavId">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0 ml-3">
        <div class="option navbar-nav mr-auto mt-2 mt-lg-0 itemNav">
          <li class="nav-item dropdown mr-5 items">
            <a class="nav-link dropdown" href="#" id="dropdownIds" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">User</a>
            <div class="dropdown-menu" aria-labelledby="dropdownIds">
              <a class="dropdown-item" href="#">Settings</a>
              <router-link class="dropdown-item" :to="{name:'create'}">Add user</router-link>
              <a class="dropdown-item" href="#" @click="logOut">Log out</a>
            </div>
          </li>

          <li class="nav-item dropdown items">
            <a class="nav-link dropdown" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">Report</a>
            <div class="dropdown-menu" aria-labelledby="dropdownId">
              <router-link :to="{name:'report'}" class="dropdown-item">Report automation</router-link>
              <a class="dropdown-item" href="#">API test case</a>
              <a class="dropdown-item" href="#">Statistical</a>
            </div>
          </li>

        </div>

      </ul>

      <form class="form-inline my-2 my-lg-0 ml-5 search">
        <div class="form-group">
          <label for="startdate" class="mr-2 text-white">Start date :</label>
          <input class="form-control mr-sm-2 " type="date" value="2018-07-22" id="startdate">
        </div>
        <div class="form-group">
          <label for="enddate" class="mr-2 text-white">End date :</label>
          <input class="form-control mr-sm-2 " type="date" value="2018-08-22" id="enddate">
        </div>
        <button class="btn btn-danger my-2 my-sm-0" type="submit">Search</button>
      </form>

    </div>
  </nav>
  <!-- end header -->
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name :'HeaderLayout',
    computed:mapGetters(["auth"]),
    setup() {
    },
    methods: {
      logOut(){
        localStorage.removeItem("user");
        this.$route.url("/login");
      }
    },
}
</script>
<style>
.menu.dropdowns {
    position: absolute;
}
.menu.dropdown.mb-4.item1 {
    position: absolute;
    top: 5%;
    left: 20%;
}
.chart{
    width: 100%;
    height: auto;
    margin-left: 8%;
}
.itemTest{
    margin-left: 8%; 
}
.menuItem li>a{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif!important;
    font-weight: bold!important;
    color: white!important;
}
.logo{
   padding-top: 1% !important;
}
.search{
    margin-right:3%!important;
}
.menuItem{
    position: fixed!important;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: #6c6e71;
}
</style>