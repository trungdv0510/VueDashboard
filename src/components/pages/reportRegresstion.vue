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
                        <option value="">---SELECT SPRINT ----</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
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
                    <pieChartVue :Pass="totalPass" :Fail="totalFail" />
                </div>
                <div class="col-sm-2"></div>
                <div class="col-sm-4 mt-3">
                    <ReportWeek title="Report regresstion test" :total="total" :pass="countPass" :fail="countFail"
                        :perPass="percentPass" :perFail="percentFail" />
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
        :columnDefs="columnDefs" :dataObject="listRegressionData" /> -->
    <!-- end body -->
</template>
<script>
import pieChartVue from "../Charts/pieChart.vue";
import { mapActions, mapGetters } from "vuex";
import { useStore } from 'vuex';
import ReportWeek from "@/components/Item/reportWeek.vue";
export default {
    name: "regresstionTest",
    components: {
        pieChartVue,
        ReportWeek
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
        store.dispatch('getRegressionByOption',option);
        // define column
        const columns = ["Test case name", "Sprint", "Date", "Result", "Reason"];
        //define data column 
        const dataColumns = [
            { data: "testcase" },
            { data: "sprint" },
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
                    "data": "sprint",
                    "render": function (data) {
                        return `<p> ` + data + `</p>`;
                    }
                },
                {
                    "targets": 2,
                    "data": "date",
                    "render": function (data) {
                        return `<p> ` + data + `</p>`;
                    }
                },
                {
                    "targets": 3,
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
                    "targets": 4,
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
    computed: mapGetters(["countPass", "countFail","percentPass","percentFail","listSprint","total","listRegressionData"]),
    methods: {
        ...mapActions(["getRegressionByOption"]),
        searchRegresstion(){
            const option = {
                startDate: this.startdate,
                endDate: this.enddate,
                sprint: this.sprint
            }
            // trungdv: check find testsuite with date or not
            this.store.dispatch('getRegressionByOption', option);
        }
    },
}
</script>
<style>
.searchForm {
    margin-left: 25%;
}
</style>