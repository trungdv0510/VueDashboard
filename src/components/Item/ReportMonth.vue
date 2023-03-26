<template>
  <div class="tableReport">
    <h3 class="borderItem mt-5 mb-3">Report test scripts with month</h3>
    <table class="table tableReport">
      <thead class="thead-dark">
        <tr>
          <th>Month</th>
          <th>Total test script</th>
          <th>Total pass</th>
          <th>Total fail</th>
          <th>% Fail</th>
          <th>% Pass</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row">1</td>
          <td>25.666</td>
          <td>122</td>
          <td>1224</td>
          <td>40%</td>
          <td>60%</td>
        </tr>
        <tr>
          <td scope="row">2</td>
          <td>25.666</td>
          <td>122</td>
          <td>1224</td>
          <td>50%</td>
          <td>50%</td>
        </tr>
        <tr>
          <td scope="row">3</td>
          <td>25.666</td>
          <td>122</td>
          <td>1224</td>
          <td>10%</td>
          <td>90%</td>
        </tr>
        <tr>
          <td scope="row">4</td>
          <td>25.666</td>
          <td>122</td>
          <td>1224</td>
          <td>20%</td>
          <td>80%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    name:"reportMonth"
};
</script>

<style>
</style>