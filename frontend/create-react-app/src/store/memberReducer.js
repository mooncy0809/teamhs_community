import { LOGIN_SUCCESS, SET_IS_LOGGED_IN} from './constant'; // constant.js 파일에 액션 타입을 정의해야 합니다.


const initialState = {
  member: null,
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        member: action.payload, // action에서 user 정보를 받아와 업데이트합니다.
      };
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload, // isLoggedIn을 업데이트
      };
    // 다른 액션에 대한 처리 추가
    default:
      return state;
  }
};


export default memberReducer;