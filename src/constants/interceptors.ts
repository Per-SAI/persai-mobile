import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

let token = '';

export const setAuthToken = (authToken: string) => {
  token = authToken;
};

export const onRequest = (config: InternalAxiosRequestConfig) => {
  config.headers.set('idToken', `${token}`);
  return config;
};

export const onRequestError = (error: AxiosError) => {
  // Do something with the request error
  return Promise.reject(error);
};

export const onResponseSuccess = (response: AxiosResponse) => {
  // Do something with the response data
  return response;
};

export const onResponseError = (error: AxiosError) => {
  // Do something with the response error
  return Promise.reject(error);
};