export let setGradingObj = (correctList) => {
  let tempList = [];

  correctList.forEach((ele) => {
    let obj = {
      studentAccount: ele.studentAccount,
      code: ele.code,
      correctValue: {
        score: 0,
        comment: ''
      },
      readValue: {
        score: 0,
        comment: ''
      },
      skillValue: {
        score: 0,
        comment: ''
      },
      completeValue: {
        score: 0,
        comment: ''
      },
      wholeValue: {
        score: 0,
        comment: ''
      },
      comment: ''
    }
    tempList.push(obj);
  });
  
  return tempList;
};