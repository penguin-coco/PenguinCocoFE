import req from './https.js'

export const apiAsstAddStudentList = params => req('post', '/assistant/addStudentList', params)
export const apiAsstDeleteStudentList = params => req('post', '/assistant/deleteStudentList', params)
export const apiAsstCourseList = () => req('get', '/assistant/courseList')