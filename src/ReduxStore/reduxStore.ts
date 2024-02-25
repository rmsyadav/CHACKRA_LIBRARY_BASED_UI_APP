import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "../Reducers/rootReducer";
import { AppStore } from "../Types";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
//import sessionStorage from "redux-persist/es/storage/session";

// function persistStore(store: Store, persistorOptions?: PersistorOptions | null, callback?: () => any): Persistor

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store:AppStore = configureStore({
    reducer:persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

const persistor = persistStore(store);

export  {persistor,store} ;