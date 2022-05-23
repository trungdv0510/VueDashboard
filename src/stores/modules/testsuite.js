import axios from 'axios'
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
                if(element.result == "Pass"){
                    count++;
                }
            });
            return count;
        },
        totalFail: state => {
            let count = 0
            state.testsuiteList.forEach(element => {
                if(element.result == "Fail"){
                    count++;
                }
            });
            return count;
        },
        testSuiteDetails: state => state.testSuiteDetails,
        testcasePassWithMonth: state => state.testsuiteList.filter(item => item.result == "Pass"),
        testcaseWithTestSuiteUUID: state=>state.testcaseWithTestSuiteUUID,
        testlogWithTestcaseUUID: state=>state.testlogWithTestcaseUUID,

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
        }
    },
    mutations: {
        SET_TESTSUITE(state, testsuiteList) {
            state.testsuiteList =  JSON.parse(JSON.stringify(testsuiteList));
        },
        SET_TESTDETAIL(state, testSuite) {
            console.log(testSuite);
            state.testSuiteDetails = JSON.parse(JSON.stringify(testSuite.testSuiteDTO));
            state.testcaseWithTestSuiteUUID=  JSON.parse(JSON.stringify(testSuite.testCaseDTOs))
            state.testlogWithTestcaseUUID=  JSON.parse(JSON.stringify(testSuite.testLogDTOs));
            console.log("Gía trị của state "+state.testSuiteDetails);
        }
    }
}
export default testsuite;