const BASE_URL = 'http://127.0.0.1:8090'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
type Options = {
  baseURL?: string
  method?: Method
  params?: any
  body?: any
  onRequest?: (options:any) => void
  onResponse?: (response:any) => void
  onResponseError?: (response:any) => void

}
interface IhandleMap {
  [key: number]: () => void
}
function handleError(response:any={}) {
  const err = (text:string) => {
    console.log(`~ file: request.ts ~ err ~ text:`, text)
    // Message.error({
    //   content: response?._data?.message ?? text,
    //   icon: () => h(IconEmoticonDead),
    // })
  }
  if (!response._data) {
    err('请求超时，服务器无响应！')
    return
  }
  // const userStore = useUserStore()
  const handleMap: IhandleMap = {
    404: () => err('服务器资源不存在'),
    500: () => err('服务器内部错误'),
    403: () => err('没有权限访问该资源'),
    401: () => {
      err('登录状态已过期，需要重新登录')
      // userStore.clearUserInfo()
      // TODO 跳转实际登录页
      navigateTo('/')
    },
  }
  handleMap[response.status] ? handleMap[response.status]() : err('未知错误！')
}

class HttpRequest {
  request(
    url:string,
    method: Method,
    data:any={},
    options: Options,
  ):Promise<unknown> {
    return new Promise((resolve, reject) => {
      const newOptions = {
        baseURL: BASE_URL,
        method,
        ...options,
        onRequest({ options }: any) {
          // 添加baseURL,nuxt3环境变量要从useRuntimeConfig里面取
          // const { public: { apiBase } } = useRuntimeConfig()
          // options.baseURL = apiBase
          // 添加请求头,没登录不携带token
          // const userStore = useUserStore()
          // if (!userStore.isLogin)
          //   return
          // options.headers = new Headers(options.headers)
          // options.headers.set('Authorization', `Bearer ${userStore.getToken}`)
        },
        onResponse({ response }:{response:any}) {
          if (response.headers.get('content-disposition') && response.status === 200)
            return response
          // 在这里判断错误
          if (response._data.code !== 200) {
            handleError(response)
            return Promise.reject(response._data)
          }
          // 成功返回
          return response._data
        },
        // 错误处理
        onResponseError({ response }: { response: any }) {
          handleError(response)
          return Promise.reject(response?._data ?? null)
        },
      }

      if (method === 'GET' || method === 'DELETE')
        newOptions.params = data

      if (method === 'POST' || method === 'PUT')
        newOptions.body = data

      useFetch(url, newOptions)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // 封装常用方法

  get(url:string, params = {}, options = {}) {
    return this.request(url, 'GET', params, options)
  }

  post(url:string, data = {}, options = {}) {
    return this.request(url, 'POST', data, options)
  }

  Put(url:string, data = {}, options = {}) {
    return this.request(url, 'PUT', data, options)
  }

  Delete(url:string, params = {}, options = {}) {
    return this.request(url, 'DELETE', params, options)
  }
}

const httpRequest = new HttpRequest()

export default httpRequest