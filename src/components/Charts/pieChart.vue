<template>
  <canvas id="pie-chart" style="width: 100%; max-width: 700px"></canvas>
</template>
<script>
import { Chart } from "chart.js";
import { watch } from "vue";

export default {
  name: "PieChart",
  props: {
    PassFail: Array,
  },
  data(props) {
    let passFail = props.PassFail;
    watch(() => {
      passFail = props.PassFail;
    });
    return {
      passFail 
    }
  },
  mounted() { 
    this.pieChart(this.passFail);
  },
  watch:{
    'PassFail':{
      deep:true,
      handler:function(newData){
        this.pieChart(newData)
      }
    }
      
  },
  methods: {
    pieChart: (passFail) => {
      const ctx = document.getElementById("pie-chart");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Pass", "fail"],
          datasets: [
            {
              label: "case",
              backgroundColor: ["#3e95cd", "#8e5ea2"],
              data: passFail,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Test case report",
          },
        },
      });
    },
  },
};
</script>
