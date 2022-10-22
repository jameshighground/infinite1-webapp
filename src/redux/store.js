import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
	navReducer,
} from "./modules";
import * as modules from "services/modules";
import {api} from "services/api";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducer = combineReducers({
	nav: navReducer,
	...Object.values(modules).reduce(
		(acc, module) => ({
			...acc,
			[module.reducerPath]: module.reducer,
		}),
		{}
	),
});

const persistConfig = {
	key: "infinite1",
	storage,
	//whitelist: ["auth"],
};


const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export const persistor = persistStore(store);
