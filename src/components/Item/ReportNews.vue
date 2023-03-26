<template>
  <div style="width:100%">
    <h3 class="borderItems mt-5">{{ titleName }}</h3>
    <table class="table  tableResult ">
      <thead class="thead-inverse">
        <tr>
          <th>#</th>
          <th>Test case name</th>
          <th>Percentage</th>
          <th>Run time</th>
          <th>Date</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in report" :key="item.id">
          <td scope="row">{{ index + 1 }}</td>
          <td>
            <router-link :to="{ name: 'reportDetail', params: { id: item.uuid } }">
              {{ item.suiteName }}
            </router-link>
          </td>
          <td>
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar"
                :style="{ 'width': getPassPercentage(item.testcasePass, item.testcaseFail) + '%' }"
                :aria-valuenow="{ 'width': getPassPercentage(item.testcasePass, item.testcaseFail) }" aria-valuemin="0"
                aria-valuemax="100">{{ item.testcasePass }}</div>
              <div class="progress-bar bg-danger" role="progressbar"
                :style="{ 'width': getPassPercentage(item.testcaseFail, item.testcasePass) + '%' }"
                :aria-valuenow="{ 'width': getPassPercentage(item.testcasePass, item.testcaseFail) }" aria-valuemin="0"
                aria-valuemax="100"> {{ item.testcaseFail }}</div>
            </div>
          </td>
          <td scope="row">{{ millisToMinutesAndSeconds(item.runTime) }} s</td>
          <td>
            <p>{{ item.dateRun }}</p>
          </td>
          <td>
            <p :class="item.result == 'PASS' ? 'btn btn-success' : 'btn btn-danger'">{{ item.result }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { passPercentage, millisToMinutesAndSeconds } from '@/utils/FunctionUtils.js'
export default {
  props: {
    titleName: String,
    data: Array
  },
  data(props) {
    let report = props.data;
    return {
      report
    }
  },
  watch: {
    data: function (newData) {
      this.report = newData;
    },
  },
  methods: {
    getPassPercentage(totalPass, totalFail) {
      return passPercentage(totalPass, totalFail);
    },

    millisToMinutesAndSeconds(duration) {
      return millisToMinutesAndSeconds(duration);
    }
  }

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
