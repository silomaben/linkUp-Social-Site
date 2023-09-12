import { createAction, props } from '@ngrx/store';

export const login = createAction(
  'LOGIN_SUCCESS',
  props<{ userDetails: any }>() // Replace 'any' with your user details interface
);

export const logout = createAction('LOGOUT');