import { LOGIN_SUCCESS } from './constant'; // constant.js 파일에 액션 타입을 정의해야 합니다.

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
    // 다른 액션에 대한 처리 추가
    default:
      return state;
  }
};

export default memberReducer;