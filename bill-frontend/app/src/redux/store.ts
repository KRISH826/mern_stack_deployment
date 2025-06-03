import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import dashboardReducer from './dashboard/dashboardSlice'
import billReducer from './bill/billSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    bill: billReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch