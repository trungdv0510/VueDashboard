<template>
  <div class="tableReport">
    <h3 class="borderItems mt-5 mb-3">{{title}}</h3>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>Test script done</th>
          <th>Total pass</th>
          <th>Total fail</th>
          <th>% Fail</th>
          <th>% Pass</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>25.666</td>
          <td>122</td>
          <td>1224</td>
          <td>40%</td>
          <td>60%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    props:{
        title:String
    }
};
</script>

<style>
</style>