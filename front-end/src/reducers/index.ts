import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
// import { userReducer } from "./user.reducer";

export interface ISignInState {
    credentials: {
      password: string,
      username: string
    },
    errorMessage: string
  }

export interface IUserState {
    info: {
      id: number,
      role: string
    }
}

  export interface IState {
    signIn: ISignInState,
    user: IUserState,
  }
  
  export const state = combineReducers<IState>({
    signIn: signInReducer,
  //  user: userReducer,
  })