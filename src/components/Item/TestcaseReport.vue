<template>
  <div class="row">
    <div class="customsMenu col-sm-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <div v-for="(item, index) in testCase" :key="item.id">
        <div class="nav-link item d-flex align-items-start itemTotal mb-2" :id="index"
          @click="changeActive(index, item.uuid)" ref=index>
          <p class="itemFix">{{ item.testName }}</p>
          <p class="btn mt-3 resultItem" :class="item.result == 'pass' ? 'btn btn-success' : 'btn btn-danger'">{{
              item.result
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
                <p> {{ item.testLogTime }}</p>
              </td>
              <td v-if="item.detail == 'image'">
                <img class="reportImg" :src="item.stepName" :alt="item.detail"
                  @click="showImgModal(item.stepName)">
              </td>
              <td v-else-if="item.detail == 'video'">
                <video class="videoStyle" :src="item.stepName" controls></video>
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
    <!-- The Modal -->
    <div id="modalImg" class="modalShow" v-if="this.active">
      <!-- The Close Button -->
      <span class="close" @click="this.closeModal()">&times;</span>
      <!-- Modal Content-->
      <img class="modal-content" id="img01" :src="this.imgModal">
      <!-- Modal Caption (Image Text) -->
      <div id="caption"></div>
    </div>
  </div>
</template>

<script>
import { proxyToData } from '@/utils/FunctionUtils.js';
import {constanst} from '@/utils/Contains.js';
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
    let testlogRef = this.setDataActive(propsTestcase, propsTestlog);
    const domainServer = constanst.pathServer;
    let imgModal = null;
    let active = false;
    let videoModal
    return {
      testlogRef,
      detailRender,
      propsTestcase,
      propsTestlog,
      domainServer,
      imgModal,
      active,
      videoModal
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
      this.testlogRef = this.setDataActive(this.propsTestcase, this.propsTestlog);
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
    setDataActive(propsTestcase, propsTestlog) {
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
          for (let k = 0; k < propsTestlog.length; k++) {
            for (let j = 0; j < propsTestlog[k].length; j++) {
              if (propsTestcase[i].uuid == propsTestlog[k][j].testcaseUUID) {
                dataTestLog.testLog.push(propsTestlog[k][j]);
              }
            }
            testlogs.push(dataTestLog);
          }
        }
      }
      console.log(testlogs);
      console.log(this.sortArrayByDateWithKeyJson(testlogs));
      return ref(testlogs);
    },
    showImgModal(imgPath) {
      this.imgModal = imgPath;
      this.active = true;
    },
    closeModal() {
      this.active = false;
      this.imgModal == null ? this.videoModal = null : this.imgModal = null;
    },
    sortArrayByDateWithKeyJson(arrayJson) {
      arrayJson.forEach(e => {
        e.testLog.sort(function (a, b) {
          return new Date(a.testLogTime) - new Date(b.testLogTime);
        })
      });
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


/* trungdv: create show img popup */
.modalShow {
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  padding-top: 100px;
  /* Location of the box */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9);
  /* Black w/ opacity */
}

/* Modal Content (Image) */
.modal-content {
  margin: auto;
  display: block;
  width: 80%;
}

/* Add Animation - Zoom in the Modal */
.modal-content {
  animation-name: zoom;
  animation-duration: 0.6s;
}

/* The Close Button */
.close {
  position: absolute;
  top: 79px;
  right: 18px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

@keyframes zoom {
  from {
    transform: scale(0)
  }

  to {
    transform: scale(1)
  }
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px) {
  .modal-content {
    width: 100%;
  }
}
</style>
