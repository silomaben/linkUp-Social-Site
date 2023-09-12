import { UserStateInterface } from "../userState.interface";
import { createFeatureSelector, createReducer , createSelector, on } from '@ngrx/store'
import * as UserACtions from './actions'

export const initialState: UserStateInterface = {
    is_authenticated: false,
    userDetails: null,
  };


// Selectors
export const selectUserState = createFeatureSelector<UserStateInterface>('user');

export const selectIsLoggedIn = createSelector(
  selectUserState,
  (state: UserStateInterface) => state.is_authenticated
);

export const selectUserDetails = createSelector(
  selectUserState,
  (state: UserStateInterface) => state.userDetails
);

  // Reducer
export function userReducer(state: UserStateInterface = initialState, action: any): UserStateInterface {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          is_authenticated: true,
          userDetails: action.userDetails,
        };
      case 'LOGOUT':
        return {
          ...state,
          is_authenticated: false,
          userDetails: null,
        };
      default:
        return state;
    }
  }