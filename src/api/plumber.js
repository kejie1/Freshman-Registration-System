import request from '@/utils/request'

// plumber api
export function getPlumberList() {
  return request({
    url: '',
    method: 'get'
  })
}
export function addPlumber(data) {
  return request({
    url: '',
    method: 'post',
    data
  })
}
export function updatePlumber(data) {
  request({
    url: '',
    method: 'post',
    data
  })
}
export function delPlumber(data) {
  request({
    url: '',
    method: 'delete',
    data
  })
}
export function updatePlumberStatus(data) {
  request({
    url: '',
    method: 'post',
    data
  })
}

