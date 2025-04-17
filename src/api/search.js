import { axios } from './axiosInstance.js';  


axios.get('/search')
  .then(()=> {
    // 성공 핸들링
    console.log(response);
  })
  .catch((error)=> {
    // 에러 핸들링
    console.log(error);
  })
  .finally(()=> {
    // 항상 실행되는 영역
  });