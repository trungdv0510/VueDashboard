<template>
  <!-- <ReportNew titleName="Report automation list" :data="listTestSuite" /> -->
  <DataTableVue titleName="Report automation list" :columns="columns" :dataColumns="dataColumns"
    :columnDefs="columnDefs" :dataObject="convertDataToObject" />
</template>

<script>
import { mapGetters, useStore, mapActions } from "vuex";
import DataTableVue from "../Item/DataTable.vue";
export default {
  components: {
    DataTableVue
  },

  data() {
    //trungdv add search with start date and end date
    const startdate = this.$route.params.startdate;
    const endDate = this.$route.params.enddate;
    const store = useStore();
    // trungdv: check find testsuite with date or not
    if (startdate && endDate) {
      let urlApi = `/user/testsuites/findbydate?startdate=${startdate}&enddate=${endDate}`
      this.findTestSuiteWithDate(urlApi);
    }
    else {
      store.dispatch('getAllTestSuite');
    }
    // define column
    const columns = ["Test case name", "Percentage", "Run time", "Date", "Result"];
    //define data column 
    const dataColumns = [
      { data: "suiteName" },
      { data: "percentage" },
      { data: "runTime" },
      { data: "dateRun" },
      { data: "result" },
    ]
    // define data render 
    const columnDefs =
      [
        {
          "targets": 0,
          "data": "suiteName",
          "render": function (data) {
            return ` <a href="/report/` + data[1] + `" class="">` + data[0] + `</a>`;
          }
        },
        {
          "targets": 1,
          "data": "percentage",
          "render": function (data) {
            return `<div class="progress">
                            <div class="progress-bar bg-success" role="progressbar"
                                style="width: `+ data[2] + `%"
                                aria-valuenow="width:`+ data[2] + `"
                                aria-valuemin="0" aria-valuemax="100">`+ data[0] + `</div>
                            <div class="progress-bar bg-danger" role="progressbar"
                                style="width: `+ data[3] + `%"
                                aria-valuenow="width: `+ data[3] + `"
                                aria-valuemin="0" aria-valuemax="100">`+ data[1] + `</div>
                        </div>`;
          }
        },
        {
          "targets": 4,
          "data": "result",
          "render": function (data) {
            if (data == "FAIL") {
              return `<p class="btn btn-danger"> ` + data + `</p>`
            }
            else {
              return `<p class="btn btn-success"> ` + data + `</p>`;
            }
          }
        }
      ]
    return {
      columns,
      dataColumns,
      columnDefs,
      startdate,
      endDate
    }
  },
  computed: mapGetters(["listTestSuite", "convertDataToObject"]),
  methods: {
    ...mapActions(["findTestSuiteWithDate"])
  },
}
</script>

<style>
</style>