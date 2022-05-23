<template>
<div class="row">
  <div class="customsMenu col-sm-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <div v-for="(item,index) in testcase" :key="item.id">
      <p class="nav-link item d-flex align-items-start" :id="index" @click="changeActive(index,item.id)" ref=index>
        <span>{{item.testcaseName}}</span>
        <span class="btn mt-3" :class="item.result==='Pass'? 'btn-success':'btn-danger'">{{item.result}}</span>
      </p>
    </div>
       
     
  </div>
    <div class="col-sm-8 ml-4" id="v-pills-tabContent" v-if="detailRender">
      <div class="tab-pane fade show" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
         <p class="borderStyle">
            <b>Method test:  {{detailRender.testMethod}}</b> <br>
          </p>
        <div class="row">
          <div class="col-sm-6">
            <div class="d-flex mt-2">
              <p class="btn btn-success fontStyle"> {{detailRender.timeStart}}</p>
              <p class="btn btn-danger fontStyle">{{detailRender.timeEnd}}</p>
              <p class="btn btn-secondary fontStyle">{{detailRender.runTime}}</p>
            </div>
          </div>
          <div class="col-sm-6 mt-2">
             <p class="btn btn-outline-primary fontStyle float-right">{{detailRender.author}}</p>
             <p class="btn btn-warning fontStyle float-right">{{detailRender.IP}}</p>
             <p class="btn btn-info fontStyle float-right">{{detailRender.PCName}}</p>
          </div>
        </div>
        <table class="table ">
          <thead>
            <tr>
              <th scope="col">STATUS</th>
              <th scope="col">STEP NAME</th>
              <th scope="col">DETAIL</th>
            </tr>
          </thead>
          <tbody >
            <tr  v-for="(item,index) in detailRender.testLog" :key="index">
              <th scope="row">
                <i class="fas fa-check-circle fa-sm" style="color:green;" v-if="item.status == 'Pass'"></i>
                <i class="fas fa-bug fa-sm" style="color:red;" v-else-if="item.status == 'Fail'"></i>
                <i class="fas fa-cog fa-pulse fa-sm" style="color:blue" v-else></i> 
              </th>
              <td v-if="item.detail == 'img'">
                <img class="reportImg" :src="item.stepname" alt="" srcset="">
              </td>
               <td v-else-if="item.detail == 'video'">
                <video class="videoStyle" :src="item.stepname" controls></video>
              </td>
              <td v-else>
                  {{item.stepname}}
              </td>
              <td>{{item.detail}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</div>

</template>

<script>
import {ref} from "vue";

  export default {
    props:{
      testCase:{
        type:Array,
        required: true
      },
      testLog:{
        type:Array,
        required: true
      }
    },
    setup() {
      const detailRender = ref(null);
       const testcase = ref([
        {
          "id":1,
          "testcaseName":"[76][Web CSR] Tạo mới điện nhờ thu đi theo lô Funding Option = Account WebCSR 1",
          "result":"Pass"

        },
        {
          "id":2,
          "testcaseName":"[76][Web CSR] Tạo mới điện nhờ thu đi theo lô Funding Option = Account WebCSR 2",
          "result":"Pass"
        },
        {
          "id":3,
          "testcaseName":"[76][Web CSR] Tạo mới điện nhờ thu đi theo lô Funding Option = Account WebCSR 3",
          "result":"Fail"
        },
        {
          "id":4,
          "testcaseName":"[76][Web CSR] Tạo mới điện nhờ thu đi theo lô Funding Option = Account WebCSR 4",
          "result":"Fail"
        },
        {
          "id":5,
          "testcaseName":"[76][Web CSR] Tạo mới điện nhờ thu đi theo lô Funding Option = Account WebCSR 5",
          "result":"Pass"
        },
        {
          "id":6,
          "testcaseName":"[76][Web CSR] Tạo mới điện nhờ thu đi theo lô Funding Option = Account WebCSR 6",
          "result":"Pass"
        }
      ])
        const testDetail = ref([
          {
            "id":1,
            "idTest":2,
            "testMethod":" WebCSR.Flows.Login test 6",
            "timeStart":"2022-01-01 18:25:40",
            "timeEnd":"2022-01-01 18:25:49",
            "runTime":"0h 0m 9s+5ms",
            "author":"Phùng Thị Ánh Ngọc",
            "IP":"1.55.137.27",
            "PCName":"MSI",
            "testLog":[
              {"status":"Pass","stepname":"Load data user success","detail":""},
              {"status":"Fail","stepname":"Insert data user fails","detail":"thành công load data"},
              {"status":"Info","stepname":"https://stanford.com.vn/DesktopModules/StanfordProgram/images/videos/resize/kiem-thu-tu-dong.png","detail":"img"},
              {"status":"Fail","stepname":"Click button Unsuccess","detail":""},
              {"status":"Info","stepname":"https://dbk.vn/uploads/ckfinder/images/1-content/anh-dep-1.jpg","detail":"img"},
              {"status":"Info","stepname":"/video/Video_Mp4_Flows.login_3020dbe3-b5f7-479f-b9f4-e1a4f5d80c25.mp4","detail":"video"}

            ]

          },
           {
            "id":2,
            "idTest":3,
            "testMethod":" WebCSR.Flows.Login test 5",
            "timeStart":"2022-01-01 18:25:40",
            "timeEnd":"2022-01-01 18:25:49",
            "runTime":"0h 0m 9s+5ms",
            "author":"Đinh Văn Trung",
            "IP":"1.55.137.27",
            "PCName":"MSI",
            "testLog":[
              {"status":"Pass","stepname":"Load data user success","detail":""},
              {"status":"Fail","stepname":"Insert data user fails","detail":"thành công load data"},
              {"status":"Info","stepname":"https://stanford.com.vn/DesktopModules/StanfordProgram/images/videos/resize/kiem-thu-tu-dong.png","detail":"img"},
              {"status":"Fail","stepname":"Click button Unsuccess","detail":""},
              {"status":"Info","stepname":"https://dbk.vn/uploads/ckfinder/images/1-content/anh-dep-1.jpg","detail":"img"},
              {"status":"Info","stepname":"/video/Video_Mp4_Flows.login_3020dbe3-b5f7-479f-b9f4-e1a4f5d80c25.mp4","detail":"video"}

            ]

          },
           {
            "id":3,
            "idTest":1,
            "testMethod":" WebCSR.Flows.Login test 4",
            "timeStart":"2022-01-01 18:25:40",
            "timeEnd":"2022-01-01 18:25:49",
            "runTime":"0h 0m 9s+5ms",
            "author":"Nguyễn Hồng Quân",
            "IP":"1.55.137.27",
            "PCName":"MSI",
            "testLog":[
              {"status":"Pass","stepname":"Load data user success","detail":""},
              {"status":"Fail","stepname":"Insert data user fails","detail":"thành công load data"},
              {"status":"Info","stepname":"https://stanford.com.vn/DesktopModules/StanfordProgram/images/videos/resize/kiem-thu-tu-dong.png","detail":"img"},
              {"status":"Fail","stepname":"Click button Unsuccess","detail":""},
              {"status":"Info","stepname":"https://dbk.vn/uploads/ckfinder/images/1-content/anh-dep-1.jpg","detail":"img"},
              {"status":"Info","stepname":"/video/Video_Mp4_Flows.login_3020dbe3-b5f7-479f-b9f4-e1a4f5d80c25.mp4","detail":"video"}

            ]

          },
           {
            "id":4,
            "idTest":6,
            "testMethod":" WebCSR.Flows.Login test 3",
            "timeStart":"2022-01-01 18:25:40",
            "timeEnd":"2022-01-01 18:25:49",
            "runTime":"0h 0m 9s+5ms",
            "author":"Nguyễn Minh Đức",
            "IP":"1.55.137.27",
            "PCName":"MSI",
            "testLog":[
              {"status":"Pass","stepname":"Load data user success","detail":""},
              {"status":"Fail","stepname":"Insert data user fails","detail":"thành công load data"},
              {"status":"Info","stepname":"https://stanford.com.vn/DesktopModules/StanfordProgram/images/videos/resize/kiem-thu-tu-dong.png","detail":"img"},
              {"status":"Fail","stepname":"Click button Unsuccess","detail":""},
              {"status":"Info","stepname":"https://dbk.vn/uploads/ckfinder/images/1-content/anh-dep-1.jpg","detail":"img"},
              {"status":"Info","stepname":"/video/Video_Mp4_Flows.login_3020dbe3-b5f7-479f-b9f4-e1a4f5d80c25.mp4","detail":"video"}

            ]

          },
           {
            "id":5,
            "idTest":4,
            "testMethod":" WebCSR.Flows.Login test 2",
            "timeStart":"2022-01-01 18:25:40",
            "timeEnd":"2022-01-01 18:25:49",
            "runTime":"0h 0m 9s+5ms",
            "author":"Phạm Thanh Duyên",
            "IP":"1.55.137.27",
            "PCName":"MSI",
            "testLog":[
              {"status":"Pass","stepname":"Load data user success","detail":""},
              {"status":"Fail","stepname":"Insert data user fails","detail":"thành công load data"},
              {"status":"Info","stepname":"https://stanford.com.vn/DesktopModules/StanfordProgram/images/videos/resize/kiem-thu-tu-dong.png","detail":"img"},
              {"status":"Fail","stepname":"Click button Unsuccess","detail":""},
              {"status":"Info","stepname":"https://dbk.vn/uploads/ckfinder/images/1-content/anh-dep-1.jpg","detail":"img"},
              {"status":"Info","stepname":"/video/Video_Mp4_Flows.login_3020dbe3-b5f7-479f-b9f4-e1a4f5d80c25.mp4","detail":"video"}

            ]

          },
           {
            "id":6,
            "idTest":5,
            "test method":" WebCSR.Flows.Login test 1",
            "timeStart":"2022-01-01 18:25:40",
            "timeEnd":"2022-01-01 18:25:49",
            "author":"Phạm Thị Ngọc Ánh",
            "runTime":"0h 0m 9s+5ms",
            "IP":"1.55.137.27",
            "PCName":"MSI",
            "testLog":[
              {"status":"Pass","stepname":"Load data user success","detail":""},
              {"status":"Fail","stepname":"Insert data user fails","detail":"thành công load data"},
              {"status":"Info","stepname":"https://stanford.com.vn/DesktopModules/StanfordProgram/images/videos/resize/kiem-thu-tu-dong.png","detail":"img"},
              {"status":"Fail","stepname":"Click button Unsuccess","detail":""},
              {"status":"Info","stepname":"https://dbk.vn/uploads/ckfinder/images/1-content/anh-dep-1.jpg","detail":"img"},
              {"status":"Info","stepname":"/video/Video_Mp4_Flows.login_3020dbe3-b5f7-479f-b9f4-e1a4f5d80c25.mp4","detail":"video"}

            ]

          }
        ])

      return {
        testcase,
        testDetail,
        detailRender
      }
    },
    methods:{
      changeActive(index,id){
        let  element =  this.$refs.index;
        element.forEach(item => {
          item.classList.remove("activeMenu");
        });
        this.$refs.index[index].classList.add("activeMenu");
        this.testDetail.forEach(el => {
          if(el.idTest == id){
              this.detailRender = el;
              return;
          }
        });
        console.log(this.detailRender);
      }
    }
  };
</script>

<style>
  .customsMenu {
    text-align: left !important;
    width: 30%;
  }

  .activeMenu {
    background: #495057 !important;
    color: white !important;
  }
  .item {
    color: black;
    border-radius: 5px;
  }
  .item:hover{
    background: #495057 !important;
    color: white !important;
  }
  .fontStyle{
    font-size: 10px;
    margin-right: 4px;
  }
  .borderStyle{
    border: 1px solid red;
    padding: 5px;
    text-align: center;
    border-radius: 5px;
    box-shadow: -13px -10px 20px 0px;
  }
  .reportImg{
    width: 60%;
  }
  .videoStyle{
    width: 85%;
  }

</style>