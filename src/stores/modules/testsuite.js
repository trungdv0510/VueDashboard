import axios from 'axios'
const testuites = localStorage.getItem("testsuite");
const testuiteDetails = localStorage.getItem("testSuiteDetails");
const testsuite = {
    state:{
        testsuiteList :testuites,
        testSuiteNews : [],
        testSuiteDetails : testuiteDetails,
    },
    getters:{
        listTestSuite: state=>state.testsuiteList,
        totalPass:state=>state.testsuiteList.filter(item => item.result == "Pass").lenght,
        totalFail:state => state.testsuiteList.filter(item => item.result == "Fail").lenght,
        testSuiteDetails: state=> state.testuiteDetails,
        testcasePassWithMonth: state=>state.testsuiteList.filter(item => item.result == "Pass"),
        testSuiteNews:state => state.testsuiteList.slice(state.testsuiteList.lenght, state.testsuiteList.lenght-6)
    },
    actions:{
        //wirte API to get All value
        async getAllTestSuite({commit}){
            try{
                 await axios.get("user/testsuites").then(response =>{
                    console.log("đã chạy vào đây");
                    commit("SET_TESTSUITE",response);
                 });
            }
            catch(e){
                console.log(e);
            }
        },
        async findOneByUUID({commit},UUIDTestSuite){
            try{
                await axios.get(`user/testsuites/${UUIDTestSuite}`).then(response =>{
                    commit("SET_TESTDETAIL",response);
                 });
            }
            catch(e){
                console.log(e);
            }
        }
    },
    mutations:{
        SET_TESTSUITE(state,testsuiteList){
            state.testsuiteList = testsuiteList
            localStorage.setItem("testsuite",state.testsuiteList);
        },
        SET_TESTDETAIL(state,testSuiteDetails){
            state.testSuiteDetails = testSuiteDetails
            localStorage.setItem("testSuiteDetails",state.testsuiteList);
        }
    }
}
export default testsuite;