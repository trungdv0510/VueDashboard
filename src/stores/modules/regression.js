import axios from 'axios';
import {dateTimeFormat} from '@/utils/functionUtils.js';
const regression = {
    state: {
        listSprint: [],
        listRegression: [],
        countPass:0,
        countFail:0,
        percentPassRegress:0,
        percentFailRegress:0,
        totalRegress:0,
        mapSprint:Object,
    },
    getters: {
        listSprint: state => state.listSprint,
        listRegression: state => state.listRegression,
        countPass: state => state.countPass,
        countFail: state => state.countFail,
        percentPassRegress: state => state.percentPassRegress,
        percentFailRegress: state => state.percentFailRegress,
        totalRegress: state => state.totalRegress,
        convertDataRegressToObject: state => {
            let listObject = [];
            if (state.listRegression != null) {
                console.log(state.listRegression);
                state.listRegression.forEach(element => {
                let object = {
                  "testcase": [element.testcaseName, element.testsuiteUuid],
                  "sprint": element.sprint,
                  "date": dateTimeFormat(element.dateRun),
                  "evidence_link": element.evidenceLink,
                  "result": element.result,
                  "reason": element.errorDescription,
                  "author": element.author
                }
                listObject.push(object);
              });
            }
            return listObject;
          },
        getSprint: state=> {
            const objectKeys = Object.keys(state.mapSprint);
            return objectKeys;
        },
        getTotal: state=> {
            const objectValues = Object.values(state.mapSprint);
            return objectValues;
        }
    },
    actions: {
        async getRegressionByOption({ commit,dispatch }, option) {
            try {
                const params = {
                    startDate: option.startDate,
                    endDate: option.endDate,
                    sprint: option.sprint
                }
                const response = await axios.get("/regression/search", {params});
                if (response.status === 200) {
                    commit("SET_REGRESSTION", response.data);
                    commit("SET_COUNT_FAIL");
                    commit("SET_COUNT_PASS");
                    commit("SET_TOTAL");
                    commit("SET_PASS_PERCENT");
                    commit("SET_FAIL_PERCENT");
                }
            } catch (error) {
                dispatch("error", "Server error please try later");
            }
        },
        async getSprint({ commit, dispatch }) {
            try {
                const response = await axios.get(`/regression/sprint`);
                if (response.status === 200) {
                    commit("SET_SPRINT", response.data);
                }
            } catch (error) {
                dispatch("error", "Server error please try later");
            }
        },
        async downloadReport({dispatch},option){
            try{
                const params = {
                    startTime: option.startTime,
                    endTime: option.endTime,
                    sprint: option.sprint
                }
                const response = await axios.get("/regression/report-automation",{
                    params:params,
                    responseType: 'blob',
                });
                if(response.status == 200){
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', "report_automation.xlsx");
                    document.body.appendChild(link);
                    link.click();
                }else{
                    dispatch("error","Cannot download data please try again later");
                }
            }catch(error){
                dispatch("error", "Server error please try later");
            }
        },
        async getTestcaseWithSprint({ commit,dispatch}){
            try{
                const response = await axios.get("/regression/sprint-total");
                if(response.status == 200){
                    commit("SET_SPRINT_TOTAL",response.data);
                }
            }catch(e){
                dispatch("error", e);
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
            if(!isNaN(state.countPass) && !isNaN(state.totalRegress)){
                state.percentPassRegress = ((state.countPass/state.totalRegress) * 100).toFixed();
            }
        },
        SET_FAIL_PERCENT(state){
            if(!isNaN(state.countFail) && !isNaN(state.totalRegress)){
                state.percentFailRegress = ((state.countFail/state.totalRegress) * 100).toFixed();
            }
        },
        SET_TOTAL(state){
            state.totalRegress = state.listRegression.length;
        },
        SET_SPRINT_TOTAL(state, data){
             state.mapSprint = data;
        }
    }
}
export default regression;