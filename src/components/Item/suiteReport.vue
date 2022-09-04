<template>
  <div class="container">
    <table class="table table-bordered testsuit1">
      <tbody>
        <tr>
          <th scope="row" rowspan="3" class="text-secondary testSuiteName">
            <div>
              <p class="text-left"><b>Automation Report:</b></p>
              <p class="text-dark text-center">
                {{ testSuite.suiteName }}
              </p>
            </div>
          </th>
          <td style="background-color: gray" class="text-light">
            <i>Date run:</i> <br>{{ dateTime(testSuite.createDate) }}
          </td>
          <td class="text-light" :class="testSuite.result === 'PASS' ? 'btn-success' : 'btn-danger'">
            <i> Result :</i> <br>
            {{ testSuite.result }}
          </td>
        </tr>
        <tr style="background-color: gray" class="text-light">
          <td><i>Time durations:</i> <br>{{ millisToMinutesAndSeconds(testSuite.runTime) }} <i>s</i></td>
          <td><i>IP address:</i> <br>{{ testSuite.ipName }}</td>
        </tr>
        <tr style="background-color: gray" class="text-light">
          <td>
            <i> Percentage :</i> <br>
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar"
                :style="{ 'width': getPassPercentage(testSuite.testcasePass, testSuite.testcaseFail) + '%' }"
                :aria-valuenow="{ 'width': getPassPercentage(testSuite.testcasePass, testSuite.testcaseFail) }"
                aria-valuemin="0" aria-valuemax="100">{{ testSuite.testcasePass }}</div>
              <div class="progress-bar bg-danger" role="progressbar"
                :style="{ 'width': getPassPercentage(testSuite.testcaseFail, testSuite.testcasePass) + '%' }"
                :aria-valuenow="{ 'width': getPassPercentage(testSuite.testcasePass, testSuite.testcaseFail) }"
                aria-valuemin="0" aria-valuemax="100"> {{ testSuite.testcaseFail }}</div>
            </div>
          </td>
          <td><i>Desktop name:</i> <br>{{ testSuite.hostName }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import { passPercentage, dateTimeFormat,millisToMinutesAndSeconds } from '@/utils/functionUtils.js';
export default {
  props: {
    testSuite: {
      type: Object,
      required: true
    }
  },
  setup() {

  },
  methods: {
    getPassPercentage(totalPass, totalFail) {
      return passPercentage(totalPass, totalFail)
    },
    dateTime(date) {
      return dateTimeFormat(date);
    },
    millisToMinutesAndSeconds(millis) {
      return millisToMinutesAndSeconds(millis);
    }
  }
};
</script>

<style>
.testsuit1 {
  font-weight: 400;
  text-align: left;
}

.testSuiteName {
  width: 60%;
}
</style>