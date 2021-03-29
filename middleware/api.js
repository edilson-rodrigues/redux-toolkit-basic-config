import axios from 'axios';
import * as actions from '../api';

// 2 - aqui é a nossa thunk

const api = ({ dispatch }) => next => async action => {
  // verifica o tipo da action
  if (action.type !== actions.apiCallBegan.type) return next(action);

  //os valores que vem da nossa action api 
  /* 
  vem do reducer bug
  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    }),
  ); */
  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  // se o onStart for verdadeiro ele dispacha o onStart
  if (onStart) dispatch({ type: onStart });

  //depois vai para proxima action que será nossa requisição contendo os valores definidos na nossa action apiCallBegan
  next(action);

  try {
    const response = await axios.request({
      baseURL: 'http://localhost:9001/api',
      url,
      method,
      data
    });
    // General
    // se a resposta for sucesso ele vai despachar no response data 
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    // aqui para a nossa action type definada no valor de OnSuccess
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });

  } catch (error) {
    // General
    //mesmo caso do exemplo acima porem para erros
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError) dispatch({ type: onError, payload: error.message });
  }
}

export default api;