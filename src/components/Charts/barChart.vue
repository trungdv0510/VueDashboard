<template>
  <canvas id="bar-Chart" style="width: 100%; max-width: 700px"></canvas>
</template>
<script>
import { Chart } from "chart.js";
import {mapGetters} from "vuex";
export default {
  name: "bar-chart",
  props:{
    months:Array,
    data:Array
  },
  data(props) {
    return {
      dataChart: {
        type: "bar",
        data: {
          labels: props.months,
          datasets: [
            {
              backgroundColor: ["red", "green", "blue", "orange", "brown"],
              data: props.data,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Test case pass with months",
          },
        },
      },
    };
  },
  mounted() {
    const ctx = document.getElementById("bar-Chart");
    new Chart(ctx, this.dataChart);
  },
  computed:mapGetters(["testcasePassWithMonth"])
};
</script>
