import req from './https.js'

export const apiChangePassword = params => req('post', '/student/changePassword', params)
export const apiStudCourseList = () => req('get', '/student/courseList')
export const apiStudInfo = params => req('get', '/student/info', params)
export const apiHistoryScore = params => req('get', '/student/historyScore', params)
export const apiProblemInfo = params => req('get', '/student/problemInfo', params)
export const apiUpdateRate = params => req('post', '/student/updateRate', params)
export const apiAllStud = params => req('get', '/student/allStud', params)