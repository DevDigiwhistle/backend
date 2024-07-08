import axios from 'axios'

interface IAxiosService{
    post(url: string, data: any, headers?: any): Promise<any>
    get(url: string,params?: any,headers?: any): Promise<any>
}

class AxiosService implements IAxiosService {
  public async post(url: string, data: any, headers?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, {
          headers: headers === undefined ? {} : headers,
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  public async get(url: string,params?: any,headers?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(url,{
          headers: headers === undefined ? {} : headers,
          params: params===undefined?{}: params
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
}

export {
    AxiosService,
    IAxiosService
}