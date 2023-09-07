import { combineReducers } from 'redux';


// reducer import
import customizationReducer from './customizationReducer';
import memberReducer from './memberReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  member: memberReducer,
});

export default reducer;
