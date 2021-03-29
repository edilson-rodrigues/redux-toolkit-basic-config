import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import moment from 'moment';
import { apiCallBegan } from './api';

// 3 - configurando nosso slice, reducer, selectors e action creators

const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    // actions => actions handlers
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
    /* bugs/bugsReceived */
    bugsReceived: (bugs, action) => {
      // recebendo o response data depois de um
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
  }
});

const {
  bugsReceived,
  bugsRequested,
  bugsRequestFailed
} = slice.actions;

export default slice.reducer;

// Action Creators
const url = "/bugs";

// assignature this function: () => {} // fn(dispatch, getState)
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs; // verificando a ultima requisição

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');

  if (diffInMinutes < 10) return;

  // quando despachamos os valores para nossa api, passamos o typo da ação conforme a nossa regra de negocio
  return dispatch(
    apiCallBegan({
      url, // url para a requisição
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    }),
  );
}

// Memoization
// aqui criamos nosso selectors 
export const getBugsByUser = userId =>
  createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId),
  );


