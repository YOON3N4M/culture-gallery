const SET_MODAL_ON = "SET_MODAL_ON";
const SET_MODAL_OFF = "SET_MODAL_OFF";

export const setModalOn = (data: string) => ({ type: SET_MODAL_ON, data });
export const setModalOff = () => ({ type: SET_MODAL_OFF });
//export const setModalType = (data: string) => ({ type: SET_MODAL_TYPE, data });

export interface StateT {
  isModal: boolean;
  modalType: string;
}

const inititalState: StateT = {
  isModal: false,
  modalType: "",
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
    default:
      return state;
  }
}
