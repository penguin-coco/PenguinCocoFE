import {apiCheckLogin} from './base.js'

// student
export const studentCheckLogin = () => {
  apiCheckLogin().then((response) => {
    let res = response.data;
    if (res.status == "200") {
      if (res.result.authority == 'student') {
        // pass
      } else if (res.result.authority == 'teacher') {
        this.$router.push('/teacher/courseList');
      } else if (res.result.authority == 'assistant') {
        this.$router.push('/assistant/courseList');
      } else if (res.result.authority == 'admin') {
        this.$router.push('/admin/index');
      }  
    } else {
      this.$router.push('/login');
    }
  });
}

// teacher
export const teacherCheckLogin = () => {
  apiCheckLogin().then((response) => {
    let res = response.data;
    if (res.status == "200") {
      if (res.result.authority == 'student') {
        this.$router.push('/student/courseList')
      } else if (res.result.authority == 'teacher') {
        // pass
      } else if (res.result.authority == 'assistant') {
        this.$router.push('/assistant/courseList');
      } else if (res.result.authority == 'admin') {
        this.$router.push('/admin/index');
      }  
    } else {
      this.$router.push('/login');
    }
  });
}

// assistant
export const assistantCheckLogin = () => {
  apiCheckLogin().then((response) => {
    let res = response.data;
    if (res.status == "200") {
      if (res.result.authority == 'student') {
        this.$router.push('/student/courseList')
      } else if (res.result.authority == 'teacher') {
        this.$router.push('/teacher/courseList');
      } else if (res.result.authority == 'assistant') {
        // pass
      } else if (res.result.authority == 'admin') {
        this.$router.push('/admin/index');
      }  
    } else {
      this.$router.push('/login');
    }
  });
}

// quesbank
export const quesbankCheckLogin = () => {
  apiCheckLogin().then((response) => {
    let res = response.data;
    if (res.status == "200") {
      if (res.result.authority == 'student') {
        this.$router.push('/student/courseList')
      } else if (res.result.authority == 'teacher') {
        // pass
      } else if (res.result.authority == 'assistant') {
        // pass
      } else if (res.result.authority == 'admin') {
        this.$router.push('/admin/index');
      }  
    } else {
      this.$router.push('/login');
    }
  });
}