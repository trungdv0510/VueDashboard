<template>
  <img src="/img/404Error.png" class="bg" alt="" srcset="" />
  <div class="text-center">
      <router-link :to="{name:'index'}" class="btn btn-secondary"> <i class="fas fa-angle-double-left"></i> Back to home page</router-link> <br>
       <button class="btn btn-primary mt-3" @click="previous"> <i class="fas fa-angle-double-left"></i> Back to previous page</button>
  </div>
</template>

<script>
export default {
    methods:{
        previous(){
            this.$router.go(-1)
        }
    }
};
</script>
<style>
.bg {
  width: 36%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>