const admin = {
  state: {
    selectedClass: '' // AdminClassList: 正在檢視的班級
  },
  mutations: {
    setSelectedClass(state, className) {
      state.selectedClass = className;
    }
    // clean(state) {
    //   state.courseInfo = {
    //     courseId: '',
    //     courseName: '',
    //     teacherName: '',
    //     semester: '',
    //     class: [],
    //     taList: []
    //   }
    // }
  },
}

export default admin;