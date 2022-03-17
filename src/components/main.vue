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
    HeaderLayout,
  },
};
</script>

<style>
.body {
  width: 100%;
  margin-top: 110px;
}
</style>
