import axios from 'axios';
const regression = {
    state: {
        listSprint: [],
        listRegression: [],
        listRegressionData:[],
        countPass:0,
        countFail:0,
        percentPass:0,
        percentFail:0,
        total:0
    },
    getters: {
        listSprint: state => state.listSprint,
        listRegression: state => state.listRegression,
        countPass: state => state.countPass,
        countFail: state => state.countFail,
        percentPass: state => state.percentPass,
        percentFail: state => state.percentFail,
        total: state => state.total,
        listRegressionData: state=>state.listRegressionData,
        convertDataRegressToObject: state => {
            let listObject = [];
            if (state.listRegression != null) {
                state.listRegression.forEach(element => {
                let object = {
                  "testcase": [element.suiteName, element.testSuiteUuid],
                  "sprint": element.sprint,
                  "date": element.dateRun,
                  "result": element.result,
                  "reason": element.ErrorDescription,
                }
                listObject.push(object);
              });
            }
            return listObject;
          }
    },
    actions: {
        async getRegressionByOption({ commit,dispatch }, option) {
            try {
                const params = {
                    startDate: option.startDate == null ? '': option.startDate,
                    endDate: option.endDate == null ? '': option.endDate,
                    sprint: option.sprint == null ? '': option.sprint
                }
                const response = await axios.get("/regression/search", {params});
                if (response.status === 200) {
                    commit("SET_REGRESSTION", response.data);
                    commit("SET_COUNT_FAIL");
                    commit("SET_COUNT_PASS");
                    commit("SET_PASS_PERCENT");
                    commit("SET_FAIL_PERCENT");
                    commit("SET_TOTAL");
                    commit("SET_LISTGRESSIONDATA")
                }
            } catch (error) {
                dispatch("error", "Server error please try later");
            }
        },
        async getSprint({ commit, dispatch }) {
            try {
                const response = await axios.get(`/sprint`);
                console.log(response);
                if (response.status === 200) {
                    commit("SET_SPRINT", response.data);
                }
            } catch (error) {
                dispatch("error", "Server error please try later");
            }
        }
    },
    mutations: {
        SET_SPRINT(state, data) {
          state.listSprint = data;
        },
        SET_REGRESSTION(state,data){
            state.listRegression = data;
        },
        SET_COUNT_PASS(state){
           let count = 0;
           state.listRegression.forEach(element => {
            if(element.result === "PASS"){
                count++;
            }
           });
           state.countPass = count;
        },
        SET_COUNT_FAIL(state){
            let count = 0;
            state.listRegression.forEach(element => {
             if(element.result === "FAIL"){
                 count++;
             }
            });
            state.countFail = count;
        },
        SET_PASS_PERCENT(state){
            let listRegressionLenght = state.total;
            if(!isNaN(state.countPass) && !isNaN(listRegressionLenght)){
                state.percentPass = ((state.countPass/listRegressionLenght) * 100).toFixed(3);
            }
        },
        SET_FAIL_PERCENT(state){
            let listRegressionLenght = state.total;
            if(!isNaN(state.countFail) && !isNaN(listRegressionLenght)){
                state.percentFail = ((state.countFail/listRegressionLenght) * 100).toFixed(3);
            }
        },
        SET_TOTAL(state){
            state.total = state.listRegression.length;
        },
        SET_LISTGRESSIONDATA(state){
            state.listRegressionData = state => {
                let listObject = [];
                if (state.listRegression != null) {
                    state.listRegression.forEach(element => {
                    let object = {
                      "testcase": [element.suiteName, element.testSuiteUuid],
                      "sprint": element.sprint,
                      "date": element.dateRun,
                      "result": element.result,
                      "reason": element.ErrorDescription,
                    }
                    listObject.push(object);
                  });
                }
                return listObject;
            }
        }
    }
}
export default regression;