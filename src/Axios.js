import axios from 'axios';
import { getUserToken } from './Components/Bujji/Functions/localStorage';

const token = getUserToken()

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 60000, 
  headers: token ? { Authorization: `Bearer ${token}` } : {}, 
});

const apiCall = (endpoint, body, method, loadingState, onSuccess, onFail = null) => {
  loadingState(true);

  instance[method](endpoint, body)
    .then(response => {
      let data = response.data;
      loadingState(false);
      return onSuccess(data);
    })
    .catch(error => {
      loadingState(false);
      return onFail && onFail(error.response?.data);
    });
}

export default apiCall;
