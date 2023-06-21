import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeSkillLevelsApi } from "../Services";

export const store = configureStore({
    reducer: {
        [employeeSkillLevelsApi.reducerPath]: employeeSkillLevelsApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(employeeSkillLevelsApi.middleware)
});

setupListeners(store.dispatch);