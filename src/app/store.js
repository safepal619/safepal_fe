import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "../services/cryptoApi";
// import { cryptoNewsApi } from "../services/cryptoNewApi";
import userSlice from "../services/userSlice";
import storage from 'redux-persist/lib/storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
    // Specify the reducers you want to persist
    whitelist: ['user'], // In this example, we persist the 'user' reducer
  };


  const rootReducer = combineReducers({
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    // [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    user: userSlice
  })


  const persistedReducer = persistReducer(persistConfig, rootReducer);


export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    
            getDefaultMiddleware({
                serializableCheck: {
                  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
              }).concat(cryptoApi.middleware,[]),
       
            //  cryptoNewsApi.middleware
    

})