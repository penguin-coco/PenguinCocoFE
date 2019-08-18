import req from './https.js'

export const apiAddProblem = params => req('post', '/problemBank/addProblem', params)
export const apiEditProblem = params => req('post', '/problemBank/editProblem', params)
export const apiGetAllProblem = () => req('get', '/problemBank/getAllProblem')
export const apiGetProblemInfo = params => req('get', '/problemBank/getProblemInfo', params)
export const apiDeleteProblem = params => req('post', '/problemBank/deleteProblem', params)
