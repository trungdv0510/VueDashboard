<template>
  <canvas id="bar-Chart" style="width: 100%; max-width: 700px"></canvas>
</template>
<script>
import { Chart } from "chart.js";
import { randomColors } from '@/utils/FunctionUtils.js'
export default {
  name: "bar-chart",
  props: {
    months: Array,
    data: Array
  },
  data(props) {
    let sprint = props.months;
    let dataChart = props.data;
    return {
      sprint,
      dataChart
    };
  },
  mounted() {
    this.barChart(this.sprint, this.dataChart);
    if ((this.sprint == null && this.dataChart == null) || (this.sprint == undefined && this.dataChart == undefined)) {
      setTimeout(() => {
        this.barChart(this.sprint, this.dataChart);
      }, 1000);
    }
  },
  watch: {
    months: function (newValue) {
      this.sprint = newValue;
      this.colorSprint = this.random(this.sprint);
      this.barChart(this.sprint, this.dataChart);
    },
    data: function (newValue) {
      this.dataChart = newValue;
      this.colorSprint = this.random(this.dataChart);
      this.barChart(this.sprint, this.dataChart);
    }

  },
  methods: {
    barChart: (sprint, data) => {
      let colorSprint = [];
      for(let i=0;i<sprint.length;i++){
        colorSprint.push(randomColors());
      }
      const ctx = document.getElementById("bar-Chart");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: sprint,
          datasets: [
            {
              backgroundColor: colorSprint,
              data: data,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Test case pass with sprint",
          },
        },
      });
    },
    random: (dataLenght) => {
      let colorSprint = [];
      for (let i = 0; i < dataLenght; i++) {
        colorSprint.push(randomColors());
      }
      return colorSprint;
    }
  }
};
</script>
