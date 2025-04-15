import { ErrorTypesEnum } from '../types/errorTypes'
import { store } from '../main'
import { generalActions } from '../redux/generalRedux'
import { authActions } from '../redux/authRedux'

// types
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export const requestInterceptor = [
  (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    store.dispatch(generalActions.onStartFetching());
    return request;
  },
  (error: any): Promise<any> => {
    store.dispatch(generalActions.onRequestFailure(error));
    return Promise.reject(error);
  }
]

export const responseInterceptor = [
  (response: AxiosResponse): AxiosResponse => {
    store.dispatch(generalActions.onStopFetching());
    return response;
  },
  (error: any): Promise<any> => {
    store.dispatch(generalActions.onStopFetching());
    let errorType: ErrorTypesEnum = ErrorTypesEnum.WARNING;
    switch (error?.response?.status) {
      case 500:
      case 403:
        errorType = ErrorTypesEnum.CRITICAL;
        break
      case 401:
        errorType = ErrorTypesEnum.INFO; // probably just wrong authentication credentials
        if (store.getState().auth.authorization) { // probably expired session
          store.dispatch(authActions.logout())
          store.dispatch(generalActions.toggleModal('authExpireAlert', true))
        }
        break
    }
    store.dispatch(generalActions.onRequestFailure(error, errorType));
    return Promise.reject(error);
  }
]

export { default as withRouter } from './withRouter'
export { default as withReducers } from './withReducers'
