import { UserInfo } from 'types/domain';

//TODO type만 있는게 맞는지

export enum UserActionType {
  POST_SIGN_UP_START = 'user/POST_SIGN_UP_START',
  POST_SIGN_UP_SUCCESS = 'user/POST_SIGN_UP_SUCCESS',
  POST_SIGN_UP_FAILURE = 'user/POST_SIGN_UP_FAILURE',

  POST_SIGN_IN_START = 'user/POST_SIGN_IN_START',
  POST_SIGN_IN_SUCCESS = 'user/POST_SIGN_IN_SUCCESS',
  POST_SIGN_IN_FAILURE = 'user/POST_SIGN_IN_FAILURE',

  PATCH_USER_INFO_START = 'user/PATCH_USER_INFO_START',
  PATCH_USER_INFO_SUCCESS = 'user/PATCH_USER_INFO_SUCCESS',
  PATCH_USER_INFO_FAILURE = 'user/PATCH_USER_INFO_FAILURE',

  PATCH_NEW_PASSWORD_START = 'user/PATCH_NEW_PASSWORD_START',
  PATCH_NEW_PASSWORD_SUCCESS = 'user/PATCH_NEW_PASSWORD_SUCCESS',
  PATCH_NEW_PASSWORD_FAILURE = 'user/PATCH_NEW_PASSWORD_FAILURE',

  DELETE_USER_START = 'user/DELETE_USER_START',
  DELETE_USER_SUCCESS = 'user/DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE = 'user/DELETE_USER_FAILURE',

  AUTO_SIGN_IN_START = 'user/AUTO_SIGN_IN_START',
  AUTO_SIGN_IN_SUCCESS = 'user/AUTO_SIGN_IN_SUCCESS',
  AUTO_SIGN_IN_FAILURE = 'user/AUTO_SIGN_IN_FAILURE',

  SIGN_OUT_ACTION = 'user/SIGN_OUT',
}

interface PostSignUpStart {
  type: UserActionType.POST_SIGN_UP_START;
}

interface PostSignUpSuccess {
  type: UserActionType.POST_SIGN_UP_SUCCESS;
}

interface PostSignUpFailure {
  type: UserActionType.POST_SIGN_UP_FAILURE;
  payload: string;
}

interface PostSignInStart {
  type: UserActionType.POST_SIGN_IN_START;
}

interface PostSignInSuccess {
  type: UserActionType.POST_SIGN_IN_SUCCESS;
  payload: UserInfo;
}

interface PostSignInFailure {
  type: UserActionType.POST_SIGN_IN_FAILURE;
  payload: string;
}

interface SignOutAction {
  type: UserActionType.SIGN_OUT_ACTION;
}

interface PatchUserInfoStart {
  type: UserActionType.PATCH_USER_INFO_START;
}

interface PatchUserInfoSuccess {
  type: UserActionType.PATCH_USER_INFO_SUCCESS;
}
interface PatchUserInfoFailure {
  type: UserActionType.PATCH_USER_INFO_FAILURE;
}

interface PatchNewPasswordStart {
  type: UserActionType.PATCH_NEW_PASSWORD_START;
}

interface PatchNewPasswordSuccess {
  type: UserActionType.PATCH_NEW_PASSWORD_SUCCESS;
}
interface PatchNewPasswordFailure {
  type: UserActionType.PATCH_NEW_PASSWORD_FAILURE;
}

interface DeleteUserStart {
  type: UserActionType.DELETE_USER_START;
}

interface DeleteUserSuccess {
  type: UserActionType.DELETE_USER_SUCCESS;
}
interface DeleteUserFailure {
  type: UserActionType.DELETE_USER_FAILURE;
}

interface AutoSignInStart {
  type: UserActionType.AUTO_SIGN_IN_START;
}

interface AutoSignInSuccess {
  type: UserActionType.AUTO_SIGN_IN_SUCCESS;
  payload: UserInfo;
}
interface AutoSignInFailure {
  type: UserActionType.AUTO_SIGN_IN_FAILURE;
}

export type UserAction =
  | PostSignUpStart
  | PostSignUpSuccess
  | PostSignUpFailure
  | PostSignInStart
  | PostSignInSuccess
  | PostSignInFailure
  | SignOutAction
  | PatchUserInfoStart
  | PatchUserInfoSuccess
  | PatchUserInfoFailure
  | PatchNewPasswordStart
  | PatchNewPasswordSuccess
  | PatchNewPasswordFailure
  | DeleteUserStart
  | DeleteUserSuccess
  | DeleteUserFailure
  | AutoSignInStart
  | AutoSignInSuccess
  | AutoSignInFailure;
