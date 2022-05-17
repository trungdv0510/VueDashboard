import axios from 'axios'
const testsuite = {
    state: {
        testsuiteList: [],
        testSuiteNews: [],
        testSuiteDetails: [],
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
        testSuiteDetails: state => state.testuiteDetails,
        testcasePassWithMonth: state => state.testsuiteList.filter(item => item.result == "Pass"),
        testSuiteNews: state => state.testsuiteList//.slice(state.testsuiteList.lenght, state.testsuiteList.lenght-6)
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
                await axios.get(`user/testsuites/${UUIDTestSuite}`).then(response => {
                    commit("SET_TESTDETAIL", response);
                });
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
        SET_TESTDETAIL(state, testSuiteDetails) {
            state.testSuiteDetails = testSuiteDetails
        }
    }
}
export default testsuite;