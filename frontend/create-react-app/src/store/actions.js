// action - customization reducer

import { LOGIN_SUCCESS, SET_IS_LOGGED_IN } from "./constant"; // eslint-disable-line no-unused-vars

export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';

export const loginSuccess = (user) => {
    console.log("user: " + user);
    return {
      type: 'LOGIN_SUCCESS',
      payload: user,
    };
  };
  
export const setIsLoggedIn = (isLoggedIn) => {
    return {
      type: SET_IS_LOGGED_IN,
      payload: isLoggedIn,
    };
  };