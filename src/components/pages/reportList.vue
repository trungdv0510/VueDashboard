<template>
    <ReportNew titleName="Report automation list"
              :data="listTestSuite"/>
</template>

<script>
import ReportNew from "@/components/Item/reportNews.vue";
import {mapGetters,useStore} from "vuex";
//import {onMounted } from "vue";
export default {
 components: {
    ReportNew
  },
  setup() {
      const store = useStore();
      store.dispatch('getAllTestSuite');
  },
  computed:mapGetters(["listTestSuite"]),
  methods: {
    getData(){
         const store = useStore();
        setInterval(() => {
          store.dispatch('getAllTestSuite');
        }, 3000);
    }
  },
}
</script>

<style>

</style>