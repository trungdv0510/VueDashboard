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
          <BarChart :months="['1', '2', '3', '4', '5']" :data='[551, 492, 494, 414, 635]' />
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
          <ReportWeek title="Report test scripts in week" />
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
import BarChart from "@/components/Charts/barChart.vue";
import PieChart from "@/components/Charts/pieChart.vue";
import ReportMoth from "@/components/Item/reportMonth.vue";
import ReportWeek from "@/components/Item/reportWeek.vue";
import ReportNew from "@/components/Item/reportNews.vue";
import { mapActions,mapGetters } from "vuex";
import { useStore } from 'vuex';
import { onMounted } from "vue";
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
    onMounted(() => {
      setInterval(() => {
        store.dispatch('getAllTestSuite');
      }, 3000);
    });
  },
  computed: mapGetters(["totalPass","totalFail","getSixDataInList"]),
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