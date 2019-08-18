import req from './https.js'

export const apiCreateTeam = params => req('post', '/team/createTeam', params)
export const apiCorrectStuds = params => req('get', '/team/correctStuds', params)
export const apiCheckCorrectStatus = params => req('get', '/team/checkCorrectStatus', params)
export const apiCorrectInfo = params => req('get', '/team/correctInfo', params)
export const apiCheckCorrectedStatus = params => req('get', '/team/checkCorrectedStatus', params)
export const apiCorrectedInfo = params => req('get', '/team/correctedInfo', params)
export const apiSubmitCorrect = params => req('post', '/team/submitCorrect', params)
export const apiDiscussScore = params => req('get', '/team/discussScore', params)