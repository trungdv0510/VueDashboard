<template>
  <!-- start body -->
  <div class="row">
    <div class="chart">
      <div class="row">
        <div class="col-sm-4">
          <PieChart />
        </div>
        <div class="col-sm-2"></div>
        <div class="col-sm-4 mt-3">
          <BarChart/>
        </div>
        <div class="col-sm-1"></div>
      </div>
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-4">
         <ReportMoth/>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-sm-4">
          <ReportWeek title="Report test scripts in week"/>
          <ReportWeek title="Report test case in week"/>
        </div>
      </div>
    </div>
    <div class="itemTest">
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-10">
          <ReportNew titleName="Report automation newest"/>
        </div>
        <div class="col-sm-1"></div>
      </div>
    </div>
  </div>
  <!-- end body -->
</template>
<script>
import BarChart from "@/components/Charts/barChart.vue";
import PieChart from "@/components/Charts/pieChart.vue";
import ReportMoth from "@/components/Item/reportMonth.vue";
import ReportWeek from "@/components/Item/reportWeek.vue";
import ReportNew from "@/components/Item/reportNews.vue";
export default {
  name: "indexAdmin",
  components: {
    BarChart,
    PieChart,
    ReportMoth,
    ReportWeek,
    ReportNew
  },
};
</script>
<style>
.borderItems {
  padding-bottom: 10px;
  border-bottom: 2px solid gray;
}
</style>