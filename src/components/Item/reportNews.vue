<template>
<div class="">
    <h3 class="borderItems mt-5">{{titleName}}</h3>
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
              <tr>
                <td scope="row">1</td>
                <td>
                 <router-link :to="{name:'reportDetail', params:{id:'1'}}" @click="findTestSuiteByUUID(1)">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Consequuntur veniam distinctio a facilis excepturi libero
                    eveniet tenetur ad, sint, voluptas quam corrupti sequi
                    dolores quaerat veritatis. Pariatur provident modi id.
                  </router-link>
                </td>
                <td>
                  <div class="progress">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      style="width: 100%"
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      100%
                    </div>
                  </div>
                </td>
                <td scope="row">10s</td>
                <td>
                  <p>5/10/2000</p>
                </td>
                <td>
                  <p class="btn btn-success">Pass</p>
                </td>
              </tr>
            </tbody>
          </table>
</div>
</template>

<script>
import { mapActions} from "vuex";
export default {
  props:{
      titleName:String,
      data:Array
  },
  methods:{
    ...mapActions(["findOneByUUID"]),
      findTestSuiteByUUID(uuid){
          this.findOneByUUID(uuid);
      }
  }

}
</script>

<style>

</style>