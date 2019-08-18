import req from './https.js'

export const apiCorrectRank = params => req('get', '/rank/getCorrectRank', params)
export const apiBestCodeRank = params => req('get', '/rank/getBestCodeRank', params)