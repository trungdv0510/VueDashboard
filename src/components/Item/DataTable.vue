<template>
    <div style="width:100%">
        <h3 class="borderItems mt-5 mb-4">{{ titleName }}</h3>
        <table class="table  tableResult " id="reportTable">
            <thead class="thead-inverse">
                <tr>
                    <th v-for="(item, index) in columns" :key="index">{{ item }}</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</template>

<script>
import $ from "jquery";
export default {
    props: {
        titleName: String,
        columns: Array,
        dataColumns: Array,
        columnDefs: Array,
        dataObject: Array
    },
    data(props) {
        let listObject = props.dataObject;
        let columnRender = props.dataColumns;
        let defineColumn = props.columnDefs;
        return { listObject, columnRender,defineColumn};
    },
    watch: {
        dataObject: function (newData) {
            this.listObject = newData;
            this.getAll(this.columnRender, this.listObject, this.defineColumn);
        },
    },
    methods: {
        getAll(dataColumns, dataObject, columnDefs) {
            $("#reportTable").DataTable({
                destroy: true,
                dom: "Bfrtip",
                buttons: ["colvis", "excel", "print", "csv"],
                data: JSON.parse(JSON.stringify(dataObject)),
                columns: dataColumns,
                columnDefs: columnDefs
            });
        }
    },
    mounted() {
        this.getAll(this.columnRender, this.listObject, this.defineColumn);   
    },

}
</script>

<style>
span.sr-only {
    position: initial;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
</style>