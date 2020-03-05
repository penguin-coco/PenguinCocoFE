/**
 * Functions of processing date format
 * Created by Ching-Hsuan Su on 2018/06/22.
 */

export default class DateUtil {

  /**
   * @desc 將日期格式化 e.g. 2020-02-07 21:01:30
   * @param oriDate
   * @return {string} 格式化後的日期格式
   */
  static formatDatetime(oriDate) {
    let d = new Date(oriDate);

    let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

    // 補0
    let hh = ('0' + d.getHours()).substr(-2);
    let mm = ('0' + d.getMinutes()).substr(-2);
    let ss = ('0' + d.getSeconds()).substr(-2);

    // let hh = d.getHours();
    // let mm = d.getMinutes();
    // let ss = d.getSeconds();

    let time = hh + ":" + mm + ":" + ss; 

    return date + ' ' + time
  }

  /**
   * @desc 計算兩日期相差的天數
   * @param {string} sDate1
   * @param {string} sDate2
   * @return {int} 相差的天數
   */
  static dateDiff(sDate1, sDate2) { // sDate1和sDate2是2018-6-18 10:23:10格式
    var aDate, oDate1, oDate2, iDays;
    var splitDatetime1 = sDate1.split(' ');
    aDate = splitDatetime1[0].split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); // 轉換為6-18-2018格式

    var splitDatetime2 = sDate2.split(' ');
    aDate = splitDatetime2[0].split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);

    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換为天數
    // console.log(iDays);
    return iDays
  }

  /**
   * @desc 將傳進來的日期加一天，並返回加一天後的日期
   * @param {string} date
   * @return {string} 加一天後的日期
   */
  static nextDayDate(date) {
    var date = new Date(date);
    date.setDate(date.getDate() + 1);
    var nextDayDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return nextDayDate
  }

  /**
   * @desc 取得當天的日期
   * @return {string} 當天的日期
   */
  static getTodayDate() {
    let date = new Date();
    let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return today
  }

  /**
   * @desc 判斷當日的日期，是否已經超過傳進來的deadline
   * @param {string} deadline
   * @return {boolean} 若過期則回傳true，否則false
   */
  static isOverDate(deadline) {
    let deadlineDatetime = new Date(deadline);
    let todayDatetime = new Date();

    if(todayDatetime.valueOf() > deadlineDatetime.valueOf()) { // 過期
      return true
    } else { // 沒過期
      return false
    }
  }

}
