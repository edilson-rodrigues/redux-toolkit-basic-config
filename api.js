import { createAction } from '@reduxjs/toolkit';

// aqui criamos nossas actions para utilizar no thunk
export const apiCallBegan = createAction("api/callBegan"); // começa a requisição
export const apiCallSuccess = createAction("api/callSuccess"); // quando a requisição deu sucesso
export const apiCallFailed = createAction("api/callFailed"); // se retornar algum erro

// 1 - começamos por aqui definindo nossa action api