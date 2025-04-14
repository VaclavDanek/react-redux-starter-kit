/* eslint-disable @typescript-eslint/no-unused-vars */

import { from } from 'rxjs'
import { catchError, switchMap, map, finalize } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import i18n from 'i18next'
import api from '../services/api'

// redux
import { authTypes, authActions } from '../redux/authRedux'
import { generalActions } from '../redux/generalRedux'

// types
import type { AnyAction } from 'redux'
import type { Observable } from 'rxjs'
import type { StateObservable } from 'redux-observable'
import type { AxiosError } from '../types/errorTypes'
import type { State } from '../store/reducers'
import type { AuthAction } from '../redux/authRedux'
export interface LoginRequestResponse {
  access_token: string;
  token_type: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  iat?: number;
}

export default [
  (action$, state$: StateObservable<State>): Observable<AnyAction> => (
    action$.pipe(
      ofType(authTypes.LOGIN_REQUEST),
      switchMap(({ payload }: AuthAction<'loginRequest'>) =>
        from(api.login(payload.username, payload.password)).pipe(
          switchMap((response) => {
            const { access_token, token_type, expires_in, iat } = response.data
            let authorization = ''
            if (token_type === 'Bearer') {
              authorization = `Bearer ${access_token}`
            }
            return [
              authActions.loginRequestSuccess(authorization, expires_in, iat),
            ]
          }),
          catchError((error: AxiosError) => {
            const status: number = error.response?.status ?? 503
            return [
              authActions.setError({ status, message: i18n.t(`errors.login.${status}`) }),
              generalActions.onRequestFailure(error),
            ]
          }),
        )
      )
    )
  )
]
