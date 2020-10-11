import request from '@/utils/request'

// 获取正在热映的数据
export const getData = (id: number) => {
  return request({
    url: `api?id=${id}`
  })
}
export const getImg = (id: number) => {
  return request({
    url: `api/generateimage?id=${id}`
  })
}

// 根据类型，获取电影列表
export const getMovieList = ({ type = '', start = 0, count = 5 }) => {
  return request({
    url: `${type}?start=${start}&count=${count}`
  })
}

// 根据电影id获取电影信息
export const getMoveInfo = (id: string) => {
  return request({
    url: `/subject/${id}`
  })
}
