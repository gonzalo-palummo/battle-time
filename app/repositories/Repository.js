import axios from 'axios';
import {store} from 'app/store/index';
import {BaseSetting} from '@config';
import {ApplicationActions} from '@actions';
import * as RootNavigation from '../navigation/RootNavigation';
import {Alert} from 'react-native';

const repository = axios.create({
  baseURL: BaseSetting.apiUrl,
});

repository.interceptors.request.use(
  function(config) {
    console.log('Request: ', config);
    store.dispatch(ApplicationActions.incrementLoading());
    return config;
  },
  function(error) {
    console.log('Request error: ', error);
    store.dispatch(ApplicationActions.decrementLoading());
    return Promise.reject(error);
  },
);

repository.interceptors.response.use(
  function(response) {
    console.log('Response: ', response);
    store.dispatch(ApplicationActions.decrementLoading());
    return response.data.data;
  },
  function(error) {
    console.log('Response error: ', error.response);
    store.dispatch(ApplicationActions.decrementLoading());
    if (error.response.status === 422) {
      Alert.alert(
        'Ups!',
        error.response.data.errors[0].msg[0].toUpperCase() +
          error.response.data.errors[0].msg.slice(1),
      );
    } else if (error.response.status === 500) {
      RootNavigation.navigate('Errors', {errorCode: 500});
    } else if (error.response.status === 401) {
      RootNavigation.navigate('Errors', {errorCode: 401});
    } else {
      RootNavigation.navigate('Errors', {errorCode: 404});
    }
    return Promise.reject(error); // IF I REJECT THE PROMISE, ANYTHING WILL THROW ERROR BECAUSE THE LINES BELOW THE AWAIT WON'T BE READED
  },
);

export function checkAuth() {
  const state = store.getState();
  const token = state.auth.token ? 'Bearer ' + state.auth.token : null;
  if (token) {
    repository.defaults.headers.common['Authorization'] = token;
  } else {
    delete repository.defaults.headers.common['Authorization'];
  }
}

export default repository;
