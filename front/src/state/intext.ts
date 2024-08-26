import { configureStore } from '@reduxjs/toolkit';
import { studentsApi } from './api';

export const store = configureStore({
    reducer: {
      [studentsApi.reducerPath]: studentsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(studentsApi.middleware),
  });
  
  // Tipos de RootState y AppDispatch para su uso en todo el proyecto
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;