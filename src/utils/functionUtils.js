import moment from 'moment';
export  function passPercentage(totalPass, totalFail) {
    let pass = parseInt(totalPass);
    let fail = parseInt(totalFail);
    let totalTest = pass + fail;
    return parseInt((pass / totalTest) * 100)
}
export  function dateTimeFormat(value) {
    return moment(value).format('DD-MM-YYYY , h:mm:ss a');
}
export function proxyToData(proxy){
    return JSON.parse(JSON.stringify(proxy));
}
export function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}