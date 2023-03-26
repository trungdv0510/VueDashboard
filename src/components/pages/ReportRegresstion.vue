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
                    <select name="sprintSelect" id="sprintSelect" class="form-control mr-2 " v-model="sprint">

                        <option v-for="item in this.listSprint" :key="item">{{item}}</option>

                    </select>
                </div>
                <button class="btn btn-info my-2 my-sm-0" type="button" @click="searchRegresstion()">Search</button>
            </form>
        </div>
    </div>
    <h2 class="text-center mb-4 text-uppercase">Report regresstion test</h2>
    <div class="row">
        <div class="chart">
            <div class="row">
                <div class="col-sm-4">
                    <pieChartVue :Pass="countPass" :Fail="countFail" />
                </div>
                <div class="col-sm-2"></div>
                <div class="col-sm-4 mt-3">
                    <ReportWeek title="Report regresstion test" :total="totalRegress" :pass="countPass"
                        :fail="countFail" :perPass="percentPassRegress" :perFail="percentFailRegress" />
                </div>
                <div class="col-sm-1"></div>
            </div>
        </div>
    </div>
    <div class="col-4">
        <button class="btn btn-outline-primary" @click="downloadReportAuto()"><i class="fa fa-download"
                aria-hidden="true"></i> Dowload report</button>
    </div>
    <DataTableVue titleName="Report regresstion test" :columns="columns" :dataColumns="dataColumns"
        :columnDefs="columnDefs" :dataObject="convertDataRegressToObject" />
    <!-- end body -->
</template>
<script>
import pieChartVue from "../Charts/PieChart.vue";
import { mapActions, mapGetters } from "vuex";
import { useStore } from 'vuex';
import ReportWeek from "@/components/Item/ReportWeek.vue";
import DataTableVue from "../Item/DataTable.vue";
import { isNullOrUndefined } from "@/utils/FunctionUtils.js";
// import notification from 'vue-notification-ui';
export default {
    name: "regresstionTest",
    components: {
        pieChartVue,
        ReportWeek,
        DataTableVue
    },
    data() {
        const store = useStore();
        store.dispatch('getSprint');
        //trungdv add search with start date and end date
        const startDate = this.startdate;
        const endDate = this.enddate;
        const sprintValue = this.sprint;
        const option = {
            startDate: startDate,
            endDate: endDate,
            sprint: sprintValue
        }
        // trungdv: check find testsuite with date or not
        store.dispatch('getRegressionByOption', option);
        // define column
        const columns = ["Test case name", "Evidence detail", "Sprint", "Author", "Date", "Result", "Reason"];
        //define data column 
        const dataColumns = [
            { data: "testcase" },
            { data: "evidence_link" },
            { data: "sprint" },
            { data: "author" },
            { data: "date" },
            { data: "result" },
            { data: "reason" },
        ]
        // define data render 
        const columnDefs =
            [
                {
                    "targets": 0,
                    "data": "testcase",
                    "render": function (data) {
                        return ` <a href="/report/` + data[1] + `" class="">` + data[0] + `</a>`;
                    }
                },
                {
                    "targets": 1,
                    "data": "evidence_link",
                    "render": function (data) {
                        return `<p> ` + data + `</p>`;
                    }
                },
                {
                    "targets": 2,
                    "data": "sprint",
                    "render": function (data) {
                        return `<p> ` + data + `</p>`;
                    }
                },
                {
                    "targets": 3,
                    "data": "author",
                    "render": function (data) {
                        return `<p> ` + data + `</p>`;
                    }
                },
                {
                    "targets": 4,
                    "data": "date",
                    "render": function (data) {
                        return `<p> ` + data + `</p>`;
                    }
                },
                {
                    "targets": 5,
                    "data": "result",
                    "render": function (data) {
                        if (data == "FAIL") {
                            return `<p class="btn btn-danger"> ` + data + `</p>`
                        }
                        else {
                            return `<p class="btn btn-success"> ` + data + `</p>`;
                        }
                    }
                },
                {
                    "targets": 6,
                    "data": "reason",
                    "render": function (data) {
                        return `<p> ` + data + `</p>`
                    }
                }
            ]
        return {
            columns,
            dataColumns,
            columnDefs,
            store
        }
    },
    computed: mapGetters(["countPass", "countFail", "percentPassRegress", "percentFailRegress", "listSprint", "totalRegress", "listRegressionData", "convertDataRegressToObject"]),
    methods: {
        ...mapActions(["getRegressionByOption", "downloadReport"]),
        searchRegresstion() {
            const option = {
                startDate: this.startDate,
                endDate: this.endDate,
                sprint: this.sprint
            }
            // trungdv: check find testsuite with date or not
            this.store.dispatch('getRegressionByOption', option);
        },
        downloadReportAuto() {
            let message = "";
            console.log(this.startDate);
            console.log(this.endDate);
            console.log(this.sprint);
            if (isNullOrUndefined(this.startDate)) {
                message += "start date, "
            }
            if (isNullOrUndefined(this.endDate)) {
              message += "end date, "
            }
            if (message == "") {
                const option = {
                    startTime: this.startDate,
                    endTime: this.endDate
                }
                this.store.dispatch("downloadReport", option);
            } else{
                message += "must selected to download report";
                alert(message);
            }

        },
    },
}
</script>
<style>
.searchForm {
    margin-left: 25%;
}
</style>
