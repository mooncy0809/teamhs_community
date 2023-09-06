/*import {createStore} from 'redux';
import rootReducer from './reducer';


// 초기 상태 정의
const initialState = {
    member: null,
    user: null,
    customization: {
        borderRadius: 0,
    },
};

const store = createStore(rootReducer);

export default store;*/

import { createStore, combineReducers } from 'redux';
import memberReducer from './memberReducer'; // 실제 reducer 파일명에 따라 수정해야 할 수도 있습니다.
import customizationReducer from './customizationReducer'; // customizationReducer 파일명에 따라 수정해야 할 수도 있습니다.

const rootReducer = combineReducers({
  member: memberReducer,
  customization: customizationReducer,
  // 다른 리듀서들도 필요한 경우 추가
});

const store = createStore(rootReducer);

export default store;