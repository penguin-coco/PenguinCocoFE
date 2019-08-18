const course = {
  state: {
    courseInfo: {
      courseId: '',
      courseName: '',
      teacherName: '',
      semester: '',
      class: [],
      taList: []
    },
  },
  mutations: {
    initCourseInfo(state, courseInfo) {
      state.courseInfo = courseInfo;
    },
    cleanCourseInfo(state) {
      state.courseInfo = {
        courseId: '',
        courseName: '',
        teacherName: '',
        semester: '',
        class: [],
        taList: []
      }
    }
  },
}

export default course;