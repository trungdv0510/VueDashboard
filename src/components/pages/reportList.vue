<template>
  <!-- <ReportNew titleName="Report automation list" :data="listTestSuite" /> -->
  <DataTableVue titleName="Report automation list" 
                :columns="columns"
                :dataColumns="dataColumns"
                :columnDefs="columnDefs"
                :dataObject="convertDataToObject"
               />
</template>

<script>
//import ReportNew from "@/components/Item/reportNews.vue";
import { mapGetters,useStore } from "vuex";
import DataTableVue from "../Item/DataTable.vue";
import {onMounted } from "vue";
export default {
  components: {
    //ReportNew,
    DataTableVue
  },
  setup() {
    const store = useStore();
    store.dispatch('getAllTestSuite');
    onMounted(() => {
      setInterval(() => {
        store.dispatch('getAllTestSuite');
      }, 3000);
    });
  },
  data() {
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
            return ` <a href="/report/`+data[1]+`" class="">`+data[0]+`</a>`;
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
            if(data == "FAIL"){
              return   `<p class="btn btn-danger"> `+data+`</p>`
            }
            else{
               return `<p class="btn btn-success"> `+data+`</p>`;
            }
           
          }
        }
      ]
    return {
      columns,
      dataColumns,
      columnDefs
    }
  },
  computed: mapGetters(["listTestSuite","convertDataToObject"]),
  methods: {
  
  },
}
</script>

<style>
</style>