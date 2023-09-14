import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import memberReducer from './memberReducer';
import customizationReducer from './customizationReducer';

const rootReducer = combineReducers({
  member: memberReducer,
  customization: customizationReducer,
  // 다른 리듀서들도 필요한 경우 추가
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // 변수 이름 수정

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export default store;
export { persistor};