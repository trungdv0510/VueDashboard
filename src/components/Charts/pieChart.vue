<template>
  <canvas id="pie-chart" style="width: 100%; max-width: 700px"></canvas>
</template>
<script>
import { Chart } from "chart.js";
import { watch } from "vue";
export default {
  name: "PieChart",
  props: {
    totalPass: Number,
    totalFail: Number
  },
  data(props) {
    console.log(props.totalPass);
    console.log(props.totalFail);
    let passData = props.totalPass;
    let failData = props.totalFail;
    watch(() => {
      passData = props.totalPass;
      failData = props.totalFail;
      console.log("Gía trị sau khi wacth " + passData);
      console.log("Gía trị sau khi wacth " + failData);
      //this._chart.destroy();
      this.pieChart(passData,failData);
    });
    return {
        passData,failData
    }
  },
  mounted() {
    const ctx = document.getElementById("pie-chart");
    new Chart(ctx, this.pieChart(this.passData,this.failData));
  },
  methods: {
    pieChart: function (passData,failData) {
      return {
        chartData: {
          type: "pie",
          data: {
            labels: ["Pass", "fail"],
            datasets: [
              {
                label: "case",
                backgroundColor: ["#3e95cd", "#8e5ea2"],
                data: [passData, failData],
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: "Test case report",
            },
          },
        },
      }
    }
  },
};
</script>
