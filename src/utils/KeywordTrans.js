let tagToLogicTable = {
  'Java': {
    '條件': ['if', 'if else'],
    '迴圈': ['for', 'while'],
    'for迴圈': ['for'],
    'while迴圈': ['while'],
    'switch': ['switch']
  }
}

export let toKeys = (t) => {
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