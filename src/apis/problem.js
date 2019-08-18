import req from './https.js'

export const apiGetInfo = params => req('get', '/problem/getInfo', params)
export const apiGetProblems = params => req('get', '/problem/getProblems', params)
export const apiAddProblem = params => req('post', '/problem/addProblem', params)
export const apiEditProblem = params => req('post', '/problem/editProblem', params)
export const apiDeleteProblem = params => req('post', '/problem/deleteProblem', params)