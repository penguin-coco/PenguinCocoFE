import {apiCheckLogin} from './base.js'
import {tip, toLogin, to403Page} from './utils.js'

// student
export const studentCheckLogin = () => {
  apiCheckLogin().then((response) => {
    let res = response.data;
    if (res.status == "200") {
      if (res.result.authority == 'student') {
        // pass
      } else {
        to403Page();
      }
    } else {
      toLogin();
    }
  }).catch((error) => {
    if (error.response.status == '401') {
      tip('登入過期，請重新登入');
      setTimeout(() => {
        toLogin();
      }, 1000);
    }
  });
}

// teacher
export const teacherCheckLogin = () => {
  apiCheckLogin().then((response) => {
    let res = response.data;
    if (res.status == "200") {
      if (res.result.authority == 'teacher') {
        // pass
      } else {
        to403Page();
      }
    } else {
      toLogin();
    }
  }).catch((error) => {
    if (error.response.status == '401') {
      tip('登入過期，請重新登入');
      setTimeout(() => {
        toLogin();
      }, 1000);
    }
  });
}

// assistant
export const assistantCheckLogin = () => {
  apiCheckLogin().then((response) => {
    let res = response.data;
    if (res.status == "200") {
      if (res.result.authority == 'assistant') {
        // pass
      } else {
        to403Page();
      }
    } else {
      toLogin();
    }
  }).catch((error) => {
    if (error.response.status == '401') {
      tip('登入過期，請重新登入');
      setTimeout(() => {
        toLogin();
      }, 1000);
    }
  });
}

// quesbank
export const quesbankCheckLogin = () => {
  apiCheckLogin().then((response) => {
    let res = response.data;
    if (res.status == "200") {
      if (res.result.authority=='teacher' || res.result.authority=='assistant') {
        // pass
      } else {
        to403Page();
      }
    } else {
      toLogin();
    }
  }).catch((error) => {
    if (error.response.status == '401') {
      tip('登入過期，請重新登入');
      setTimeout(() => {
        toLogin();
      }, 1000);
    }
  });
}