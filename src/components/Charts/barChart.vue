<template>
  <canvas id="bar-Chart" style="width: 100%; max-width: 700px"></canvas>
</template>
<script>
import { Chart } from "chart.js";
export default {
  name: "bar-chart",
  data() {
    return {
      dataChart: {
        type: "bar",
        data: {
          labels: ["Italy", "France", "Spain", "USA", "Argentina"],
          datasets: [
            {
              backgroundColor: ["red", "green", "blue", "orange", "brown"],
              data: [55, 49, 44, 24, 15],
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Test case pass in months",
          },
        },
      },
    };
  },
  mounted() {
    const ctx = document.getElementById("bar-Chart");
    new Chart(ctx, this.dataChart);
  },
};
</script>
