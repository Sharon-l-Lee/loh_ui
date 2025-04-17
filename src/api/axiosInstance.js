import { axios } from 'axios';  

const url ="https://localhost:8888/api/"

const axiosInstance = (url, param, options) => {
    const instance = axios.create({
        baseURL: url,
        timeout: 1000
    });
}


axiosInstance.interceptors.request.use((config)=> {
    //로딩 처리
    return config;
  }, (error)=> {
    // 요청 오류 처리
    return Promise.reject(error);
  });


axiosInstance.interceptors.response.use(function (response) {
    // 로딩 완료 처리
    return response;
  }, function (error) {
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  });

export default axiosInstance;