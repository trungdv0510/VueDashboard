<template>
      <div class="container-xxl">
           <SuiteReport :testSuite="this.testSuite"/>
        </div>
        <div>
            <h3 class="text-center">REPORT DETAILS</h3>
            <br>
            <div class="report">
               <TestcaseReport :testCase="this.testcaseWithTestSuiteUUID"
                                :testLog="this.testlogWithTestcaseUUID"/>
            </div>
        </div>
</template>
<script>
import SuiteReport from "@/components/Item/suiteReport.vue";
import TestcaseReport from "@/components/Item/testcaseReport.vue";
import { mapActions,useStore } from "vuex";
import {computed} from 'vue';
export default {
    name:"TestDetail",
    components:{
        SuiteReport,
        TestcaseReport
    },
    data(){
        const id = this.$route.params.id;
        const store = useStore();
        store.dispatch("findOneByUUID",id);
        const testSuite = computed(() => store.getters.testSuiteDetails);
        const testcaseWithTestSuiteUUID = computed(() => store.getters.testcaseWithTestSuiteUUID);
        const testlogWithTestcaseUUID = computed(() => store.getters.testlogWithTestcaseUUID);
        console.log("Gía trị test log tìm được là ");
        console.log(testcaseWithTestSuiteUUID);
        console.log("Gía trị test case tìm được là ");
        console.log(testlogWithTestcaseUUID);
        return{
           id,
           testSuite,
           testcaseWithTestSuiteUUID,
           testlogWithTestcaseUUID
        }
    },
  
    methods: {
      ...mapActions(["findOneByUUID"]), 
    },
}
</script>
<style>
.report{
    width: 95%;
    margin-left: 4%;
}
</style>