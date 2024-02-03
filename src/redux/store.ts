import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./features/user/userSlice"
import baseApi from './api/baseApi'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath] : baseApi.reducer,
    user : userReducer
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(baseApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch