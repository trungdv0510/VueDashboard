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
          <td>{{this.totalTest}}</td>
          <td>{{this.totalPass}}</td>
          <td>{{this.totalFail}}</td>
          <td>{{this.perTestFail}}%</td>
          <td>{{this.perTestPass}}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    props:{
        title:String,
        total:Number,
        pass:Number,
        fail:Number,
        perPass:Number,
        perFail:Number
    },
    data(props){
      let totalTest = props.total;
      let totalPass = props.pass;
      let totalFail = props.fail;
      let perTestFail = props.perFail;
      let perTestPass = props.perPass;
      return {
        totalTest ,
        totalPass ,
        totalFail ,
        perTestFail,
        perTestPass,
      }
    },
    watch: {
      total: function (newValue) {
        this.totalTest = newValue;
      },
      pass: function (newValue) {
        this.totalPass = newValue
      },
      fail: function (newValue) {
        this.totalFail = newValue
      },
      perPass: function (newValue) {
        this.perTestPass = newValue
      },
      perFail: function (newValue) {
        this.perTestFail = newValue
      }
    }
};
</script>

<style>
</style>