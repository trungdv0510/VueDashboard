<template>
  <HeaderLayout />
  <div class="body">
    <router-view/>
  </div>
  <!-- <LoginVue /> -->
</template>

<script>
import HeaderLayout from "./layout/header.vue";

export default {
  name: "MainAdmin",
  components: {
    HeaderLayout
  }
};
</script>

<style>
.body {
  margin-left: 8%;
  width: 90%;
  margin-top: 110px;
}
</style>
