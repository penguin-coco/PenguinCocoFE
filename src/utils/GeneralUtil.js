/**
 * Some general functions are used in the CSIM Online Judge system
 * Created by Ching-Hsuan Su on 2018/06/22.
 */

export default class GeneralUtil {
  /**
   * @desc 檢測學生代碼是否符合可批改的格式 (不含package及有正確的public class name)
   * @param {string} code 學生的代碼
   * @return {booean, string} 若代碼有錯誤flag=false, 並會回傳錯誤訊息
   */
  static checkCode(code) {
    let flag = true;
    let checkErrorMsg = '';

    let subNewLineCode = code.split('\n');
    subNewLineCode.forEach((line) => {
      let subSpaceLine = line.split(' ');
      subSpaceLine.forEach((el, index) => {
        if (el == 'package') {
          flag = false;
          checkErrorMsg = '不能有 package 出現';
        } else if (el == 'public') {
          if (subSpaceLine[index + 1] == 'class') {
            if (subSpaceLine[index + 2] != 'Main') {
              flag = false;
              checkErrorMsg = '請將 public class 名稱改成 Main';
            }
          }
        }
      });
    });

    return { 'flag': flag, 'checkErrorMsg': checkErrorMsg }
  }

  /**
   * @desc 將內容複製進剪貼簿
   * @param {string} content
   */
  static copy(content) {
    var clip_area = document.createElement('textarea');
    clip_area.textContent = content;

    document.body.appendChild(clip_area);
    clip_area.select();

    document.execCommand('copy');
    clip_area.remove();
  }

  /**
   * @desc 移除array中指定元素
   * @param {array} arr
   * @param {string} item
   * @return {array} 
   */
  static removeInArray(arr, item) {
    let [...temp] = arr;
    for(var i = temp.length; i--;) {
      if(temp[i] === item.value) {
        temp.splice(i, 1);
      }
    }
    return temp
  }
}
