export interface StateT {
  isModal: boolean;
  modalType: string;
  isLogin: boolean;
  userInfo: userInfoT;
  isCustom: boolean;
  customOption: CustomOptionT;
}

export interface userInfoT {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
}

export interface CustomOptionT {
  isPrivate?: true;
  tabColor?: string;
  backgroundColor?: string;
}

const SET_MODAL_ON = "SET_MODAL_ON";
const SET_MODAL_OFF = "SET_MODAL_OFF";
const SET_SIGN_IN = "SET_SIGN_IN";
const SET_SIGN_OUT = "SET_SIGN_OUT ";
const SET_USER_INFO = "SET_USER_INFO";
//userInfo 테스트 이후 커스텀을 관리하는 동작 필요

export const setModalOn = (data: string) => ({ type: SET_MODAL_ON, data });
export const setModalOff = () => ({ type: SET_MODAL_OFF });
//export const setModalType = (data: string) => ({ type: SET_MODAL_TYPE, data });
export const setSignIn = () => ({ type: SET_SIGN_IN });
export const setSignOut = () => ({ type: SET_SIGN_OUT });
export const setUserInfo = (data: userInfoT) => ({ type: SET_USER_INFO, data });

const inititalState: StateT = {
  isModal: false,
  modalType: "",
  isLogin: false,

  userInfo: {
    displayName: undefined,
    email: undefined,
    photoURL: undefined,
    uid: undefined,
  },
  isCustom: false,
  customOption: { isPrivate: true, tabColor: "", backgroundColor: "" },
};

export default function store(state = inititalState, action: any) {
  switch (action.type) {
    case SET_MODAL_ON:
      return {
        ...state,
        isModal: true,
        modalType: action.data,
      };
    case SET_MODAL_OFF:
      return {
        ...state,
        isModal: false,
        modalType: "",
      };
    case SET_SIGN_IN:
      return {
        ...state,
        isLogin: true,
      };
    case SET_SIGN_OUT:
      return {
        ...state,
        isLogin: false,
      };
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.data,
      };
    default:
      return state;
  }
}
