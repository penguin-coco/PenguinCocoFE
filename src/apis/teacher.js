import req from './https.js'

export const apiCreateCourse = params => req('post', '/teacher/createCourse', params)
export const apiDeleteCourse = params => req('post', '/teacher/deleteCourse', params)
export const apiTrAddStudentList = params => req('post', '/teacher/addStudentList', params)
export const apiTrDeleteStudentList = params => req('post', '/teacher/deleteStudentList', params)
export const apiTrCourseList = () => req('get', '/teacher/courseList')
export const apiStudentClassList = () => req('get', '/teacher/studentClassList')
export const apiAssistantList = () => req('get', '/teacher/assistantList')
export const apiAddAssistantList = params => req('post', '/teacher/addAssistantList', params)
export const apiDeleteAssistantList = params => req('post', '/teacher/deleteAssistantList', params)
export const apiUnassignAssistantList = params => req('get', '/teacher/unassignAssistantList', params)