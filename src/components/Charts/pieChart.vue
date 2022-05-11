<template>
  <canvas id="pie-chart" style="width: 100%; max-width: 700px"></canvas>
</template>
<script>
import {mapGetters} from "vuex";
import { Chart } from "chart.js";
export default {
  name: "PieChart",
  data: () => {
    return {
      chartData: {
        type: "pie",
        data: {
          labels: ["Pass", "fail"],
          datasets: [
            {
              label: "case",
              backgroundColor: ["#3e95cd", "#8e5ea2"],
              data: [782, 377],
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
    };
  },
  mounted() {
    const ctx = document.getElementById("pie-chart");
    new Chart(ctx, this.chartData);
  },
  computed:mapGetters(["totalPass","totalFail"])
};
</script>
