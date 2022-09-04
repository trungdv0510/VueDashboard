<template>
  <canvas id="pie-chart" style="width: 100%; max-width: 700px"></canvas>
</template>
<script>
import { Chart } from "chart.js";
//import { watch } from "vue";
export default {
  name: "PieChart",
  props: {
    Pass: Number,
    Fail: Number,
  },
  data(props) {
    let pass = props.Pass;
    let fail = props.Fail;

    return {
      pass,
      fail
    }
  },
  mounted() {
    this.pieChart(this.pass, this.fail);
    if (this.pass == 0 && this.fail == 0) {
        setTimeout(()=>{
          this.pieChart(this.pass, this.fail);
        }, 1000);
    }

  },
  watch: {
    Pass: function (newValue) {
      this.pass = newValue;
    },
    Fail: function (newValue) {
      this.fail = newValue
    }

  },
  methods: {
    pieChart: (pass, fail) => {
      const ctx = document.getElementById("pie-chart");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Pass", "fail"],
          datasets: [
            {
              label: "case",
              backgroundColor: ["#3e95cd", "#8e5ea2"],
              data: [pass, fail],
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
