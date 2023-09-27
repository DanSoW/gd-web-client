/* Библиотеки */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

/* Контекст */
import messageQueueReducer from "./reducers/MessageQueueSlice";
import authReducer from "./reducers/AuthSlice";
import adminReducer from "./reducers/AdminSlice";
import userReducer from "./reducers/UserSlice";
import mailerReducer from "./reducers/MailerSlice";
import filterInfoReducer from "./reducers/FilterInfoSlice";
import filterReducer from "./reducers/FilterSlice";
import StoreConstants from "src/constants/store";

/* Главный Reducer */
const rootReducer = combineReducers({
  messageQueueReducer,
  authReducer,
  adminReducer,
  userReducer,
  mailerReducer,
  filterInfoReducer,
  filterReducer
});

// Конфигурация Persist
const persistConfig = {
  key: StoreConstants.MAIN_STORE,
  storage,
  blacklist: [
    "messageQueueReducer",
    "adminReducer",
    "userReducer",
    "mailerReducer",
    "filterInfoReducer",
    "filterReducer"
  ],
};

// Создание Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Конфигурирование общего хранилища
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const setupStore = () => {
  return store;
};

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
