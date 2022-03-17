<template>
      <div class="container-xxl">
           <SuiteReport/>
        </div>
        <div>
            <h3 class="text-center">REPORT DETAILS</h3>
            <br>
            <div class="report">
               <TestcaseReport/>
            </div>
        </div>
</template>
<script>
import SuiteReport from "@/components/Item/suiteReport.vue";
import TestcaseReport from "@/components/Item/testcaseReport.vue";
export default {
    // sử dụng props để lấy params
    props:['id'],
    name:"TestDetail",
    components:{
        SuiteReport,
        TestcaseReport
    },
    setup() {
        
    },
    /*data(){
        return{
            // lấy id từ url
            id:this.$route.params.id
        }
    }*/
}
</script>
<style>
.report{
    width: 95%;
    margin-left: 4%;
}
</style>