import axios from 'axios';
import { passPercentage, millisToMinutesAndSeconds } from '@/utils/functionUtils.js';
const testsuite = {
    state: {
        testsuiteList: [],
        testSuiteDetails: {},
        testcaseWithTestSuiteUUID:[],
        testlogWithTestcaseUUID:[],
    },
    getters: {
        listTestSuite: state => state.testsuiteList,
        totalPass: state => {
            let count = 0
            state.testsuiteList.forEach(element => {
                if(element.result == "PASS"){
                    count++;
                }
            });
            return count;
        },
        totalFail: state => {
            let count = 0
            state.testsuiteList.forEach(element => {
                if(element.result == "FAIL"){
                    count++;
                }
            });
            return count;
        },
        testSuiteDetails: state => state.testSuiteDetails,
        testcasePassWithMonth: state => state.testsuiteList.filter(item => item.result == "Pass"),
        testcaseWithTestSuiteUUID: state=>state.testcaseWithTestSuiteUUID,
        testlogWithTestcaseUUID: state=>state.testlogWithTestcaseUUID,
        getSixDataInList:state => {
            let listData = [];
            if (state.testsuiteList != null || state.testsuiteList != undefined) {
              let arrayData = state.testsuiteList;
              if (arrayData.length != 0) {
                for (let i = arrayData.length - 1; i >= 0; i--) {
                  if (listData.length < 6) {
                    listData.push(arrayData[i]);
                  }
                }
              }
            }
            return listData;
        },
        convertDataToObject: state => {
            let listObject = [];
            if (state.testsuiteList != null) {
                state.testsuiteList.forEach(element => {
                let object = {
                  "suiteName": [element.suiteName, element.uuid],
                  "percentage": [element.testcasePass, element.testcaseFail, passPercentage(element.testcasePass, element.testcaseFail), passPercentage(element.testcaseFail, element.testcasePass)],
                  "runTime": millisToMinutesAndSeconds(element.runTime),
                  "dateRun": element.dateRun,
                  "result": element.result,
                }
                listObject.push(object);
              });
            }
            return listObject;
          }

    },
    actions: {
        //wirte API to get All value
        async getAllTestSuite({ commit }) {
            try {
                const response = await axios.get("user/testsuites");
                if (response.status === 200) {
                    commit("SET_TESTSUITE", response.data);
                }

            }
            catch (e) {
                console.log(e);
            }
        },
        async findOneByUUID({ commit }, UUIDTestSuite) {
            try {
               const response = await axios.get(`user/testsuites/${UUIDTestSuite}`);
               if (response.status === 200) {
                commit("SET_TESTDETAIL", response.data);
               }
            }
            catch (e) {
                console.log(e);
            }
        },
        async findTestSuiteWithDate({commit}, apiUrl){
            try{
                const response = await axios.get(apiUrl);
                if( response.status==200 ){
                    commit("SET_TESTSUITE",response.data);
                }
            }
            catch(e){
                console.log(e);
            }
        }
    },
    mutations: {
        SET_TESTSUITE(state, testsuiteList) {
            state.testsuiteList =  JSON.parse(JSON.stringify(testsuiteList));
            console.log(state.testsuiteList);
        },
        SET_TESTDETAIL(state, testSuite) {
            state.testSuiteDetails = JSON.parse(JSON.stringify(testSuite.testSuiteDTO));
            state.testcaseWithTestSuiteUUID=  JSON.parse(JSON.stringify(testSuite.testCaseDTOs))
            state.testlogWithTestcaseUUID=  JSON.parse(JSON.stringify(testSuite.testLogDTOs));
        }
    }
}
export default testsuite;