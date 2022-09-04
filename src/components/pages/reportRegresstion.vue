<template>
    <!-- start body -->
    <div class="row mb-4">
        <div class="justify-content-center searchForm">
            <form class="form-inline my-2 my-lg-0 ml-5 searchItem">
                <div class="form-group">
                    <label for="startdate" class="mr-2 text-black">Start date :</label>
                    <input class="form-control mr-sm-2 " type="date" v-model="startDate" id="startdate">
                </div>
                <div class="form-group">
                    <label for="enddate" class="mr-2 text-black">End date :</label>
                    <input class="form-control mr-sm-2 " type="date" v-model="endDate" id="enddate">
                </div>
                <div class="form-group">
                    <label for="sprints" class="mr-2 text-black">Sprints :</label>
                    <select name="sprintSelect" id="123" class="form-control mr-2 ">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button class="btn btn-info my-2 my-sm-0" type="button" @click="getDate()">Search</button>
            </form>
        </div>
    </div>
    <h2 class="text-center mb-4 text-uppercase">Report regresstion test</h2>
    <div class="row">
        <div class="chart">
            <div class="row">
                <div class="col-sm-4">
                    <pieChartVue :Pass="totalPass" :Fail="totalFail" />
                </div>
                <div class="col-sm-2"></div>
                <div class="col-sm-4 mt-3">
                    <ReportWeek title="Report regresstion test" />
                </div>
                <div class="col-sm-1"></div>
            </div>
        </div>
    </div>
    <div class="col-4">
        <button class="btn btn-outline-primary"><i class="fa fa-download" aria-hidden="true"></i> Dowload
            report</button>
    </div>
    <!-- <DataTableVue titleName="Report regresstion test" :columns="columns" :dataColumns="dataColumns"
        :columnDefs="columnDefs" :dataObject="convertDataToObject" /> -->
    <!-- end body -->
</template>
<script>
import pieChartVue from "../Charts/pieChart.vue";
import { mapActions, mapGetters } from "vuex";
import { useStore } from 'vuex';
//import DataTableVue from "../Item/DataTable.vue";
import ReportWeek from "@/components/Item/reportWeek.vue";
export default {
    name: "regresstionTest",
    components: {
        pieChartVue,
        //DataTableVue,
        ReportWeek
    },
    data() {
        const store = useStore();
        store.dispatch('getAllTestSuite');
        //trungdv add search with start date and end date
        const startdate = this.$route.params.startdate;
        const endDate = this.$route.params.enddate;
        // trungdv: check find testsuite with date or not
        if (startdate && endDate) {
            let urlApi = `/user/testsuites/findbydate?startdate=${startdate}&enddate=${endDate}`
            this.findTestSuiteWithDate(urlApi);
        }
        else {
            store.dispatch('getAllTestSuite');
        }
        // define column
        const columns = ["Test case name", "Report detail", "Sprint", "Date", "Result", "Reason"];
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
    computed: mapGetters(["totalPass", "totalFail"]),
    methods: {
        ...mapActions(["getAllTestSuite"]),
    },
}
</script>
<style>
.searchForm {
    margin-left: 25%;
}
</style>