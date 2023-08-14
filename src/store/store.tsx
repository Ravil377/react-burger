import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/reducers/index';
import thunk from 'redux-thunk';
import { socketMiddleware } from '../services/middleware/socket-middleware';
import { wsActions } from '../utils/chema';


const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, socketMiddleware(wsActions)],
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;