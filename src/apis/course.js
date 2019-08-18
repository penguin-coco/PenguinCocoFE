import req from './https.js'

export const apiGetCourses = () => req('get', '/course/getCourses')
export const apiGetStudentsData = params => req('get', '/course/getStudentsData', params)
export const apiDelCourse = params => req('post', '/course/delCourse', params)
export const apiEditCourse = params => req('post', '/course/editCourse', params)