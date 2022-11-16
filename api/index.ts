import axios from 'axios'

interface Obj {
  [key: string]: any
}

interface ProxyOption {
  query?: Obj,
  data?: Obj,
}

const ins = axios.create({
  baseURL: '/api',
})

function handleUrl(path: string, query?: Obj) {
  if (query)
    return path + '?' + Object.keys(query || {}).map((key) =>
      `${key}=${query[key]}`
    ).join('&')
  return path
}

function proxy(path: string) {
  return function (option?: ProxyOption) {
    return ins.get(handleUrl(path, option?.query))
  }
}

export const modules = {
  file: {
    get: proxy('/file'),
  }
}

