<template>
    <ReportNew titleName="Report automation list"
              :data="listTestSuite"/>
</template>

<script>
import ReportNew from "@/components/Item/reportNews.vue";
import {mapGetters} from "vuex";
export default {
 components: {
    ReportNew
  },
  computed:mapGetters(["listTestSuite"])
}
</script>

<style>

</style>