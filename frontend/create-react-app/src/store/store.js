import {createStore} from 'redux';


// 초기 상태 정의
const initialState = {
    member: null,

};

// 리듀서 정의
function rootReducer(state = initialState, action){
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return{
                ...state,
                member: action.payload,
            };
        case 'LOGOUT':
            return{
                ...state,
                member: null,
            };
        default:
            return state;
    }
}

const store = createStore(rootReducer);
export default store;

