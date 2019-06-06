import axios from 'axios';
import {ActionCreator} from './reducer/user/user';


/**
 * Api for work with server
 * @param {Function} dispatch
 * @return {AxiosInstance}
 */
export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    dispatch(ActionCreator.checkAuthorization(true));
    return response;
  };

  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.checkAuthorization(false));
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
