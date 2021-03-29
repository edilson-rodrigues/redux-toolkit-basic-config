import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import reducer from './reducer'; // meus reducers ou entidades
import api from './middleware/api'; // minha thunk detro de middleware

// 4 - caso tenha os reducer configurado
export default () => configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware(),
    //getDefaultMiddleware é útil se você quiser adicionar alguns middleware personalizado,    
    api // add minha thunk
  ]
});