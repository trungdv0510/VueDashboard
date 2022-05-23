<template>
  <div class="container">
    <table class="table table-bordered testsuit1">
      <tbody>
        <tr>
          <th scope="row" rowspan="3" class="text-secondary">
            <div>
              <p class="text-left">Automation Report:</p>
              <p class="text-dark text-center">
                {{ testSuite.suiteName }}
              </p>
            </div>
          </th>
          <td style="background-color: gray" class="text-light">
            Date run: {{ testSuite.dateRun }}
          </td>
          <td class="text-light" :class="testSuite.result === 'Pass' ? 'btn-success' : 'btn-danger'">
            <p>{{ testSuite.result }}</p>
          </td>
        </tr>
        <tr style="background-color: gray" class="text-light">
          <td>Time: {{ testSuite.runTime }}s</td>
          <td>IP address: {{ testSuite.ipName }}</td>
        </tr>
        <tr style="background-color: gray" class="text-light">
          <td>
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar"
                :style="{ 'width': getPassPercentage(testSuite.testcasePass, testSuite.testcaseFail) + '%' }"
                aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                {{ getPassPercentage(testSuite.testcasePass, testSuite.testcaseFail) }}%
              </div>
            </div>
          </td>
          <td>Desktop name: {{ testSuite.hostName }}s</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
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
      let pass = parseInt(totalPass);
      let fail = parseInt(totalFail);
      let totalTest = pass + fail;
      return parseInt((pass / totalTest) * 100)
    }
  }
};
</script>

<style>
.testsuit1 {
  font-weight: 600;
  text-align: left;
}
</style>