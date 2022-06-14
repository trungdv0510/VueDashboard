<template>
  <div class="row">
    <div class="customsMenu col-sm-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <div v-for="(item, index) in testCase" :key="item.id">
        <div class="nav-link item d-flex align-items-start itemTotal mb-2" :id="index"
          @click="changeActive(index, item.uuid)" ref=index>
          <p class="itemFix">{{ item.testName }}</p>
          <p class="btn mt-3 resultItem" :class="item.result === 'pass' ? 'btn-success' : 'btn-danger'">{{ item.result
          }}</p>
        </div>
      </div>


    </div>
    <div class="col-sm-8 ml-4" id="v-pills-tabContent" v-if="detailRender">
      <div class="tab-pane fade show" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
        <p class="borderStyle">
          <b>Method test: {{ detailRender.testMethod }}</b> <br>
        </p>
        <div class="row">
          <div class="col-sm-6">
            <div class="d-flex mt-2">
              <p class="btn btn-success fontStyle"> {{ detailRender.timeStart }}</p>
              <p class="btn btn-danger fontStyle">{{ detailRender.timeEnd }}</p>
              <p class="btn btn-secondary fontStyle">{{ detailRender.runTime }}</p>
            </div>
          </div>
          <div class="col-sm-6 mt-2">
            <p class="btn btn-outline-primary fontStyle float-right">{{ detailRender.author }}</p>
          </div>
        </div>
        <table class="table ">
          <thead>
            <tr>
              <th scope="col">STATUS</th>
              <th scope="col">TIMESTAMP</th>
              <th scope="col">STEP NAME</th>
              <th scope="col">DETAIL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in detailRender.testLog" :key="index">
              <th scope="row">
                <i class="fas fa-check-circle fa-sm" style="color:green;" v-if="item.result == 'pass'"></i>
                <i class="fas fa-cog fa-pulse fa-sm" style="color:blue" v-else-if="item.result == 'info'"></i>
                <i class="fas fa-bug fa-sm" style="color:red;" v-else></i>
              </th>
               <td>
                 <p> {{item.testLogTime}}</p>
              </td>
              <td v-if="item.detail == 'image'">
                <img class="reportImg" :src="`http://localhost:8085/` + item.stepName" :alt="item.detail">
              </td>
              <td v-else-if="item.detail == 'video'">
                <video class="videoStyle" :src="`http://localhost:8085/` + item.stepName" controls></video>
              </td>
              <td v-else>
                {{ item.stepName }}
              </td>
              <td>{{ item.detail }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
import { proxyToData } from '@/utils/functionUtils.js';
import { ref } from "vue";
export default {
  props: {
    testCase: {
      type: Array,
      required: true
    },
    testLog: {
      type: Array,
      required: true
    }
  },
  data(props) {
    const detailRender = ref(null);
    let propsTestcase = proxyToData(props.testCase);
    let propsTestlog = proxyToData(props.testLog);
    let testlogRef = this.updateData(propsTestcase, propsTestlog);
    return {
      testlogRef,
      detailRender,
      propsTestcase,
      propsTestlog
    }
  },
  watch: {
    testCase: function (newTestcase) {
      this.propsTestcase = newTestcase;
    },
    testLog: function (newTestLog) {
      this.propsTestlog = newTestLog;
    }
  },
  methods: {
    changeActive(index, id) {
      this.testlogRef = this.updateData(this.propsTestcase, this.propsTestlog);
      let element = this.$refs.index;
      element.forEach(item => {
        item.classList.remove("activeMenu");
      });
      this.$refs.index[index].classList.add("activeMenu");
      this.testlogRef.forEach(el => {
        if (el.idTest == id) {
          this.detailRender = el;
          return;
        }
      })
      //console.log(this.detailRender);
    },
    updateData(propsTestcase, propsTestlog) {
      let testlogs = [];
      if (propsTestcase.length > 0 && propsTestlog.length > 0) {
        for (let i = 0; i < propsTestcase.length; i++) {
          let dataTestLog = {
            "id": propsTestcase[i].uuid,
            "idTest": propsTestcase[i].uuid,
            "testMethod": propsTestcase[i].methodName,
            "timeStart": propsTestcase[i].startTime,
            "timeEnd": propsTestcase[i].endTime,
            "runTime": propsTestcase[i].timeDuration,
            "author": propsTestcase[i].author,
            "testLog": []
          }
          for (let k = 0; k < propsTestlog.length;k++) {
            console.log(propsTestlog[k]);
            for (let j = 0; j < propsTestlog[k].length; j++) {
              if (propsTestcase[i].uuid == propsTestlog[k][j].testcaseUUID) {
                dataTestLog.testLog.push(propsTestlog[k][j]);
              }
            }
            testlogs.push(dataTestLog);
          }
        }
      }
      return ref(testlogs);
    }
  }
};
</script>

<style>
.customsMenu {
  text-align: left !important;
  max-width: 30%;
}

.activeMenu {
  background: #495057 !important;
  color: white !important;
}

.item {
  color: black;
  border-radius: 5px;
}

.item:hover {
  background: #495057 !important;
  color: white !important;
}

.fontStyle {
  font-size: 10px;
  margin-right: 4px;
}

.borderStyle {
  border: 1px solid red;
  padding: 5px;
  text-align: center;
  border-radius: 5px;
  box-shadow: -13px -10px 20px 0px;
}

.reportImg {
  width: 60%;
}

.videoStyle {
  width: 85%;
}

.itemFix {
  width: 90%;
  display: block;
}

.itemTotal {}

.resultItem {}
</style>