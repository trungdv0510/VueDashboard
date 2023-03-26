<template>
  <!-- start body -->
  <div class="row">
    <div class="chart">
      <div class="row">
        <div class="col-sm-4">
          <PieChart :Pass="totalPass" :Fail="totalFail" />
        </div>
        <div class="col-sm-2"></div>
        <div class="col-sm-4 mt-3">
          <BarChart :months="this.getSprint" :data='this.getTotal' />
        </div>
        <div class="col-sm-1"></div>
      </div>
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-4">
          <ReportMoth />
        </div>
        <div class="col-sm-1"></div>
        <div class="col-sm-4">
          <ReportWeek title="Report test scripts all" :total="total" :pass="totalPass" :fail="totalFail"
                        :perPass="percentPass" :perFail="percentFail"/>
          <ReportWeek title="Report test case in week" />
        </div>
      </div>
    </div>
    <div class="itemTest">
      <div class="row">
        <div class="col-sm-11">
          <ReportNew titleName="Report automation newest" :data="getSixDataInList" />
        </div>
        <div class="col-sm-1"></div>
      </div>
    </div>
  </div>
  <!-- end body -->
</template>
<script>
import BarChart from "@/components/Charts/BarChart.vue";
import PieChart from "@/components/Charts/PieChart.vue";
import ReportMoth from "@/components/Item/ReportMonth.vue";
import ReportWeek from "@/components/Item/ReportWeek.vue";
import ReportNew from "@/components/Item/ReportNews.vue";
import { mapActions,mapGetters } from "vuex";
import { useStore } from 'vuex';
export default {
  name: "indexAdmin",
  components: {
    BarChart,
    PieChart,
    ReportMoth,
    ReportWeek,
    ReportNew
  },
  data() {
    const store = useStore();
    store.dispatch('getAllTestSuite');
    store.dispatch('getTestcaseWithSprint');
  },
  computed: mapGetters(["totalPass","totalFail","getSixDataInList","percentPass","percentFail","total","getSprint","getTotal"]),
  methods: {
    ...mapActions(["getAllTestSuite"]),
  },
};
</script>
<style>
.borderItems {
  padding-bottom: 10px;
  border-bottom: 2px solid gray;
}
.itemTest {
  width: 85%;
}
</style>
