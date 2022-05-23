<template>
  <div style="width:200%">
    <h3 class="borderItems mt-5">{{ titleName }}</h3>
    <table class="table table-striped table-inverse tableResult table-bordered">
      <thead class="thead-inverse">
        <tr>
          <th>ID</th>
          <th>Test case name</th>
          <th>Pass percentage</th>
          <th>Run time</th>
          <th>Date</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in getSixDataInList(data)" :key="item.id">
          <td scope="row">{{ index + 1 }}</td>
          <td>
            <router-link :to="{ name: 'reportDetail', params: { id: item.uuid } }">
              {{ item.suiteName }}
            </router-link>
          </td>
          <td>
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar"
                :style="{ 'width': getPassPercentage(item.testcasePass, item.testcaseFail) + '%' }" aria-valuenow="100"
                aria-valuemin="0" aria-valuemax="100">
                {{ getPassPercentage(item.testcasePass, item.testcaseFail) }}
              </div>
            </div>
          </td>
          <td scope="row">{{ item.runTime }}</td>
          <td>
            <p>{{ item.dateRun }}</p>
          </td>
          <td>
            <p :class="item.result === 'Pass' ? 'btn btn-success' : 'btn btn-danger'">{{ item.result }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    titleName: String,
    data: Array
  },
  methods: {
    getPassPercentage(totalPass, totalFail) {
      let pass = parseInt(totalPass);
      let fail = parseInt(totalFail);
      let totalTest = pass + fail;
      return parseInt((pass / totalTest) * 100)
    },
    getSixDataInList(data) {
      let listData = [];
      let arrayData = JSON.parse(JSON.stringify(data));
      //console.log(JSON.parse(JSON.stringify(data)));
      //console.log(arrayData.length);
      if (arrayData.length != 0) {
        for (let i = arrayData.length-1; i >= 0; i--) {
          if (listData.length < 6) {
            listData.push(arrayData[i]);
          }
        }
      }
      return listData;
    }
  }

}
</script>

<style>
</style>