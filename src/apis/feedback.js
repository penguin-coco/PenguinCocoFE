import req from './https.js'

export const apiAddFeedback = params => req('post', '/feedback/addFeedback', params)
export const apiGetCourseFeedbacks = params => req('get', '/feedback/getCourseFeedbacks', params)