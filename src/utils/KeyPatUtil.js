/**
 * Functions are used to destructing keywords and checking code
 * Created by Ching-Hsuan Su on 2019/07/17.
 */

let tagToLogicTable = {
  'Java': {
    '條件': ['if', 'if else'],
    '迴圈': ['for', 'while'],
    'for迴圈': ['for'],
    'while迴圈': ['while'],
    'switch': ['switch']
  }
}

export default class KeyPatUtil {
  /**
   * @desc 將不同程式語言限制的tag, 轉換成keywords
   * @param {array} t tags
   * @return {array} keywords
   */
  static toKeys(t) {
    let [...tags] = t;
    let langs = ['Java', 'Python'];
    let nowLang = ''; // 現在使用的lang
  
    // 先過濾語言
    langs.forEach((lang) => {
      let index = tags.indexOf(lang);
      // console.log(index);
      if (index>=0) {
        nowLang = tags[index];
        tags.splice(index, 1);
      }
    });
  
    // 回傳keywords
    let keywords = [];
    tags.forEach((tag) => {
      let tagList = tagToLogicTable[nowLang][tag];
      tagList.forEach((t) => {
        keywords.push(t);
      })
    });
    return keywords;
  }

  /**
   * @desc 檢查程式碼是否包含某些字串. 檢查通過(包含)回傳true
   * @param {array} ruleArr 程式碼需包含的某些特定字串
   * @param {string} code 程式碼
   * @return {array} keywords
   */
  static isInRule(ruleArr, code) {
    if (ruleArr.length != 0) {
      let includeKeyFlag = true;
      ruleArr.forEach((key) => {
        if(code.indexOf(key)<0) includeKeyFlag=false;
      });

      if(includeKeyFlag) {
        return true;
      } else {
        return false;
      }
    }
  }

}